using Microsoft.AspNetCore.Http;
using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public class ExcelManualUpdatePointsDTO
    {
        [Required]
        public long? BusinessSystemId { get; set; }

        [Required]
        public int? BusinessSystemVersion { get; set; }

        public IFormFile Excel { get; set; }
    }
}
