using Microsoft.EntityFrameworkCore.Infrastructure;
using Spider.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserSegmentation
    {
        [M2MMaintanceEntity(nameof(PartnerUserThatHasFilledSegmentation.AlreadyFilledSegmentations))]
        public virtual PartnerUser PartnerUserThatHasFilledSegmentation { get; set; }

        [M2MExtendEntity(nameof(AlreadyFilledSegmentation.PartnerUsersThatHasFilledSegmentation))]
        public virtual Segmentation AlreadyFilledSegmentation { get; set; }
    }
}
