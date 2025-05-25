using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.DTO;
using System.ComponentModel.DataAnnotations;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Enums;
using Spiderly.Shared.BaseEntities;
using PlayertyLoyals.Business.Enums;
using Spiderly.Shared.Attributes.EF.Translation;

namespace PlayertyLoyals.Business.Entities
{
    [UIAdditionalPermissionCodeForInsert(nameof(BusinessPermissionCodes.UpdatePartner))]
    [UIAdditionalPermissionCodeForUpdate(nameof(BusinessPermissionCodes.UpdatePartner))]
    public class PartnerNotification : BusinessObject<long>, INotification<PartnerUser>
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

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.PartnerNotifications))]
        public virtual Partner Partner { get; set; }

        #region UITableColumn
        [UITableColumn(nameof(PartnerUserDTO.UserDisplayName))]
        [UITableColumn(nameof(PartnerUserDTO.Points))]
        [UITableColumn(nameof(PartnerUserDTO.TierDisplayName))]
        [UITableColumn(nameof(PartnerUserDTO.CheckedSegmentationItemsCommaSeparated), "Segmentation")]
        [UITableColumn(nameof(PartnerUserDTO.CreatedAt))]
        #endregion
        [SimpleManyToManyTableLazyLoad]
        public virtual List<PartnerUser> Recipients { get; } = new(); // M2M
    }
}
