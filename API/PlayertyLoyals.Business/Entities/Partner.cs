using Microsoft.EntityFrameworkCore;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.Enums;
using PlayertyLoyals.Business.Enums;

namespace PlayertyLoyals.Business.Entities
{
    [Index(nameof(Slug), IsUnique = true)]
    public class Partner : BusinessObject<int>
    {
        [DisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Slug { get; set; } // FT: The user will input the slug, and the slug will be the code in the same time

        /// <summary>
        /// FT: Didn't do like this at the end https://stackoverflow.com/questions/5613898/storing-images-in-sql-server
        /// "A blob name must be at least one character long and cannot be more than 1,024 characters long, for blobs in Azure Storage."
        /// </summary>
        [StringLength(1024, MinimumLength = 1)]
        [BlobName]
        public string LogoImage { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.ColorPick))]
        [StringLength(7)]
        public string PrimaryColor { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductsRecommendationEndpoint { get; set; }

        [Precision(10, 2)]
        [Required]
        public decimal PointsMultiplier { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new();

        public virtual List<Tier> Tiers { get; } = new();

        public virtual List<PartnerNotification> PartnerNotifications { get; } = new();

        public virtual List<PartnerRole> PartnerRoles { get; } = new();

        public virtual List<BusinessSystem> BusinessSystems { get; } = new();

        public virtual List<Segmentation> Segmentations { get; } = new();
    }
}
