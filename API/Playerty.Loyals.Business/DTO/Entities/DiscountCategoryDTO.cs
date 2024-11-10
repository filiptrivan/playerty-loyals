using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.Discount).GreaterThanOrEqualTo(0).LessThanOrEqualTo(100);")] // FT: Can't put this on M2M class because we need whole list
    public partial class DiscountCategoryDTO
    {
        public int Discount { get; set; }
        public bool SelectedForStore { get; set; }
        public long StoreTierId { get; set; }
        public int? StoreTierClientIndex { get; set; }
        public int? TierClientIndex { get; set;}
    }
}
