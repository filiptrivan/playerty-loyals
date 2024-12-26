using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace Playerty.Loyals.Business.Entities
{
    public class Notification : BusinessObject<long>
    {
        [SoftDisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Title { get; set; }

        [StringLength(400, MinimumLength = 1)]
        [Required]
        public string Description { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string EmailBody { get; set; }

        public virtual List<UserExtended> Users { get; } = new();
    }
}
