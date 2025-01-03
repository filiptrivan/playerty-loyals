using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class BusinessSystemTierDiscountProductGroup
    {
        [M2MMaintanceEntity(nameof(BusinessSystemTier.BusinessSystemTierDiscountProductGroups))]
        public virtual BusinessSystemTier BusinessSystemTier { get; set; }

        [M2MExtendEntity(nameof(DiscountProductGroup.BusinessSystemTierDiscountProductGroups))]
        public virtual DiscountProductGroup DiscountProductGroup { get; set; }

        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation
    }
}
