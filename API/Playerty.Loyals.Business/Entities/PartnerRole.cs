using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerRole : Role
    {
        public virtual Partner Partner { get; set; }
        public virtual List<PartnerUser> PartnerUsers { get; set; }
    }
}
