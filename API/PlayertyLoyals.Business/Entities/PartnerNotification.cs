using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.DTO;
using System.ComponentModel.DataAnnotations;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Enums;
using Soft.Generator.Shared.BaseEntities;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerNotification : BusinessObject<long>, INotification<PartnerUser>
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

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.PartnerNotifications))]
        public virtual Partner Partner { get; set; }

        #region UIColumn
        [UIColumn(nameof(PartnerUserDTO.UserDisplayName))]
        [UIColumn(nameof(PartnerUserDTO.Points))]
        [UIColumn(nameof(PartnerUserDTO.TierDisplayName))]
        [UIColumn(nameof(PartnerUserDTO.CheckedSegmentationItemsCommaSeparated), "Segmentation")]
        [UIColumn(nameof(PartnerUserDTO.CreatedAt))]
        #endregion
        [SimpleManyToManyTableLazyLoad]
        public virtual List<PartnerUser> Recipients { get; } = new(); // M2M
    }
}
