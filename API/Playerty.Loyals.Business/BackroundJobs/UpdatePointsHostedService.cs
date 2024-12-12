using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Playerty.Loyals.Business.Entities;
using Quartz;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.BackroundJobs
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
                List<Store> storeList = await _context.DbSet<Store>()
                    .Where(x => x.UpdatePointsInterval != null && x.UpdatePointsStartDate != null && x.GetTransactionsEndpoint != null && x.UpdatePointsScheduledTaskIsPaused == false)
                    .Include(x => x.StoreUpdatePointsScheduledTasks)
                    .ToListAsync();

                foreach (Store store in storeList)
                {
                    StoreUpdatePointsScheduledTask lastStoreUpdatePointsScheduledTask = store.StoreUpdatePointsScheduledTasks.OrderByDescending(x => x.TransactionsTo).FirstOrDefault();

                    await _updatePointsScheduler.ContinueJob(store.Id, store.UpdatePointsInterval.Value, store.UpdatePointsStartDate.Value, lastStoreUpdatePointsScheduledTask?.TransactionsTo);
                }
            });
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
        }
    }
}
