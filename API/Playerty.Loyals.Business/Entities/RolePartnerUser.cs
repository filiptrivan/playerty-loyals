using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class RolePartnerUser
    {
        public int RolesId { get; set; }
        public long PartnerUsersId { get; set; }
    }
}
