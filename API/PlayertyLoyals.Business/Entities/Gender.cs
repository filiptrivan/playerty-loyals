using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class Gender : ReadonlyObject<int>
    {
        [SoftDisplayName]
        [StringLength(70, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        public virtual List<UserExtended> Users { get; } = new();
    }
}
