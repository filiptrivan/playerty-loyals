using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public partial class PartnerUserSaveBodyDTO
    {
        public List<int> SelectedPartnerRoleIds { get; set; }
        public List<long> SelectedSegmentationItemIds { get; set; }

        public UserExtendedDTO UserExtendedDTO { get; set; }
        public List<int> SelectedRoleIds { get; set; }
    }
}
