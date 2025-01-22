using Spider.Security.Entities;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
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
        [DisplayName]
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
