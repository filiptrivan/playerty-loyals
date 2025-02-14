using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.DTO;
using System.ComponentModel.DataAnnotations;
using Spider.Shared.Interfaces;
using Spider.Shared.Enums;
using Spider.Shared.BaseEntities;
using PlayertyLoyals.Business.Enums;

namespace PlayertyLoyals.Business.Entities
{
    [CanInsertAdditionalPermissionCode(nameof(BusinessPermissionCodes.UpdatePartner))]
    [CanUpdateAdditionalPermissionCode(nameof(BusinessPermissionCodes.UpdatePartner))]
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
