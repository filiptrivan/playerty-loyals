using Soft.Generator.Shared.Attributes;
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
        [MainEntityManyToMany(nameof(StoreTier))] // TODO FT: Change the generator, we don't need nameof now.
        public virtual StoreTier StoreTier { get; set; }

        [IgnorePropertyInDTO]
        public long StoreTiersId { get; set; }

        [ExtendManyToMany(nameof(DiscountCategory))]
        public virtual DiscountCategory DiscountCategory { get; set; }

        [IgnorePropertyInDTO]
        public long DiscountCategoriesId { get; set; }

        [Range(0, 100)]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation
    }
}
