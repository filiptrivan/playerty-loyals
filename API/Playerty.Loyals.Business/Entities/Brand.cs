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
    public class Brand : BusinessObject<int>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }

        [Precision(10, 1)]
        [Required]
        public decimal PointsMultiplier { get; set; }
    }
}
