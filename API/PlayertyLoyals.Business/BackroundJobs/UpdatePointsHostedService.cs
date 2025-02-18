using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PlayertyLoyals.Business.Entities;
using Quartz;
using Spider.Shared.Extensions;
using Spider.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.BackroundJobs
{
    public class UpdatePointsHostedService : IHostedService
    {
        private readonly IApplicationDbContext _context;
        private readonly UpdatePointsScheduler _updatePointsScheduler;


        public UpdatePointsHostedService(IApplicationDbContext context, UpdatePointsScheduler updatePointsScheduler)
        {
            _context = context;
            _updatePointsScheduler = updatePointsScheduler;
        }

        /// <summary>
        /// FT: If this breaks, you will see when starting server, so i think we don't need to make try catch here
        /// </summary>
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await _updatePointsScheduler.InitializeAsync();

            await _context.WithTransactionAsync(async () =>
            {
                List<BusinessSystem> businessSystemList = await _context.DbSet<BusinessSystem>()
                    .Where(x => x.UpdatePointsInterval != null && x.UpdatePointsStartDate != null && x.GetTransactionsEndpoint != null && x.UpdatePointsScheduledTaskIsPaused == false)
                    .Include(x => x.BusinessSystemUpdatePointsScheduledTasks)
                    .ToListAsync();

                foreach (BusinessSystem businessSystem in businessSystemList)
                {
                    BusinessSystemUpdatePointsScheduledTask lastBusinessSystemUpdatePointsScheduledTask = businessSystem.BusinessSystemUpdatePointsScheduledTasks
                        .Where(x => x.IsManual == false)
                        .OrderByDescending(x => x.TransactionsTo)
                        .FirstOrDefault();

                    await _updatePointsScheduler.ContinueJob(businessSystem.Id, businessSystem.UpdatePointsInterval.Value, businessSystem.UpdatePointsStartDate.Value, lastBusinessSystemUpdatePointsScheduledTask?.TransactionsTo);
                }
            });
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
        }
    }
}
