using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUserSegmentationItem
    {
        public virtual PartnerUser PartnerUser { get; set; }

        [M2MMaintanceEntityKey(nameof(PartnerUser))]
        public long PartnerUserId { get; set; }

        public virtual SegmentationItem CheckedSegmentationItem { get; set; }

        [M2MExtendEntityKey(nameof(CheckedSegmentationItem))]
        public long CheckedSegmentationItemId { get; set; }
    }
}
