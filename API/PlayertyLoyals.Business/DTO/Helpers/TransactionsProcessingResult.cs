using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO.Helpers
{
    public class TransactionsProcessingResult
    {
        public List<string> PartnerUserWhichDoesNotExistList { get; set; } = new List<string>();
        public List<string> TransactionWhichUpdateFailedList { get; set; } = new List<string>();
        public List<string> TransactionWhichUpdateSucceededList { get; set; } = new List<string>();
        public List<string> TransactionWhichWeAlreadyUpdatedForThisPeriodList { get; set; } = new List<string>();
        public int TotalProcessedTransactionsCount { get; set; }

    }
}
