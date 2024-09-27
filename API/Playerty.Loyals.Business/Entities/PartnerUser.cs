using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUser
    {
        [Required]
        public int Points { get; set; }
        public int PartnersId { get; set; }
        public long UsersId { get; set; }
    }
}
