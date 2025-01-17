using Microsoft.Extensions.Logging;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Services;
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
using Soft.Generator.Shared.Emailing;
using PlayertyLoyals.Business.DTO.Helpers;
using System.Diagnostics;

namespace PlayertyLoyals.Business.BackroundJobs
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

        public async Task Execute(IJobExecutionContext jobExecutionContext)
        {
            BusinessSystem businessSystem = null;

            try
            {
                long businessSystemId = jobExecutionContext.JobDetail.JobDataMap.GetLong("BusinessSystemId");

                DateTime? manualDateFrom = jobExecutionContext.JobDetail.JobDataMap.ContainsKey("ManualDateFrom")
                    ? jobExecutionContext.JobDetail.JobDataMap.GetDateTime("ManualDateFrom")
                    : null;

                DateTime? manualDateTo = jobExecutionContext.JobDetail.JobDataMap.ContainsKey("ManualDateTo")
                    ? jobExecutionContext.JobDetail.JobDataMap.GetDateTime("ManualDateTo")
                    : null;

                DateTime now = DateTime.Now;

                await _context.WithTransactionAsync(async () =>
                {
                    businessSystem = await _loyalsBusinessService.GetInstanceAsync<BusinessSystem, long>(businessSystemId, null);

                    if (businessSystem.GetTransactionsEndpoint == null)
                        throw new BusinessException($"Na stranici prodavnice '{businessSystem.Name}' morate da sačuvate popunjeno polje 'Putanja za učitavanje transakcija', kako biste pokrenuli ažuriranje poena.");

                    PeriodInWhichTransactionsShouldBeProcessed periodInWhichTransactionsShouldBeProcessed = 
                        await _loyalsBusinessService.GetPeriodInWhichTransactionsShouldBeProcessed(businessSystem, manualDateFrom, manualDateTo, now);

                    List<ExternalTransactionDTO> externalTransactionDTOList = await _wingsApiService.GetExternalTransactionDTOList(
                        businessSystem.GetTransactionsEndpoint, periodInWhichTransactionsShouldBeProcessed.DateFrom.Value, periodInWhichTransactionsShouldBeProcessed.DateTo.Value
                    );

                    // FT: when we make an agreement with the partners that they update the categories, we will just send them an email, the update of your points failed, due to mismatched categories, please harmonize the categories and stop the execution manually.
                    // await _loyalsBusinessService.SyncDiscountCategories(); // FT: You don't need to sync here, we will just use passed name as category

                    TransactionsProcessingResult transactionsProcessingResult = await _loyalsBusinessService.ProcessTransactions(businessSystem, externalTransactionDTOList);

                    BusinessSystemUpdatePointsScheduledTask businessSystemUpdatePointsScheduledTaskForSave = new BusinessSystemUpdatePointsScheduledTask
                    {
                        TransactionsFrom = periodInWhichTransactionsShouldBeProcessed.DateFrom,
                        TransactionsTo = periodInWhichTransactionsShouldBeProcessed.DateTo,
                        BusinessSystem = businessSystem,
                        IsManual = manualDateFrom != null && manualDateTo != null,
                    };

                    await _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().AddAsync(businessSystemUpdatePointsScheduledTaskForSave);
                    await _context.SaveChangesAsync();

                    await _loyalsBusinessService.NotifyPartnerAboutSuccessfullyProcessedTransactions(
                        businessSystem.Partner, transactionsProcessingResult, periodInWhichTransactionsShouldBeProcessed.DateFrom, periodInWhichTransactionsShouldBeProcessed.DateTo
                    );
                });
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.ToString()); TODO FT: Make real logging

                await _loyalsBusinessService.NotifyPartnerAboutUnsuccessfullyProcessedTransactions(businessSystem, ex);
            }
        }
    }
}
