using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUserPartnerRole
    {
        public virtual PartnerRole PartnerRole { get; set; }
        
        [M2MMaintanceEntityKey(nameof(PartnerRole))]
        public int PartnerRoleId { get; set; }

        public virtual PartnerUser PartnerUser { get; set; }

        [M2MExtendEntityKey(nameof(PartnerUser))]
        public long PartnerUserId { get; set; }
    }
}
