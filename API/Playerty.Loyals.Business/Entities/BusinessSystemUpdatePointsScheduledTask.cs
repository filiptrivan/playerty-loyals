using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using Soft.Generator.Shared.Entities;
using Soft.Generator.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class BusinessSystemUpdatePointsScheduledTask : BusinessObject<long>
    {
        [Required]
        public DateTime TransactionsFrom { get; set; }

        [Required]
        public DateTime TransactionsTo { get; set; }

        [Required]
        public bool IsManual { get; set; }

        [ManyToOneRequired(nameof(BusinessSystem.BusinessSystemUpdatePointsScheduledTasks))]
        public virtual BusinessSystem BusinessSystem { get; set; }
    }
}
