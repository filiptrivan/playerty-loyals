using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    [SoftDisplayName("User.Email")]
    public class PartnerUser : BusinessObject<long> // https://learn.microsoft.com/en-us/ef/core/modeling/inheritance
    {
        [Required]
        public int Points { get; set; }

        [ManyToOneRequired] // TODO FT: Add partner and user to the primary key
        [WithMany(nameof(Partner.PartnerUsers))]
        public virtual Partner Partner { get; set; }

        [ManyToOneRequired] // TODO FT: Add partner and user to the primary key
        [WithMany(nameof(User.PartnerUsers))]
        public virtual UserExtended User { get; set; }

        /// <summary>
        /// [SET NULL] https://www.learnentityframeworkcore.com/conventions/one-to-many-relationship
        /// </summary>
        [SetNull]
        [WithMany(nameof(Tier.PartnerUsers))]
        public virtual Tier Tier { get; set; } // FT: It's not required because when the user just made the account and the administrator didn't make any tiers, he can't be any

        public virtual List<Transaction> Transactions { get; } = new();

        [GenerateCommaSeparatedDisplayName]
        public virtual List<SegmentationItem> CheckedSegmentationItems { get; } = new(); // M2M

        public virtual List<Segmentation> AlreadyFilledSegmentations { get; } = new(); // M2M

        public virtual List<PartnerRole> PartnerRoles { get; } = new(); // M2M

        public virtual List<PartnerNotification> PartnerNotifications { get; } = new(); // M2M
    }
}
