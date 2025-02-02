using Spider.Shared.Attributes.EF;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerRolePartnerPermission
    {
        [M2MMaintanceEntity(nameof(PartnerRole.PartnerPermissions))]
        public virtual PartnerRole PartnerRole { get; set; }

        [M2MEntity(nameof(PartnerPermission.PartnerRoles))]
        public virtual PartnerPermission PartnerPermission { get; set; }
    }
}
