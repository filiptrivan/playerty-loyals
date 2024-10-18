using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    [Index(nameof(Slug), IsUnique = true)]
    public class Partner : BusinessObject<int>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Slug { get; set; } // FT: The user will input the slug, and the slug will be the code in the same time

        [StringLength(1000, MinimumLength = 1)]
        public string LoadPurchasesEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string LoadReversalsEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string CreateUserEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string UpdateUserGroupEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductsRecommendationEndpoint { get; set; }

        /// <summary>
        /// In hours
        /// </summary>
        [GreaterThanOrEqualTo(1)]
        public int? UpdatePointsInterval { get; set; }

        /// <summary>
        /// FT: Didn't do like this at the end https://stackoverflow.com/questions/5613898/storing-images-in-sql-server
        /// "A blob name must be at least one character long and cannot be more than 1,024 characters long, for blobs in Azure Storage."
        /// </summary>
        [StringLength(1024, MinimumLength = 1)]
        [BlobName]
        public string LogoImageBlobName { get; set; } 

        [StringLength(7)]
        public string PrimaryColor { get; set; }

        public virtual List<PartnerUser> Users { get; set; }
        public virtual List<Tier> Tiers { get; set; }
        public virtual List<PartnerNotification> PartnerNotifications { get; set; }
        public virtual List<PartnerRole> PartnerRoles { get; set; }
    }
}
