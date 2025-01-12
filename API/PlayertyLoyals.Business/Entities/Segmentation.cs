using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
using Soft.Generator.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class Segmentation : BusinessObject<int>
    {
        [SoftDisplayName]
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
        [NonEmpty]
        public virtual List<SegmentationItem> SegmentationItems { get; } = new();

        public virtual List<PartnerUser> PartnerUsersThatHasFilledSegmentation { get; } = new();
    }
}
