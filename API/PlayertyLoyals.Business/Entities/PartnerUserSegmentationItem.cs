using Spider.Shared.Attributes.EF;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserSegmentationItem
    {
        [M2MMaintanceEntity(nameof(PartnerUser.CheckedSegmentationItems))]
        public virtual PartnerUser PartnerUser { get; set; }

        [M2MEntity(nameof(CheckedSegmentationItem.PartnerUsers))]
        public virtual SegmentationItem CheckedSegmentationItem { get; set; }
    }
}
