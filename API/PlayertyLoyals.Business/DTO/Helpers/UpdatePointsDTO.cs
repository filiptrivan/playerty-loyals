using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.BusinessSystemId).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.BusinessSystemVersion).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.FromDate).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.ToDate).NotEmpty();")]
    public class UpdatePointsDTO
    {
        [Required]
        public long? BusinessSystemId { get; set; }

        [Required]
        public int? BusinessSystemVersion { get; set; }

        [Required]
        public DateTime? FromDate { get; set; }

        [Required]
        public DateTime? ToDate { get; set; }
    }
}
