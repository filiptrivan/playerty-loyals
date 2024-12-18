using Playerty.Loyals.Business.Entities;
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
    public class Tier : BusinessObject<int>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

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

        [ManyToOneRequired]
        public virtual Partner Partner { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; set; }

        /// <summary>
        /// FT: Deleted the setter from the property, because EF make some unintentional Change Tracking, and saves those in DataBase.
        /// </summary>
        [Map]
        public virtual List<BusinessSystemTier> BusinessSystemTiers { get; }
    }
}
