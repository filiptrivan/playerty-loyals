using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
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
    /// <summary>
    /// FT: It's business object but only the system can modify it, the system can modify it's statuses
    /// </summary>
    public class Transaction : BusinessObject<long>
    {
        [Required]
        [StringLength(500, MinimumLength = 1)]
        public string ProductName { get; set; }

        /// <summary>
        /// Unique transaction code for the particular business system, so we don't make it globally unique in SQL Server
        /// </summary>
        [Required]
        [StringLength(20, MinimumLength = 1)]
        public string Code { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductImageUrl { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 1)]
        public string ProductCategoryName { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductCategoryImageUrl { get; set; }

        [Precision(16, 2)]
        [Required]
        public decimal Price { get; set; }

        [Required]
        public DateTime BoughtAt { get; set; }

        /// <summary>
        /// Always round the points on the upper decimal
        /// </summary>
        [Required]
        public int Points { get; set; }

        [ManyToOneRequired(nameof(PartnerUser.Transactions))]
        public virtual PartnerUser PartnerUser {  get; set; }

        [ManyToOneRequired(nameof(BusinessSystem.Transactions))]
        public virtual BusinessSystem BusinessSystem { get; set; }
    }
}
