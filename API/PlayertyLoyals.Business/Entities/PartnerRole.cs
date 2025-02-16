using PlayertyLoyals.Business.Enums;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [UIAdditionalPermissionCodeForInsert(nameof(BusinessPermissionCodes.UpdatePartner))]
    [UIAdditionalPermissionCodeForUpdate(nameof(BusinessPermissionCodes.UpdatePartner))]
    public class PartnerRole : BusinessObject<int>
    {
        [DisplayName]
        [Required]
        [StringLength(255, MinimumLength = 1)]
        [UIControlWidth("col-12")]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        public string Description { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.PartnerRoles))]
        public virtual Partner Partner { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.MultiAutocomplete))]
        public virtual List<PartnerUser> PartnerUsers { get; } = new(); // M2M

        [UIControlType(nameof(UIControlTypeCodes.MultiSelect))]
        public virtual List<PartnerPermission> PartnerPermissions { get; } = new(); // M2M
    }
}
