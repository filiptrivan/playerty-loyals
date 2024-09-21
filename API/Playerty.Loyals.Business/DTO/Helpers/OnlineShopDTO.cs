using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class OnlineShopDTO
    {
        public Guid TransactionCode { get; set; }
        public int Discount { get; set; }
    }
}
