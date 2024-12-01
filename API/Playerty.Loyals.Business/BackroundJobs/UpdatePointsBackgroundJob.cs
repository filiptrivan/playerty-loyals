using Microsoft.Extensions.Logging;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Services;
using Quartz;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.SoftExceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Playerty.Loyals.Business.Services;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Database;
using Mapster;
using Soft.Generator.Shared.Emailing;

namespace Playerty.Loyals.Business.BackroundJobs
{
    // FT: The DisallowConcurrentExecution attribute is mandatory because if 2 instances read the same data they will save the TransactionsFrom as the same time which should not happen.
    // If you have multiple instances of a job identified by different JobKey values, they can run concurrently, but if they share the same JobKey, only one instance will run at a time
    [DisallowConcurrentExecution]
    public class UpdatePointsBackgroundJob : IJob
    {
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;
        private readonly IApplicationDbContext _context;
        private readonly ILogger<UpdatePointsBackgroundJob> _logger;
        private readonly EmailingService _emailingService;

        public UpdatePointsBackgroundJob(LoyalsBusinessService loyalsBusinessService, WingsApiService wingsApiService, IApplicationDbContext context, ILogger<UpdatePointsBackgroundJob> logger, 
            EmailingService emailingService)
        {
            _loyalsBusinessService = loyalsBusinessService;
            _wingsApiService = wingsApiService;
            _context = context;
            _logger = logger;
            _emailingService = emailingService;
        }

        //List<long> alreadyExecutingStoreIds = new List<long>();
        private static readonly HashSet<long> alreadyExecutingStoreIds = new HashSet<long>();
        private static readonly object lockObject = new object();

        public async Task Execute(IJobExecutionContext jobExecutionContext)
        {
            Store store = null;

            try
            {
                long storeId = jobExecutionContext.JobDetail.JobDataMap.GetLong("StoreId");

                // FT: It's null only if it's not called from manual update, if it's not first and called from manual update it will be 0
                int? firstManualStartInterval = jobExecutionContext.JobDetail.JobDataMap.ContainsKey("FirstManualStartInterval")
                    ? jobExecutionContext.JobDetail.JobDataMap.GetInt("FirstManualStartInterval")
                    : null;

                var e = jobExecutionContext.JobDetail.Key;

                DateTime now = DateTime.Now;

                await _context.WithTransactionAsync(async () =>
                {
                    DbSet<StoreUpdatePointsScheduledTask> dbSet = _context.DbSet<StoreUpdatePointsScheduledTask>();

                    store = await _loyalsBusinessService.LoadInstanceAsync<Store, long>(storeId, null);

                    if (store.GetTransactionsEndpoint == null)
                        throw new BusinessException($"Na stranici prodavnice '{store.Name}' morate da sačuvate popunjeno polje 'Putanja za učitavanje transakcija', kako biste pokrenuli ažuriranje poena.");

                    int? interval = store.UpdatePointsInterval;

                    DateTime? lastShouldStartedAt = await _context.DbSet<StoreUpdatePointsScheduledTask>()
                        .Where(x => x.Store.Id == storeId && x.IsManual != true)
                        .OrderByDescending(x => x.TransactionsTo)
                        .Select(x => (DateTime?)x.TransactionsTo)
                        .FirstOrDefaultAsync();

                    DateTime? lastWithManualsShouldStartedAt = await _context.DbSet<StoreUpdatePointsScheduledTask>()
                        .Where(x => x.Store.Id == storeId)
                        .OrderByDescending(x => x.TransactionsTo)
                        .Select(x => (DateTime?)x.TransactionsTo)
                        .FirstOrDefaultAsync();

                    DateTime? startDateTime = store.UpdatePointsStartDate; // FT: When the startDateTime == null, the user is manually starting the update

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
                            //dateFrom = shouldStartedAtForSave.AddHours(-interval.Value);
                            dateFrom = shouldStartedAtForSave.AddMinutes(-interval.Value);
                        }
                        else // FT: If the first update ever is manual
                        {
                            //dateFrom = shouldStartedAtForSave.AddHours(-firstManualStartInterval.Value);
                            dateFrom = shouldStartedAtForSave.AddMinutes(-firstManualStartInterval.Value);
                        }
                    }
                    else
                    {
                        dateFrom = lastWithManualsShouldStartedAt.Value;
                    }

                    List<ExternalTransactionDTO> externalTransactionDTOList = await _wingsApiService.GetTransactionList(store.GetTransactionsEndpoint, dateFrom, shouldStartedAtForSave);

                    List<string> userEmailList = externalTransactionDTOList.Select(x => x.UserEmail).ToList();

                    List<PartnerUser> partnerUserList = await _context.DbSet<PartnerUser>()
                        .Include(x => x.User)
                        .Where(x => x.Partner.Id == store.Partner.Id && userEmailList.Contains(x.User.Email))
                        .ToListAsync();

                    // FT: when we make an agreement with the partners that they update the categories, we will just send them an email, the update of your points failed, due to mismatched categories, please harmonize the categories and stop the execution manually.
                    // await _loyalsBusinessService.SyncDiscountCategories(); // FT: You don't need to sync here, we will just use passed name as category

                    foreach (ExternalTransactionDTO externalTransactionDTO in externalTransactionDTOList)
                    {
                        PartnerUser partnerUser = partnerUserList.Where(x => x.User.Email == externalTransactionDTO.UserEmail).Single();

                        int pointsFromTransaction = (int)Math.Floor((decimal)externalTransactionDTO.Price * store.Partner.PointsMultiplier); // FT: Test this for negative and positive price

                        TransactionDTO transactionDTO = new TransactionDTO
                        {
                            ProductName = externalTransactionDTO.ProductName,
                            ProductImageUrl = externalTransactionDTO.ProductImageUrl,
                            ProductCategoryName = externalTransactionDTO.ProductCategoryName,
                            ProductCategoryImageUrl = externalTransactionDTO.ProductCategoryImageUrl,
                            Price = externalTransactionDTO.Price,
                            Points = pointsFromTransaction,
                            PartnerUserId = partnerUser.Id,
                            BoughtAt = externalTransactionDTO.BoughtAt,
                            StoreId = store.Id,
                        };

                        await _loyalsBusinessService.UpdatePointsForThePartnerUser(partnerUser, pointsFromTransaction);
                        await _loyalsBusinessService.SaveTransactionAndReturnDomainAsync(transactionDTO, false, false);
                    }

                    StoreUpdatePointsScheduledTask savedStoreUpdatePointsScheduledTask = new StoreUpdatePointsScheduledTask
                    {
                        TransactionsFrom = dateFrom,
                        TransactionsTo = shouldStartedAtForSave,
                        Store = store,
                        IsManual = firstManualStartInterval != null,
                    };

                    await dbSet.AddAsync(savedStoreUpdatePointsScheduledTask);

                    await _context.SaveChangesAsync();
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                
                if (ex is BusinessException)
                {
                    await _emailingService.SendEmailAsync(store.Partner.Email, 
                        "Greška prilikom ažuriranja poena", 
                        $"Prodavnica: {store.Name}. {ex.Message}"
                    );
                }
                else
                {
                    await _emailingService.SendEmailAsync(
                        store.Partner.Email, 
                        "Greška prilikom ažuriranja poena", 
                        "Došlo je do greške pri ažuriranju poena. Molimo Vas da pokušate ponovo. Ako se problem ponovi, kontaktirajte podršku."
                    );
                }
            }
        }

    }
}
