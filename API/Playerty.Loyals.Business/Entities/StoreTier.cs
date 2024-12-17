using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class StoreTier : BusinessObject<long>
    {
        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired]
        public virtual Store Store { get; set; }

        [ManyToOneRequired]
        public virtual Tier Tier { get; set; }

        [Map]
        public virtual List<StoreTierDiscountCategory> StoreTierDiscountCategories { get; }
    }
}
