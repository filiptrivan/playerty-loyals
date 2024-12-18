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
    public class UserNotification 
    {
        public virtual Notification Notification { get; set; }

        [M2MMaintanceEntityKey(nameof(Notification))]
        public long NotificationId { get; set; }

        public virtual UserExtended User { get; set; }

        [M2MExtendEntityKey(nameof(User))]
        public long UserId { get; set; }

        public bool IsMarkedAsRead { get; set; }
    }
}
