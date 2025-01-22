using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    /// <summary>
    /// Set all to nullable because of validation and returning the good message to the consumer
    /// </summary>
    [CustomValidator("RuleFor(x => x.UserEmail).EmailAddress().Length(5, 70).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.Code).Length(1, 20).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.ProductName).NotEmpty().Length(1, 500);")]
    [CustomValidator("RuleFor(x => x.ProductImageUrl).Length(1, 1000).Unless(i => string.IsNullOrEmpty(i.ProductImageUrl));")]
    [CustomValidator("RuleFor(x => x.ProductCategoryName).NotEmpty().Length(1, 500);")]
    [CustomValidator("RuleFor(x => x.ProductCategoryImageUrl).Length(1, 1000).Unless(i => string.IsNullOrEmpty(i.ProductCategoryImageUrl));")]
    [CustomValidator("RuleFor(x => x.Price).PrecisionScale(16, 2, false).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.BoughtAt).NotEmpty();")]
    public class ExternalTransactionDTO
    {
        public string UserEmail { get; set; }

        public string Code { get; set; }

        public string ProductName { get; set; }

        public string ProductImageUrl { get; set; }

        public string ProductCategoryName { get; set; }

        public string ProductCategoryImageUrl { get; set; }

        public decimal? Price { get; set; }

        public DateTime? BoughtAt { get; set; }
    }
}
