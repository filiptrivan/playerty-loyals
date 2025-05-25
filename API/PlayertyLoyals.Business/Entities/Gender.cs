using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class Gender : ReadonlyObject<int>
    {
        [DisplayName]
        [StringLength(70, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        public virtual List<UserExtended> Users { get; } = new();
    }
}
