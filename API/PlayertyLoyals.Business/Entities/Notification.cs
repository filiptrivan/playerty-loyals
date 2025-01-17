using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
using Soft.Generator.Shared.Enums;
using System.ComponentModel.DataAnnotations;
using PlayertyLoyals.Business.DTO;
using Soft.Generator.Shared.Interfaces;

namespace PlayertyLoyals.Business.Entities
{
    public class Notification : BusinessObject<long>, INotification<UserExtended>
    {
        [UIColWidth("col-12")]
        [SoftDisplayName]
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

        #region UIColumn
        [UIColumn(nameof(UserExtendedDTO.Email))]
        [UIColumn(nameof(UserExtendedDTO.CreatedAt))]
        #endregion
        [SimpleManyToManyTableLazyLoad]
        public virtual List<UserExtended> Recipients { get; } = new(); // M2M
    }
}
