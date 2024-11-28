using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class UpdatePointsDTO
    {
        public long StoreId { get; set; }
        public int StoreVersion { get; set; }
        public DateTime? FromDate { get; set; }
    }
}
