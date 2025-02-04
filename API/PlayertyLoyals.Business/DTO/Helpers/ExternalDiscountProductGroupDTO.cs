using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public class ExternalDiscountProductGroupDTO
    {
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Code { get; set; }
    }
}
