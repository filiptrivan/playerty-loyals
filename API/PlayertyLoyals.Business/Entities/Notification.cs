using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;
using PlayertyLoyals.Business.DTO;
using Spiderly.Shared.Interfaces;

namespace PlayertyLoyals.Business.Entities
{
    public class Notification : BusinessObject<long>, INotification<UserExtended>
    {
        [UIControlWidth("col-12")]
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Title { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(400, MinimumLength = 1)]
        [Required]
        public string Description { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.Editor))]
        [StringLength(1000, MinimumLength = 1)]
        public string EmailBody { get; set; }

        #region UITableColumn
        [UITableColumn(nameof(UserExtendedDTO.Email))]
        [UITableColumn(nameof(UserExtendedDTO.CreatedAt))]
        #endregion
        [SimpleManyToManyTableLazyLoad]
        public virtual List<UserExtended> Recipients { get; } = new(); // M2M
    }
}
