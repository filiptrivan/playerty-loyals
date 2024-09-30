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
        public string Name { get; set; }

        public string Description { get; set; }

        public int PointsForFirstTimeFill { get; set; }

        public virtual List<SegmentationItem> SegmentationItems { get; set; }
    }
}
