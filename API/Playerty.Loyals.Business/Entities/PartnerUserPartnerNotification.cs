using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerUserPartnerNotification 
    {
        public virtual PartnerNotification PartnerNotification { get; set; }

        [M2MMaintanceEntityKey(nameof(PartnerNotification))]
        public long PartnerNotificationId { get; set; }

        public virtual PartnerUser PartnerUser { get; set; }

        [M2MExtendEntityKey(nameof(PartnerUser))]
        public long PartnerUserId { get; set; }

        public bool IsMarkedAsRead { get; set; }
    }
}
