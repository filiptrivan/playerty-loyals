using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class BusinessSystem : BusinessObject<long>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// In hours, look if user can pass start time in DTO, so we can initialize scheduler in Azure, it would be nice if we don't have that field in the database.
        /// </summary>
        [GreaterThanOrEqualTo(1)]
        public int? UpdatePointsInterval { get; set; }

        public DateTime? UpdatePointsStartDate { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string GetTransactionsEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string GetDiscountCategoriesEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string CreateUserEndpoint { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string UpdateUserGroupEndpoint { get; set; }

        public bool? UpdatePointsScheduledTaskIsPaused { get; set; }

        [ManyToOneRequired]
        public virtual Partner Partner { get; set; }

        public virtual List<BusinessSystemTier> BusinessSystemTiers { get; set; }

        public virtual List<BusinessSystemUpdatePointsScheduledTask> BusinessSystemUpdatePointsScheduledTasks { get; set; }
    }
}
