using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerRolePartnerPermission
    {
        [M2MMaintanceEntity(nameof(PartnerRole.PartnerPermissions))]
        public virtual PartnerRole PartnerRole { get; set; }

        [M2MExtendEntity(nameof(PartnerPermission.PartnerRoles))]
        public virtual PartnerPermission PartnerPermission { get; set; }
    }
}
