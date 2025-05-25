using PlayertyLoyals.Business.Enums;
using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.Translation;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
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
        [TranslateSingularSrLatnRS("Korisnici")]
        public virtual List<PartnerUser> PartnerUsers { get; } = new(); // M2M

        [UIControlType(nameof(UIControlTypeCodes.MultiSelect))]
        [TranslateSingularSrLatnRS("Permisije")]
        public virtual List<PartnerPermission> PartnerPermissions { get; } = new(); // M2M
    }
}
