using Spider.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserPartnerRole
    {
        [M2MMaintanceEntity(nameof(PartnerRole.PartnerUsers))]
        public virtual PartnerRole PartnerRole { get; set; }

        [M2MExtendEntity(nameof(PartnerUser.PartnerRoles))]
        public virtual PartnerUser PartnerUser { get; set; }
    }
}
