using Microsoft.EntityFrameworkCore;
using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    /// <summary>
    /// Set all to nullable because of validation and returning the good message to the consumer api
    /// </summary>
    public class ExternalTransactionDTO
    {
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string UserEmail { get; set; }

        [StringLength(20, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }

        [StringLength(500, MinimumLength = 1)]
        [Required]
        public string ProductName { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductImageUrl { get; set; }

        [StringLength(500, MinimumLength = 1)]
        [Required]
        public string ProductCategoryName { get; set; }

        [StringLength(1000, MinimumLength = 1)]
        public string ProductCategoryImageUrl { get; set; }

        [Precision(16, 2)]
        [Required]
        public decimal? Price { get; set; }

        [Required]
        public DateTime? BoughtAt { get; set; }
    }
}
