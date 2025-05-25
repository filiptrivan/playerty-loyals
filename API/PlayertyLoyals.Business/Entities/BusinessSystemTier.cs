using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class BusinessSystemTier : BusinessObject<long>
    {
        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(BusinessSystem.BusinessSystemTiers))]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        public virtual BusinessSystem BusinessSystem { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(Tier.BusinessSystemTiers))]
        public virtual Tier Tier { get; set; }

        [IncludeInDTO]
        public virtual List<BusinessSystemTierDiscountProductGroup> BusinessSystemTierDiscountProductGroups { get; } = new(); // M2M
    }
}
