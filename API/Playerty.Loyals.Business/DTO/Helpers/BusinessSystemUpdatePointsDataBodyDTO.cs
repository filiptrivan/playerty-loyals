using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.UpdatePointsInterval).GreaterThanOrEqualTo(1).Unless(i => i.UpdatePointsInterval == null);")]
    public partial class BusinessSystemUpdatePointsDataBodyDTO
    {
        public long BusinessSystemId { get; set; }
        public int BusinessSystemVersion { get; set; }

        public DateTime? UpdatePointsStartDate { get; set; }

        public int? UpdatePointsInterval { get; set; }
    }
}
