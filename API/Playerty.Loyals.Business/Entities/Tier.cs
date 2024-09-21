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

        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string NameLatin { get; set; }

        [Range(0, 100)]
        [Required]
        public int Discount { get; set; } // FT: It can't be byte because of fluent validation

        /// <summary>
        /// Points
        /// </summary>
        public int ValidFrom { get; set; }

        /// <summary>
        /// Points
        /// </summary>
        public int ValidTo { get; set; }

        public virtual List<UserExtended> Users { get; set; }
    }
}
