using Spider.Shared.Attributes.EF;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserPartnerNotification 
    {
        [M2MMaintanceEntity(nameof(PartnerNotification.Recipients))]
        public virtual PartnerNotification PartnerNotification { get; set; }

        [M2MEntity(nameof(PartnerUser.PartnerNotifications))]
        public virtual PartnerUser PartnerUser { get; set; }

        public bool IsMarkedAsRead { get; set; }
    }
}
