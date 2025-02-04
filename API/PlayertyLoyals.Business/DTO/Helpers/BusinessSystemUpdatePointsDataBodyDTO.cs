using Spider.Shared.Attributes;
using Spider.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public partial class BusinessSystemUpdatePointsDataBodyDTO
    {
        public long BusinessSystemId { get; set; }

        public int BusinessSystemVersion { get; set; }

        [Required]
        public DateTime? UpdatePointsStartDate { get; set; }

        [GreaterThanOrEqualTo(1)]
        [Required]
        public int? UpdatePointsInterval { get; set; }
    }
}
