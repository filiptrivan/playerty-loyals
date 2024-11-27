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
                _logger.LogInformation(jobExecutionContext.ToString());
                long storeId = jobExecutionContext.JobDetail.JobDataMap.GetLong("StoreId");
                DateTime now = DateTime.Now;

                await _context.WithTransactionAsync(async () =>
                {
                    DbSet<StoreUpdatePointsScheduledTask> dbSet = _context.DbSet<StoreUpdatePointsScheduledTask>();

                    store = await _loyalsBusinessService.LoadInstanceAsync<Store, long>(storeId, null);

                    int interval = (int)store.UpdatePointsInterval; // FT: If it is null, it should never arrive here
                    DateTime startDateTime = store.UpdatePointsStartDatetime.Value; // FT: If it is null, it should never arrive here

                    StoreUpdatePointsScheduledTask storeUpdatePointsScheduledTask = await _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == storeId).OrderByDescending(x => x.ShouldStartedAt).FirstOrDefaultAsync();
                    DateTime? lastShouldStartedAt = storeUpdatePointsScheduledTask?.ShouldStartedAt;

                //});

                //await _context.WithTransactionAsync(async () =>
                //{
                    // FT: If lastShouldStartedAt == null that means that this is the first update ever for this store
                    List<ExternalTransactionDTO> externalTransactionDTOList = await _wingsApiService.GetTransactionList(store.GetTransactionsEndpoint, lastShouldStartedAt ?? startDateTime);

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
                    }

                    DateTime shouldStartedAtForSave = GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);

                    StoreUpdatePointsScheduledTask savedStoreUpdatePointsScheduledTask = new StoreUpdatePointsScheduledTask
                    {
                        ShouldStartedAt = shouldStartedAtForSave,
                        Store = store,
                    };

                    await dbSet.AddAsync(savedStoreUpdatePointsScheduledTask);

                    int rows = await _context.SaveChangesAsync();

                    _logger.LogInformation($"ROWS EFFECTED: {rows}");
                });

                _logger.LogInformation($"{DateTime.UtcNow}");
            }
            catch (Exception)
            {
                _logger.LogError($"{DateTime.UtcNow}, STORE: {store.Id}");

                throw;
            }
        }


        private static DateTime GetShouldStartedAtForSave(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
        {
            if (lastShouldStartedAt == null)
            {
                lastShouldStartedAt = startDateTime;
            }

            //TimeSpan intervalTimeSpan = TimeSpan.FromHours(interval);
            TimeSpan intervalTimeSpan = TimeSpan.FromSeconds(interval);

            TimeSpan elapsedTime = now - lastShouldStartedAt.Value;

            //int numberOfIntervals = (int)(elapsedTime.TotalHours / intervalTimeSpan.TotalHours); // FT: The cast to int is always rounding to the lower decimal place
            int numberOfIntervals = (int)(elapsedTime.TotalSeconds / intervalTimeSpan.TotalSeconds); // FT: The cast to int is always rounding to the lower decimal place

            //return lastShouldStartedAt.Value.AddHours(numberOfIntervals * intervalTimeSpan.TotalHours);
            return lastShouldStartedAt.Value.AddSeconds(numberOfIntervals * intervalTimeSpan.TotalSeconds);
        }

    }
}
