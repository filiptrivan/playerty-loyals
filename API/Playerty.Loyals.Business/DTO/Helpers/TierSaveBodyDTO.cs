using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class TierSaveBodyDTO
    {
        public List<TierDTO> TierDTOList { get; set; }
        public List<StoreTierDTO> StoreTierDTOList { get; set; }
        public List<DiscountCategoryDTO> SelectedDiscountCategoryDTOList { get; set; }
    }
}
