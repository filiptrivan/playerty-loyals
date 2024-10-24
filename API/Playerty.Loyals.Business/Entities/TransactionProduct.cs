using Playerty.Loyals.Business.Entities;
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
    public class TransactionProduct : ReadonlyObject<long>
    {
        [Required]
        public long ProductId { get; set; }

        [ManyToOneRequired]
        public virtual Transaction Transaction { get; set; }
    }
}
