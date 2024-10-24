using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
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

        [ManyToOneRequired]
        public virtual Partner Partner { get; set; }

        [Required]
        public virtual List<SegmentationItem> SegmentationItems { get; set; }

        public virtual List<PartnerUser> PartnerUsersThatHasFilledSegmentation { get; set; }
    }
}
