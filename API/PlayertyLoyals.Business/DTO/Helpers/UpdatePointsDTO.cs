using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
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
