using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
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
        public virtual BusinessSystem BusinessSystem { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(Tier.BusinessSystemTiers))]
        public virtual Tier Tier { get; set; }

        [IncludeInDTO]
        public virtual List<BusinessSystemTierDiscountProductGroup> BusinessSystemTierDiscountProductGroups { get; } = new(); // M2M
    }
}
