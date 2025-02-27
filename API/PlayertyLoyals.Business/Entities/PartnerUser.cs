using PlayertyLoyals.Business.Enums;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.Translation;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [DisplayName("User.Email")]
    [UIAdditionalPermissionCodeForUpdate(nameof(BusinessPermissionCodes.UpdatePartner))]
    public class PartnerUser : BusinessObject<long>
    {
        [UIControlWidth("col-12")]
        [Required]
        public int Points { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired] // TODO FT: Add partner and user to the primary key
        [WithMany(nameof(Partner.PartnerUsers))]
        public virtual Partner Partner { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired] // TODO FT: Add partner and user to the primary key
        [WithMany(nameof(User.PartnerUsers))]
        public virtual UserExtended User { get; set; }

        [UIDoNotGenerate]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        [SetNull]
        [WithMany(nameof(Tier.PartnerUsers))]
        //[CanNotUpdateThroughMainUIForm]
        public virtual Tier Tier { get; set; } // FT: It's not required because when the user just made the account and the administrator didn't make any tiers, he can't be any

        public virtual List<Transaction> Transactions { get; } = new();

        [GenerateCommaSeparatedDisplayName]
        public virtual List<SegmentationItem> CheckedSegmentationItems { get; } = new(); // M2M

        public virtual List<Segmentation> AlreadyFilledSegmentations { get; } = new(); // M2M

        public virtual List<PartnerRole> PartnerRoles { get; } = new(); // M2M

        public virtual List<PartnerNotification> PartnerNotifications { get; } = new(); // M2M
    }
}
