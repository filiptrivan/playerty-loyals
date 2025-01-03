using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public class QrCodeDTO
    {
        public string Email { get; set; }
        public Guid TransactionCode { get; set; }
        public int Discount { get; set; }
    }
}
