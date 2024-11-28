using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.BackroundJobs
{
    public static class UpdatePointsBackgroundJobHelpers
    {
        /// <summary>
        /// </summary>
        /// <returns>The DateTime which is returned could never be greater then <paramref name="now"/></returns>
        public static DateTime GetShouldStartedAtForSave(int interval, DateTime startDateTime, DateTime? lastShouldStartedAt, DateTime now)
        {
            if (lastShouldStartedAt == null)
            {
                lastShouldStartedAt = startDateTime;
            }

            //TimeSpan intervalTimeSpan = TimeSpan.FromHours(interval);
            TimeSpan intervalTimeSpan = TimeSpan.FromMinutes(interval);

            TimeSpan elapsedTime = now - lastShouldStartedAt.Value;

            //int numberOfIntervals = (int)(elapsedTime.TotalHours / intervalTimeSpan.TotalHours); // FT: The cast to int is always rounding to the lower decimal place
            int numberOfIntervals = (int)(elapsedTime.TotalMinutes / intervalTimeSpan.TotalMinutes); // FT: The cast to int is always rounding to the lower decimal place

            //return lastShouldStartedAt.Value.AddHours(numberOfIntervals * intervalTimeSpan.TotalHours);
            return lastShouldStartedAt.Value.AddMinutes(numberOfIntervals * intervalTimeSpan.TotalMinutes);
        }
    }
}
