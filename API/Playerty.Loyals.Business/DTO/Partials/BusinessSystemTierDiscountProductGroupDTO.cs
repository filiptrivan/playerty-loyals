using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    //[CustomValidator("RuleFor(x => x.Discount).GreaterThanOrEqualTo(0).LessThanOrEqualTo(100);")]
    public partial class BusinessSystemTierDiscountProductGroupDTO
    {
        /// <summary>
        /// Fake Id, copy of the DiscountProductGroupId
        /// </summary>
        public long? Id { get; set; }

        /// <summary>
        /// Needs BusinessSystemId because when we add a new table on the client we have to separate which data to show
        /// </summary>
        public long? BusinessSystemId { get; set; }

        public bool SelectedForBusinessSystem { get; set; }

        public int? BusinessSystemTierClientIndex { get; set; }

        public int? TierClientIndex { get; set; }
    }
}
