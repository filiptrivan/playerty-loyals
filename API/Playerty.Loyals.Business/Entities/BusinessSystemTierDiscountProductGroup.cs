using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class BusinessSystemTierDiscountProductGroup
    {
        public virtual BusinessSystemTier BusinessSystemTier { get; set; }

        [M2MMaintanceEntityKey(nameof(BusinessSystemTier))]
        public long BusinessSystemTierId { get; set; }

        public virtual DiscountProductGroup DiscountProductGroup { get; set; }

        [M2MExtendEntityKey(nameof(DiscountProductGroup))]
        public long DiscountProductGroupId { get; set; }

        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation
    }
}
