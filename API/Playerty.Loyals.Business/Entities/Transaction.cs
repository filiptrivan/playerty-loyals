using Microsoft.EntityFrameworkCore;
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
    // FT: It's business object but only the system can modify it, the system can modify it's statuses
    public class Transaction : BusinessObject<long>
    {
        [Required]
        [StringLength(500, MinimumLength = 1)]
        public string ProductName { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 1)]
        public string ProductCategoryName { get; set; }

        [Precision(16, 2)]
        [Required]
        public decimal Price { get; set; }

        /// <summary>
        /// Always round the points on the upper decimal
        /// </summary>
        [Required]
        public int Points { get; set; }

        [ManyToOneRequired]
        public virtual PartnerUser PartnerUser {  get; set; }
    }
}
