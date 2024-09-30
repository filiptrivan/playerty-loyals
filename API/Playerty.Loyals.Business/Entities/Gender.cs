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
    public class Gender : ReadonlyObject<int>
    {
        [SoftDisplayName]
        [StringLength(70, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(70, MinimumLength = 1)]
        public string NameLatin { get; set; }
    }
}
