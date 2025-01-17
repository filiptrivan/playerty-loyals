using Microsoft.AspNetCore.Http;
using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.BusinessSystemId).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.BusinessSystemVersion).NotEmpty();")]
    public class ExcelManualUpdatePointsDTO
    {
        public long? BusinessSystemId { get; set; }
        public int? BusinessSystemVersion { get; set; }
        public IFormFile Excel { get; set; }
    }
}
