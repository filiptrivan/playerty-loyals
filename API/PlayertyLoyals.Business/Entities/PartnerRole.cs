using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerRole : BusinessObject<int>
    {
        [SoftDisplayName]
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [ManyToOneRequired(nameof(Partner.PartnerRoles))]
        public virtual Partner Partner { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new();

        public virtual List<PartnerPermission> PartnerPermissions { get; } = new();
    }
}
