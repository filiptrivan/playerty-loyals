using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerRole : BusinessObject<int>
    {
        [SoftDisplayName]
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [ManyToOneRequired]
        public virtual Partner Partner { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; set; }

        public virtual List<PartnerPermission> PartnerPermissions { get; set; }
    }
}
