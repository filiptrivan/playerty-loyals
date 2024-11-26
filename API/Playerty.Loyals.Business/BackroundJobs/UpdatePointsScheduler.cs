using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Services;
using Quartz;
using Soft.Generator.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.BackroundJobs
{
    public class UpdatePointsScheduler
    {
        private readonly ISchedulerFactory _schedulerFactory;

        public UpdatePointsScheduler(ISchedulerFactory schedulerFactory)
        {
            _schedulerFactory = schedulerFactory;
        }

        /// <summary>
        /// Use this method on Startup
        /// If <paramref name="lastShouldStartedAt"/> is null, that means that the job didn't started even once. We are sending that argument from StoreUpdatePointsScheduledTask table.
        /// <paramref name="interval"/> is in hours.
        /// </summary>
        public async Task ContinueUpdatePointsJobs(long storeId, int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime? finishedAt)
        {
            IScheduler scheduler = await _schedulerFactory.GetScheduler();

            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{storeId}");

            DateTime now = DateTime.Now;

            DateTimeOffset nextRunOffset = GetNextRunOffset(interval, startDateTime, lastShouldStartedAt, finishedAt, now);
               
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity($"Trigger_{storeId}")
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    .WithIntervalInHours(interval)
                    .RepeatForever())
                .Build();

            //DateTime shouldStartedAtForSave = GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);

            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .UsingJobData("StoreId", storeId)
                //.UsingJobData("ShouldStartedAtForSave", shouldStartedAtForSave.ToString())
                .Build();

            await scheduler.ScheduleJob(job, trigger);
        }

        private static DateTimeOffset GetNextRunOffset(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime? finishedAt, DateTime now)
        {
            DateTime nextRun;

            if (lastShouldStartedAt == null)
            {
                nextRun = startDateTime;
            }
            else if (finishedAt == null)
            {
                nextRun = now.AddMinutes(1);
            }
            else
            {
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
        /// </summary>
        public async Task ScheduleUpdatePointsJob(long storeId, int interval, DateTime startDateTime)
        {
            IScheduler scheduler = await _schedulerFactory.GetScheduler();

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

            ITrigger existingTrigger = await scheduler.GetTrigger(triggerKey);

            if (existingTrigger == null)
            {
                IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                    .WithIdentity(jobKey)
                    .UsingJobData("StoreId", storeId)
                    .Build();

                await scheduler.ScheduleJob(job, trigger);
            }
            else
            {
                await scheduler.RescheduleJob(triggerKey, trigger);
            }
        }
    }
}
