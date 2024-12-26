using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public partial class TierSaveBodyDTO
    {
        public List<TierDTO> TierDTOList { get; set; }
        public List<BusinessSystemTierDTO> BusinessSystemTierDTOList { get; set; }
        public List<BusinessSystemTierDiscountProductGroupDTO> BusinessSystemTierDiscountProductGroupDTOList { get; set; }
    }
}
