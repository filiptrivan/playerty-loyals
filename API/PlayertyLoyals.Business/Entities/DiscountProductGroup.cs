using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.Translation;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [TranslatePluralSrLatnRS("Grupa proizvoda za popust")]
    [UIDoNotGenerate]
    public class DiscountProductGroup : BusinessObject<long>
    {
        [DisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }

        [UIDoNotGenerate]
        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(BusinessSystem.DiscountProductGroups))]
        public virtual BusinessSystem BusinessSystem { get; set; }

        public virtual List<BusinessSystemTierDiscountProductGroup> BusinessSystemTierDiscountProductGroups { get; } = new(); // M2M
    }
}
