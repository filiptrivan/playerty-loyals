using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
using Soft.Generator.Shared.Enums;
using PlayertyLoyals.Business.DTO;
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

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.PartnerRoles))]
        public virtual Partner Partner { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.MultiAutocomplete))]
        public virtual List<PartnerUser> PartnerUsers { get; } = new(); // M2M

        [UIControlType(nameof(UIControlTypeCodes.MultiSelect))]
        public virtual List<PartnerPermission> PartnerPermissions { get; } = new(); // M2M
    }
}
