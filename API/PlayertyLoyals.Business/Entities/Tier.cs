using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    public class Tier : BusinessObject<int>
    {
        [DisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        /// <summary>
        /// Points
        /// </summary>
        [GreaterThanOrEqualTo(0)]
        [Required]
        public int ValidFrom { get; set; }

        /// <summary>
        /// Points
        /// </summary>
        [GreaterThanOrEqualTo(0)]
        [Required]
        public int ValidTo { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.Tiers))]
        public virtual Partner Partner { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new();

        /// <summary>
        /// FT: Deleted the setter from the property, because EF make some unintentional Change Tracking, and saves those in DataBase.
        /// </summary>
        [IncludeInDTO]
        public virtual List<BusinessSystemTier> BusinessSystemTiers { get; } = new();
    }
}
