using Spider.Shared.Attributes.EF;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserSegmentation
    {
        [M2MMaintanceEntity(nameof(PartnerUserThatHasFilledSegmentation.AlreadyFilledSegmentations))]
        public virtual PartnerUser PartnerUserThatHasFilledSegmentation { get; set; }

        [M2MEntity(nameof(AlreadyFilledSegmentation.PartnerUsersThatHasFilledSegmentation))]
        public virtual Segmentation AlreadyFilledSegmentation { get; set; }
    }
}
