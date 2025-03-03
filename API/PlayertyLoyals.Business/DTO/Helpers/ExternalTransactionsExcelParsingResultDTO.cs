using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO.Helpers
{
    public class ExternalTransactionsExcelParsingResultDTO
    {
        public List<ExternalTransactionDTO> ExternalTransactionDTOList { get; set; }
        public InfoAndWarningResultDTO WarningAndInfoResultDTO { get; set; }
    }
}
