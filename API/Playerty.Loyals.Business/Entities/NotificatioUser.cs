using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class NotificationUser 
    {
        public long NotificationsId { get; set; }
        public long UsersId { get; set; }

        public bool IsMarkedAsRead { get; set; }
    }
}
