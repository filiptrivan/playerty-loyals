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
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.SoftExceptions;

namespace Playerty.Loyals.Business.BackroundJobs
{
    public class UpdatePointsScheduler
    {
        private readonly ISchedulerFactory _schedulerFactory;
        private IScheduler _scheduler;

        public UpdatePointsScheduler(ISchedulerFactory schedulerFactory)
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
            DateTime now = DateTime.Now;

            DateTime nextRunDateTime = GetNextRunDateTime(interval, startDateTime, lastShouldStartedAt, now);

            if (nextRunDateTime == now)
            {
                DateTime shouldStartedAtForSave = UpdatePointsBackgroundJobHelpers.GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);

                ITrigger initialTrigger = TriggerBuilder.Create()
                    .WithIdentity($"InitialTrigger_{nameof(UpdatePointsScheduler)}_{storeId}")
                    .StartAt(now)
                    .WithSimpleSchedule(x => x
                        .WithMisfireHandlingInstructionNextWithRemainingCount())
                    .Build();

                nextRunDateTime = shouldStartedAtForSave.AddHours(interval);

                JobKey initialJobKey = new JobKey($"InitialJob_{nameof(UpdatePointsScheduler)}_{storeId}");

                IJobDetail initialJob = JobBuilder.Create<UpdatePointsBackgroundJob>()
                    .StoreDurably(false) // Automatically remove the job after execution
                    .WithIdentity(initialJobKey)
                    .UsingJobData("StoreId", storeId)
                    .Build();

                await _scheduler.ScheduleJob(initialJob, initialTrigger);
            }

            DateTimeOffset nextRunOffset = new DateTimeOffset(nextRunDateTime);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity($"Trigger_{nameof(UpdatePointsScheduler)}_{storeId}")
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    .WithIntervalInHours(interval)
                    .RepeatForever()
                    .WithMisfireHandlingInstructionNextWithRemainingCount())
                .Build();

            JobKey jobKey = new JobKey($"Job_{nameof(UpdatePointsScheduler)}_{storeId}");

            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .UsingJobData("StoreId", storeId)
                .Build();

            await _scheduler.ScheduleJob(job, trigger);
        }

        private static DateTime GetNextRunDateTime(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
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
                nextRun = now;

            return nextRun;
        }

        /// <summary>
        /// Use this method when saving store and the <paramref name="startDateTime"/> is not null
        /// You need to validate is startDateTime <= now before calling this method
        /// Handle errors and use try catch around this method
        /// </summary>
        public async Task<DateTimeOffset?> ScheduleJob(long storeId, int interval, DateTime startDateTime, DateTime now)
        {
            if (startDateTime <= now)
                throw new BusinessException("Vreme početka ažuriranja poena mora biti veće od sadašnjeg trenutka.");

            DateTimeOffset? result = null;

            JobKey jobKey = new JobKey($"Job_{nameof(UpdatePointsScheduler)}_{storeId}");
            TriggerKey triggerKey = new TriggerKey($"Trigger_{nameof(UpdatePointsScheduler)}_{storeId}");

            DateTimeOffset nextRunOffset = new DateTimeOffset(startDateTime);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    .WithIntervalInHours(interval)
                    .RepeatForever()
                    .WithMisfireHandlingInstructionNowWithRemainingCount()) // FT: Just in case, since we have already checked that startDateTime cannot be greater than now, it will start immediately and continue at the interval. There is a very small chance of this happening, it's a matter of milliseconds.
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

        /// <summary>
        /// TODO FT: Add summary
        /// </summary>
        /// <exception cref="HackerException"></exception>
        public async Task<DateTimeOffset?> ScheduleJobManually(long storeId, int firstManualStartInterval, DateTime now)
        {
            if (firstManualStartInterval < 0)
                throw new HackerException($"Can not pass negative value for {nameof(firstManualStartInterval)}.");

            DateTimeOffset? result = null;

            JobKey jobKey = new JobKey($"ManualJob_{nameof(UpdatePointsScheduler)}_{storeId}");
            TriggerKey triggerKey = new TriggerKey($"ManualTrigger_{storeId}");

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartAt(now)
                .WithSimpleSchedule(x => x
                    .WithMisfireHandlingInstructionNowWithRemainingCount()) // FT: Just in case, since we have already checked that startDateTime cannot be greater than now, it will start immediately and continue at the interval. There is a very small chance of this happening, it's a matter of milliseconds.
                .Build();

            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .StoreDurably(false) // Automatically remove the job after execution
                .UsingJobData("StoreId", storeId)
                .UsingJobData("FirstManualStartInterval", firstManualStartInterval)
                .Build();

            await _scheduler.DeleteJob(jobKey); // FT: Just in case, if the user quickly double-clicks or the execution takes time
            result = await _scheduler.ScheduleJob(job, trigger);

            return result;
        }

        public async Task DeleteJob(long storeId)
        {
            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{storeId}");

            await _scheduler.DeleteJob(jobKey);
        }
    }
}
