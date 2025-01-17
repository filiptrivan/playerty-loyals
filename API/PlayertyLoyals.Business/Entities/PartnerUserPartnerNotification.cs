using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerUserPartnerNotification 
    {
        [M2MMaintanceEntity(nameof(PartnerNotification.Recipients))]
        public virtual PartnerNotification PartnerNotification { get; set; }

        [M2MExtendEntity(nameof(PartnerUser.PartnerNotifications))]
        public virtual PartnerUser PartnerUser { get; set; }

        public bool IsMarkedAsRead { get; set; }
    }
}
