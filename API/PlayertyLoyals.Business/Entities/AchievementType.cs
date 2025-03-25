using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class AchievementType : ReadonlyObject<int>
    {
        [DisplayName]
        [StringLength(70, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        public virtual List<Achievement> Achievements { get; set; } = new();
    }
}
