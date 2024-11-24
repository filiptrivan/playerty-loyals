using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class DiscountCategory : BusinessObject<long>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }

        [ManyToOneRequired]
        public virtual Store Store { get; set; }

        public virtual List<StoreTierDiscountCategory> StoreTierDiscountCategories { get; }
    }
}
