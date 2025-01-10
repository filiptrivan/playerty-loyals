using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
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

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [GreaterThanOrEqualTo(0)]
        [Required]
        public int PointsForTheFirstTimeFill { get; set; }

        [ManyToOneRequired(nameof(Partner.Segmentations))]
        public virtual Partner Partner { get; set; }

        public virtual List<SegmentationItem> SegmentationItems { get; } = new();

        public virtual List<PartnerUser> PartnerUsersThatHasFilledSegmentation { get; } = new();
    }
}
