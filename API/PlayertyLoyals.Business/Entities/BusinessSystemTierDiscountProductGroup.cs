using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class BusinessSystemTierDiscountProductGroup
    {
        [M2MMaintanceEntity(nameof(BusinessSystemTier.BusinessSystemTierDiscountProductGroups))]
        public virtual BusinessSystemTier BusinessSystemTier { get; set; }

        [M2MEntity(nameof(DiscountProductGroup.BusinessSystemTierDiscountProductGroups))]
        public virtual DiscountProductGroup DiscountProductGroup { get; set; }
        
        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation
    }
}
