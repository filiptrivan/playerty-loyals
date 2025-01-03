using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserSegmentationItem
    {
        [M2MMaintanceEntity(nameof(PartnerUser.CheckedSegmentationItems))]
        public virtual PartnerUser PartnerUser { get; set; }

        [M2MExtendEntity(nameof(CheckedSegmentationItem.PartnerUsers))]
        public virtual SegmentationItem CheckedSegmentationItem { get; set; }
    }
}
