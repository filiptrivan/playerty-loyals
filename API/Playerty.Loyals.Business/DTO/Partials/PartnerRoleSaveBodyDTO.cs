using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public partial class PartnerRoleSaveBodyDTO
    {
        public List<int> SelectedPermissionIds { get; set; }
        public List<long> SelectedPartnerUserIds { get; set; }
    }
}
