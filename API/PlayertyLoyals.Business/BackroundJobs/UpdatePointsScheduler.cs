using Microsoft.Extensions.Hosting;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Quartz;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.DTO;
using Soft.Generator.Shared.SoftExceptions;

namespace PlayertyLoyals.Business.BackroundJobs
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
        /// If <paramref name="lastShouldStartedAt"/> is null, that means that the job didn't started even once. We are sending that argument from BusinessSystemUpdatePointsScheduledTask table.
        /// <paramref name="interval"/> is in hours.
        /// </summary>
        public async Task<bool> ContinueJob(long businessSystemId, int interval, DateTime startDateTime, DateTime? lastShouldStartedAt)
        {
            DateTime now = DateTime.Now;

            DateTime nextRunDateTime = GetNextRunDateTime(interval, startDateTime, lastShouldStartedAt, now);

            ITrigger initialTrigger = null;

            if (nextRunDateTime == now)
            {
                DateTime shouldStartedAtForSave = UpdatePointsBackgroundJobHelpers.GetShouldStartedAtForSave(interval, startDateTime, lastShouldStartedAt, now);
                //nextRunDateTime = shouldStartedAtForSave.AddHours(interval);
                nextRunDateTime = shouldStartedAtForSave.AddMinutes(interval);

                TriggerKey initialTriggerKey = new TriggerKey($"InitialTrigger_{nameof(UpdatePointsScheduler)}_{businessSystemId}");
                initialTrigger = TriggerBuilder.Create()
                    .WithIdentity(initialTriggerKey)
                    .WithPriority(6) // FT: Default is 5
                    .StartNow()
                    .Build();
            }

            DateTimeOffset nextRunOffset = new DateTimeOffset(nextRunDateTime);

            TriggerKey triggerKey = new TriggerKey($"Trigger_{nameof(UpdatePointsScheduler)}_{businessSystemId}");
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    //.WithIntervalInHours(interval)
                    .WithIntervalInMinutes(interval)
                    .RepeatForever()
                    .WithMisfireHandlingInstructionNextWithRemainingCount())
                .Build();

            JobKey jobKey = new JobKey($"Job_{nameof(UpdatePointsScheduler)}_{businessSystemId}");
            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .UsingJobData("BusinessSystemId", businessSystemId)
                .Build();

            List<ITrigger> triggers = new List<ITrigger> { trigger };

            if (initialTrigger != null)
            {
                triggers.Add(initialTrigger);
            }

            IReadOnlyCollection<ITrigger> readonlyTriggers = triggers.AsReadOnly();

            await _scheduler.ScheduleJob(job, triggers, false);

            return true;
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
                //nextRun = lastShouldStartedAt.Value.AddHours(interval);
                nextRun = lastShouldStartedAt.Value.AddMinutes(interval);
            }

            if (nextRun <= now)
                nextRun = now;

            return nextRun;
        }

        /// <summary>
        /// Use this method when saving businessSystem and the <paramref name="startDateTime"/> is not null
        /// You need to validate is startDateTime <= now before calling this method
        /// Handle errors and use try catch around this method
        /// </summary>
        public async Task<DateTimeOffset?> ScheduleJob(long businessSystemId, int interval, DateTime startDateTime, DateTime now)
        {
            if (startDateTime <= now)
                throw new BusinessException("Vreme početka ažuriranja poena mora biti veće od sadašnjeg trenutka.");

            DateTimeOffset? result = null;

            JobKey jobKey = new JobKey($"Job_{nameof(UpdatePointsScheduler)}_{businessSystemId}");
            TriggerKey triggerKey = new TriggerKey($"Trigger_{nameof(UpdatePointsScheduler)}_{businessSystemId}");

            DateTimeOffset nextRunOffset = new DateTimeOffset(startDateTime);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartAt(nextRunOffset)
                .WithSimpleSchedule(x => x
                    //.WithIntervalInHours(interval)
                    .WithIntervalInMinutes(interval)
                    .RepeatForever()
                    .WithMisfireHandlingInstructionNowWithRemainingCount()) // FT: Just in case, since we have already checked that startDateTime cannot be greater than now, it will start immediately and continue at the interval. There is a very small chance of this happening, it's a matter of milliseconds.
                .Build();

            ITrigger existingTrigger = await _scheduler.GetTrigger(triggerKey);

            if (existingTrigger == null)
            {
                IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                    .WithIdentity(jobKey)
                    .UsingJobData("BusinessSystemId", businessSystemId)
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
        public async Task<DateTimeOffset?> ScheduleJobManually(long businessSystemId, DateTime manualDateFrom, DateTime manualDateTo)
        {
            if (manualDateTo <= manualDateFrom)
                throw new HackerException($"BusinessSystem: {businessSystemId}. Can not pass greater {nameof(manualDateTo)} then {nameof(manualDateFrom)} in manually started points update.");

            DateTimeOffset? result = null;

            JobKey jobKey = new JobKey($"ManualJob_{nameof(UpdatePointsScheduler)}_{businessSystemId}");
            TriggerKey triggerKey = new TriggerKey($"ManualTrigger_{businessSystemId}");

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity(triggerKey)
                .StartNow()
                .Build();

            IJobDetail job = JobBuilder.Create<UpdatePointsBackgroundJob>()
                .WithIdentity(jobKey)
                .StoreDurably(false) // Automatically remove the job after execution
                .UsingJobData("BusinessSystemId", businessSystemId)
                .UsingJobData("ManualDateFrom", manualDateFrom.ToString())
                .UsingJobData("ManualDateTo", manualDateTo.ToString())
                .Build();

            await _scheduler.DeleteJob(jobKey); // FT: Just in case, if the user quickly double-clicks or the execution takes time
            result = await _scheduler.ScheduleJob(job, trigger);

            return result;
        }

        public async Task DeleteJob(long businessSystemId)
        {
            JobKey jobKey = new JobKey($"{nameof(UpdatePointsScheduler)}_{businessSystemId}");

            await _scheduler.DeleteJob(jobKey);
        }
    }
}
