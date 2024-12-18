using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerRolePartnerPermission
    {
        public virtual PartnerRole PartnerRole { get; set; }

        [M2MMaintanceEntityKey(nameof(PartnerRole))]
        public int PartnerRoleId { get; set; }

        public virtual PartnerPermission PartnerPermission { get; set; }

        [M2MExtendEntityKey(nameof(PartnerPermission))]
        public int PartnerPermissionId { get; set; }
    }
}
