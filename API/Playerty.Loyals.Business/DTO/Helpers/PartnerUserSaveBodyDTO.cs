using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class PartnerUserSaveBodyDTO
    {
        public UserExtendedDTO UserExtendedDTO { get; set; }
        public List<int> SelectedRoleIds { get; set; }

        public PartnerUserDTO PartnerUserDTO { get; set; }
        public List<int> SelectedPartnerRoleIds { get; set; }
    }
}
