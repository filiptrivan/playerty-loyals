using Microsoft.Extensions.Hosting;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Services;
using Quartz;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Playerty.Loyals.Business.BackroundJobs
{
    public class UpdatePointsScheduler
    {
        private readonly ISchedulerFactory _schedulerFactory;
        private IScheduler _scheduler;

        public UpdatePointsScheduler(ISchedulerFactory schedulerFactory, IApplicationDbContext context)
        {
            _schedulerFactory = schedulerFactory;
        }

        public async Task InitializeAsync()
        {
            _scheduler = await _schedulerFactory.GetScheduler();
        }

        /// <summary>
        /// Use this method on Startup
        /// If <paramref name="lastShouldStartedAt"/> is null, that means that the job didn't started even once. We are sending that argument from StoreUpdatePointsScheduledTask table.
        /// <paramref name="interval"/> is in hours.
        /// </summary>
        public async Task ContinueJob(long storeId, int interval, DateTime startDateTime, DateTime? lastShouldStartedAt)
        {
            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{storeId}");

            DateTime now = DateTime.Now;

            DateTimeOffset nextRunOffset = GetNextRunOffset(interval, startDateTime, lastShouldStartedAt, now);
               
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity($"Trigger_{storeId}")
                //.StartAt(nextRunOffset)
                .StartAt(now)
                .WithSimpleSchedule(x => x
                    //.WithIntervalInHours(interval)
                    .WithIntervalInSeconds(5)
                    .RepeatForever())
                .Build();

            //DateTime shouldStartedAtForSave = GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);

            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .UsingJobData("StoreId", storeId)
                .Build();

            await _scheduler.ScheduleJob(job, trigger);
        }

        private static DateTimeOffset GetNextRunOffset(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
        {
            DateTime nextRun;

            if (lastShouldStartedAt == null)
            {
                nextRun = startDateTime;
            }
            else
            {
                // 1. lastShouldStartedAt can't be greater then now
                // 2. If lastShouldStartedAt is way before, nextRun <= now will handle that
                // 3. If now - lastShouldStartedAt < interval, this else is handling that
                nextRun = lastShouldStartedAt.Value.AddHours(interval);
            }

            if (nextRun <= now)
                nextRun = now.AddMinutes(1); // Default to run 1 minute from now if overdue

            return new DateTimeOffset(nextRun);
        }

        //private static DateTime GetShouldStartedAtForSave(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
        //{
        //    if (lastShouldStartedAt == null)
        //    {
        //        lastShouldStartedAt = startDateTime;
        //    }

        //    TimeSpan intervalTimeSpan = TimeSpan.FromHours(interval);

        //    TimeSpan elapsedTime = now - lastShouldStartedAt.Value;

        //    int numberOfIntervals = (int)(elapsedTime.TotalHours / intervalTimeSpan.TotalHours); // FT: The cast to int is always rounding to the lower decimal place

        //    return lastShouldStartedAt.Value.AddHours(numberOfIntervals * intervalTimeSpan.TotalHours);
        //}

        /// <summary>
        /// Use this method when saving store and the <paramref name="startDateTime"/> is not null
        /// You need to validate is startDateTime <= now before calling this method
        /// Handle errors and use try catch around this method
        /// </summary>
        public async Task<DateTimeOffset?> ScheduleJob(long storeId, int interval, DateTime startDateTime)
        {
            DateTimeOffset? result = null;

            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{storeId}");
            TriggerKey triggerKey = new TriggerKey($"Trigger_{storeId}");

            DateTimeOffset nextRunOffset = new DateTimeOffset(startDateTime);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    .WithIntervalInHours(interval)
                    .RepeatForever())
                .Build();

            ITrigger existingTrigger = await _scheduler.GetTrigger(triggerKey);

            if (existingTrigger == null)
            {
                IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                    .WithIdentity(jobKey)
                    .UsingJobData("StoreId", storeId)
                    .Build();

                result = await _scheduler.ScheduleJob(job, trigger);
            }
            else
            {
                result = await _scheduler.RescheduleJob(triggerKey, trigger);
            }

            return result;
        }

        public async Task DeleteJob(long storeId)
        {
            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{storeId}");

            await _scheduler.DeleteJob(jobKey);
        }
    }
}
