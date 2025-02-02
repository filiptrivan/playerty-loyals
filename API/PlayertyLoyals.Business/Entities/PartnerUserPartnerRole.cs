using Spider.Shared.Attributes.EF;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserPartnerRole
    {
        [M2MMaintanceEntity(nameof(PartnerRole.PartnerUsers))]
        public virtual PartnerRole PartnerRole { get; set; }

        [M2MEntity(nameof(PartnerUser.PartnerRoles))]
        public virtual PartnerUser PartnerUser { get; set; }
    }
}
