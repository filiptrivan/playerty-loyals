using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities.Extended
{
    public class PermissionExtended : Permission
    {
        [Required]
        [StringLength(255)]
        public string NameLatin { get; set; }

        [StringLength(1000)]
        public string DescriptionLatin { get; set; }
    }
}
