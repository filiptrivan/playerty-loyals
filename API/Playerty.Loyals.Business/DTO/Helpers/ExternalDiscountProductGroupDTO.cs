using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    [CustomValidator("RuleFor(x => x.Name).Length(1, 255).NotEmpty();")]
    [CustomValidator("RuleFor(x => x.Code).Length(1, 100).NotEmpty();")]
    public class ExternalDiscountProductGroupDTO
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
