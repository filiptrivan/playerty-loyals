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
            else if (lastShouldStartedAt != null && startDateTime > lastShouldStartedAt.Value) // FT: This is happening when the partner change the update points starting time, not for the first time
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
