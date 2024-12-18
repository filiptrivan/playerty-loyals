using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUserSegmentation
    {
        public virtual PartnerUser PartnerUserThatHasFilledSegmentation { get; set; }

        [M2MMaintanceEntityKey(nameof(PartnerUserThatHasFilledSegmentation))]
        public long PartnerUserThatHasFilledSegmentationId { get; set; }

        public virtual Segmentation AlreadyFilledSegmentation { get; set; }

        [M2MExtendEntityKey(nameof(AlreadyFilledSegmentation))]
        public int AlreadyFilledSegmentationId { get; set; }
    }
}
