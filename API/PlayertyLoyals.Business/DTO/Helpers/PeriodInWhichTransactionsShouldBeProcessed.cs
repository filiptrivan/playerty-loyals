using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO.Helpers
{
    public class PeriodInWhichTransactionsShouldBeProcessed
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
