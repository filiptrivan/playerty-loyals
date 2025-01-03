using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public class BrandDTO
    {
        //[SoftDisplayName]
        //[StringLength(255, MinimumLength = 1)]
        //[Required]
        public string Name { get; set; }

        //[StringLength(255, MinimumLength = 1)]
        //[Required]
        public string NameLatin { get; set; }

        //[StringLength(255, MinimumLength = 1)]
        //[Required]
        public string Code { get; set; }

        //[Precision(10, 1)]
        //[Required]
        public decimal PointsMultiplier { get; set; }
    }
}
