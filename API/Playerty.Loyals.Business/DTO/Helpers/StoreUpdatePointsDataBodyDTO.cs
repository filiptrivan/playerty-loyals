using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.UpdatePointsInterval).GreaterThanOrEqualTo(1).Unless(i => i.UpdatePointsInterval == null);")]
    public class StoreUpdatePointsDataBodyDTO
    {
        public long StoreId { get; set; }
        public int StoreVersion { get; set; }

        public DateTime? UpdatePointsStartDate { get; set; }

        public int? UpdatePointsInterval { get; set; }
    }
}
