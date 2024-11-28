using Microsoft.Extensions.Logging;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Services;
using Quartz;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Shared.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Business.DTO.Helpers;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Database;
using Mapster;

namespace Playerty.Loyals.Business.BackroundJobs
{
    public class UpdatePointsBackgroundJob : IJob
    {
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;
        private readonly IApplicationDbContext _context;
        private readonly ILogger<UpdatePointsBackgroundJob> _logger;

        public UpdatePointsBackgroundJob(LoyalsBusinessService loyalsBusinessService, WingsApiService wingsApiService, IApplicationDbContext context, ILogger<UpdatePointsBackgroundJob> logger)
        {
            _loyalsBusinessService = loyalsBusinessService;
            _wingsApiService = wingsApiService;
            _context = context;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext jobExecutionContext)
        {
            Store store = null;

            try
            {
                long storeId = jobExecutionContext.JobDetail.JobDataMap.GetLong("StoreId");
                int? firstManualStartInterval = jobExecutionContext.JobDetail.JobDataMap.ContainsKey("FirstManualStartInterval")
                    ? jobExecutionContext.JobDetail.JobDataMap.GetInt("FirstManualStartInterval")
                    : null;

                DateTime now = DateTime.Now;

                await _context.WithTransactionAsync(async () =>
                {
                    DbSet<StoreUpdatePointsScheduledTask> dbSet = _context.DbSet<StoreUpdatePointsScheduledTask>();

                    store = await _loyalsBusinessService.LoadInstanceAsync<Store, long>(storeId, null);

                    int? interval = store.UpdatePointsInterval; // FT: It can com

                    DateTime? lastShouldStartedAt = await _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == storeId && x.IsManual != true).OrderByDescending(x => x.ShouldStartedAt).Select(x => x.ShouldStartedAt).FirstOrDefaultAsync();
                    DateTime? lastWithManualsShouldStartedAt = await _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == storeId).OrderByDescending(x => x.ShouldStartedAt).Select(x => x.ShouldStartedAt).FirstOrDefaultAsync();

                    DateTime? startDateTime = store.UpdatePointsStartDatetime; // FT: When the startDateTime == null, the user is manually starting the update

                    DateTime shouldStartedAtForSave;

                    if (firstManualStartInterval == null) // FT: If it's not manual update
                    {
                        shouldStartedAtForSave = UpdatePointsBackgroundJobHelpers.GetShouldStartedAtForSave(interval.Value, startDateTime.Value, lastShouldStartedAt, now);
                    }
                    else
                    {
                        shouldStartedAtForSave = now; // FT: When the user has not startDateTime, he is only manually starting the update
                    }

                    DateTime dateFrom;

                    if (lastWithManualsShouldStartedAt == null) // FT: If lastShouldStartedAt == null that means that this is the first update ever for this store
                    {
                        if (firstManualStartInterval == null || firstManualStartInterval == 0)
                        {
                            dateFrom = shouldStartedAtForSave.AddHours(-interval.Value);
                        }
                        else
                        {
                            dateFrom = shouldStartedAtForSave.AddHours(-firstManualStartInterval.Value);
                        }
                    }
                    else
                    {
                        dateFrom = lastWithManualsShouldStartedAt.Value;
                    }

                    List<ExternalTransactionDTO> externalTransactionDTOList = await _wingsApiService.GetTransactionList(store.GetTransactionsEndpoint, dateFrom, shouldStartedAtForSave);

                    List<string> userEmailList = externalTransactionDTOList.Select(x => x.UserEmail).ToList();

                    List<PartnerUser> partnerUserList = _context.DbSet<PartnerUser>()
                        .Include(x => x.User)
                        .Where(x => x.Partner.Id == store.Partner.Id && userEmailList.Contains(x.User.Email))
                        .ToList();

                    // FT: when we make an agreement with the partners that they update the categories, we will just send them an email, the update of your points failed, due to mismatched categories, please harmonize the categories and stop the execution manually.
                    // await _loyalsBusinessService.SyncDiscountCategories(); // FT: You don't need to sync here, we will just use passed name as category

                    foreach (ExternalTransactionDTO externalTransactionDTO in externalTransactionDTOList)
                    {
                        PartnerUser partnerUser = partnerUserList.Where(x => x.User.Email == externalTransactionDTO.UserEmail).Single();

                        int pointsFromTransaction = (int)Math.Floor(externalTransactionDTO.Price * store.Partner.PointsMultiplier); // FT: Test this for negative and positive price

                        TransactionDTO transactionDTO = new TransactionDTO
                        {
                            ProductName = externalTransactionDTO.ProductName,
                            ProductCategoryName = externalTransactionDTO.ProductCategoryName,
                            Price = externalTransactionDTO.Price,
                            Points = pointsFromTransaction,
                            PartnerUserId = partnerUser.Id,
                        };

                        await _loyalsBusinessService.UpdatePointsForThePartnerUser(partnerUser, pointsFromTransaction);
                        await _loyalsBusinessService.SaveTransactionAndReturnDomainAsync(transactionDTO, false, false);
                    }

                    StoreUpdatePointsScheduledTask savedStoreUpdatePointsScheduledTask = new StoreUpdatePointsScheduledTask
                    {
                        ShouldStartedAt = shouldStartedAtForSave,
                        Store = store,
                        IsManual = firstManualStartInterval != null
                    };

                    await dbSet.AddAsync(savedStoreUpdatePointsScheduledTask);

                    await _context.SaveChangesAsync();
                });
            }
            catch (Exception)
            {
                _logger.LogError($"{DateTime.UtcNow}, STORE: {store.Id}");

                throw;
            }
        }

    }
}
