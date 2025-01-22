using Spider.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.UpdatePointsStartDate).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.UpdatePointsInterval).NotEmpty().GreaterThanOrEqualTo(1);")]
    public partial class BusinessSystemUpdatePointsDataBodyDTO
    {
        public long BusinessSystemId { get; set; }
        public int BusinessSystemVersion { get; set; }

        public DateTime? UpdatePointsStartDate { get; set; }

        public int? UpdatePointsInterval { get; set; }
    }
}
