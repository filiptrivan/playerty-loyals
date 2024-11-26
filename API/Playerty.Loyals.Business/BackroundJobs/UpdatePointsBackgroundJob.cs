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
            long storeId = jobExecutionContext.JobDetail.JobDataMap.GetLong("StoreId");
            DateTime now = DateTime.Now;
            //DateTime shouldStartedAtForSave = jobExecutionContext.JobDetail.JobDataMap.GetDateTime("ShouldStartedAtForSave");

            // If shouldStartedAtForSave == null and last ShouldStartedAt == null, get the FirstStart from the database and save with that

            await _context.WithTransactionAsync(async () =>
            {
                Store store = await _loyalsBusinessService.LoadInstanceAsync<Store, long>(storeId, null);
                int interval = (int)store.UpdatePointsInterval; // FT: If it is null, it should never arrive here
                DateTime startDateTime = store.UpdatePointsStartDatetime.Value; // FT: If it is null, it should never arrive here

                StoreUpdatePointsScheduledTask storeUpdatePointsScheduledTask = await _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == storeId).OrderByDescending(x => x.ShouldStartedAt).FirstOrDefaultAsync();
                DateTime? lastShouldStartedAt = storeUpdatePointsScheduledTask.ShouldStartedAt;

                DateTime shouldStartedAtForSave = GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);

                StoreUpdatePointsScheduledTask savedStoreUpdatePointsScheduledTask = await _loyalsBusinessService.SaveStoreUpdatePointsScheduledTaskAndReturnDomainAsync(new StoreUpdatePointsScheduledTaskDTO
                {
                    ShouldStartedAt = shouldStartedAtForSave,
                    StoreId = storeId,
                });

                // FT: If lastShouldStartedAt == null that means that this is the first update ever for this store
                List<TransactionDTO> transactionDTOList = _wingsApiService.GetTransactionList(store.GetTransactionsEndpoint, lastShouldStartedAt ?? startDateTime);
                List<string> userEmailList = transactionDTOList.Select(x => x.UserEmail).ToList();
                var userIdAndEmailList = _context.DbSet<UserExtended>()
                    .Where(x => userEmailList.Contains(x.Email))
                    .Select(x => new 
                    { 
                        Id = x.Id,
                        Email = x.Email,
                    })
                    .ToList();

                foreach (TransactionDTO transactionDTO in transactionDTOList)
                {
                    long partnerUserId = userIdAndEmailList.Where(x => x.Email == transactionDTO.UserEmail).Select(x => x.Id).Single();

                    int points = transactionDTO.Price * store.Partner.PointsMultiplier;

                    TransactionDTO transactionDTOForSave = new TransactionDTO
                    {
                        ProductName = transactionDTO.ProductName,
                        ProductCategory = transactionDTO.ProductCategoryCode, // FT: Maybe Sync categories before this
                        Price = transactionDTO.Price,
                        Points = points,
                        PartnerUserId = userId,
                    };

                    _loyalsBusinessService.Points;

                    if (transactionDTO.Price >= 0)

                }
                // Save StoreUpdatePointsScheduledTask
                // Get all purchases and deletes from api
                // update points
            });

            _logger.LogInformation($"{DateTime.UtcNow}");
            //return Task.CompletedTask;
        }


        private static DateTime GetShouldStartedAtForSave(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
        {
            if (lastShouldStartedAt == null)
            {
                lastShouldStartedAt = startDateTime;
            }

            TimeSpan intervalTimeSpan = TimeSpan.FromHours(interval);

            TimeSpan elapsedTime = now - lastShouldStartedAt.Value;

            int numberOfIntervals = (int)(elapsedTime.TotalHours / intervalTimeSpan.TotalHours); // FT: The cast to int is always rounding to the lower decimal place

            return lastShouldStartedAt.Value.AddHours(numberOfIntervals * intervalTimeSpan.TotalHours);
        }

    }
}
