using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class Partner : BusinessObject<int>
    {
        [SoftDisplayName]
        [StringLength(255, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1)]
        public string Slug { get; set; } // FT: The user will input the slug, and the slug will be the code in the same time

        public string LoadPurchasesEndpoint { get; set; }
        public string LoadReversalsEndpoint { get; set; }
        public int? UpdatePointsInterval { get; set; } 
        public byte[] LogoImage { get; set; } // https://stackoverflow.com/questions/5613898/storing-images-in-sql-server
        public virtual List<PartnerUser> Users { get; set; }
        public virtual List<Tier> Tiers { get; set; }
        public virtual List<PartnerNotification> PartnerNotifications { get; set; }
        public virtual List<PartnerRole> PartnerRoles { get; set; }
    }
}
