using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Entities;
using Spider.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class BusinessSystemUpdatePointsScheduledTask : BusinessObject<long>
    {
        public DateTime? TransactionsFrom { get; set; }

        public DateTime? TransactionsTo { get; set; }

        [Required]
        public bool IsManual { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(BusinessSystem.BusinessSystemUpdatePointsScheduledTasks))]
        public virtual BusinessSystem BusinessSystem { get; set; }

        public virtual List<Transaction> Transactions { get; } = new();
    }
}
