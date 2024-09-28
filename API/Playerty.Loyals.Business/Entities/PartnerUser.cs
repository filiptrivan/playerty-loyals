using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUser : BusinessObject<long>
    {
        public virtual Partner Partner { get; set; }

        public virtual UserExtended User { get; set; }

        [Required]
        public int Points { get; set; }

        public virtual Tier Tier { get; set; } // FT: It's not required because when the user just made the account and the administrator didn't make any tiers, he can't be any

        public virtual List<Role> Roles { get; set; }

        public virtual List<Notification> Notifications { get; set; }
    }
}
