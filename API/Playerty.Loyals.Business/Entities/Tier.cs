using Playerty.Loyals.Business.Entities;
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
    public class Tier : BusinessObject<int>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        [Required]
        public string Description { get; set; }

        //[Range(0, 100)]
        //[Required]
        //public int Discount { get; set; } // FT: It can't be byte because of fluent validation

        /// <summary>
        /// Points
        /// </summary>
        [GreaterThanOrEqualTo(0)]
        [Required]
        public int ValidFrom { get; set; }

        /// <summary>
        /// Points
        /// </summary>
        [GreaterThanOrEqualTo(0)]
        [Required]
        public int ValidTo { get; set; }

        public virtual Partner Partner { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; set; }
    }
}
