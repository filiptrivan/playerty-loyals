using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class StoreTierDiscountCategory
    {
        public virtual StoreTier StoreTier { get; set; }

        [M2MMaintanceEntityKey(nameof(StoreTier))]
        public long StoreTiersId { get; set; }

        public virtual DiscountCategory DiscountCategory { get; set; }

        [M2MExtendEntityKey(nameof(DiscountCategory))]
        public long DiscountCategoriesId { get; set; }

        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation
    }
}
