using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class DiscountProductGroup : BusinessObject<long>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }

        [ManyToOneRequired(nameof(BusinessSystem.DiscountProductGroups))]
        public virtual BusinessSystem BusinessSystem { get; set; }

        public virtual List<BusinessSystemTierDiscountProductGroup> BusinessSystemTierDiscountProductGroups { get; } = new();
    }
}
