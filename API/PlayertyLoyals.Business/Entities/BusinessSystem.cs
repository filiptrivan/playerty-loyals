using PlayertyLoyals.Business.Enums;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.Translation;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIAdditionalPermissionCodeForInsert(nameof(BusinessPermissionCodes.UpdatePartner))]
    [UIAdditionalPermissionCodeForUpdate(nameof(BusinessPermissionCodes.UpdatePartner))]
    public class BusinessSystem : BusinessObject<long>
    {
        [UIControlWidth("col-12")]
        [DisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIDoNotGenerate]
        [TranslateSingularSrLatnRS("Putanja za učitavanje transakcija")]
        [StringLength(1000, MinimumLength = 1)]
        public string GetTransactionsEndpoint { get; set; }

        [UIDoNotGenerate]
        [TranslateSingularSrLatnRS("Putanja učitavanja grupa proizvoda za popust")]
        [StringLength(1000, MinimumLength = 1)]
        public string GetDiscountProductGroupsEndpoint { get; set; }

        [TranslateSingularSrLatnRS("Putanja za kreiranje korisnika")]
        [StringLength(1000, MinimumLength = 1)]
        public string CreateUserEndpoint { get; set; }

        [TranslateSingularSrLatnRS("Putanja za ažuriranje grupa korisnika")]
        [StringLength(1000, MinimumLength = 1)]
        public string UpdateUserGroupEndpoint { get; set; }

        /// <summary>
        /// In hours, look if user can pass start time in DTO, so we can initialize scheduler in Azure, it would be nice if we don't have that field in the database.
        /// </summary>
        [TranslateSingularSrLatnRS("Interval za ažuriranje bodova")]
        [UIDoNotGenerate]
        [GreaterThanOrEqualTo(1)]
        public int? UpdatePointsInterval { get; set; }

        [TranslateSingularSrLatnRS("Datum početka ažuriranja bodova")]
        [UIDoNotGenerate]
        public DateTime? UpdatePointsStartDate { get; set; }

        [TranslateSingularSrLatnRS("Ažuriranje bodova pauzirano")]
        [UIDoNotGenerate]
        public bool? UpdatePointsScheduledTaskIsPaused { get; set; }

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.BusinessSystems))]
        public virtual Partner Partner { get; set; }

        public virtual List<BusinessSystemTier> BusinessSystemTiers { get; } = new();

        public virtual List<BusinessSystemUpdatePointsScheduledTask> BusinessSystemUpdatePointsScheduledTasks { get; } = new();

        [UIOrderedOneToMany]
        [TranslateSingularSrLatnRS("Grupe proizvoda za popust")]
        public virtual List<DiscountProductGroup> DiscountProductGroups { get; } = new();
    }
}
