using PlayertyLoyals.Business.Enums;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [UIAdditionalPermissionCodeForInsert(nameof(BusinessPermissionCodes.UpdatePartner))]
    [UIAdditionalPermissionCodeForUpdate(nameof(BusinessPermissionCodes.UpdatePartner))]
    public class Segmentation : BusinessObject<int>
    {
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [GreaterThanOrEqualTo(0)]
        [Required]
        public int PointsForTheFirstTimeFill { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.Segmentations))]
        public virtual Partner Partner { get; set; }

        [UIOrderedOneToMany]
        [IncludeInDTO]
        [Required]
        public virtual List<SegmentationItem> SegmentationItems { get; } = new();

        public virtual List<PartnerUser> PartnerUsersThatHasFilledSegmentation { get; } = new(); // M2M
    }
}
