using Microsoft.EntityFrameworkCore;
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
    public class Transaction : BusinessObject<long>
    {
        [SoftDisplayName]
        [Required]
        public Guid Guid { get; set; }

        [Precision(16, 2)]
        [Required]
        public decimal Price { get; set; }

        /// <summary>
        /// Always round the points on the upper decimal
        /// </summary>
        [Required]
        public int Points { get; set; }

        /// <summary>
        /// Making the list because we should show to user statuses like this: Completed -> Returned -> Shipped...
        /// </summary>
        public virtual List<TransactionStatus> TransactionStatus { get; set; }

        //public virtual List<Product> Products { get; set; }
    }
}
