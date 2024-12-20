using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class PartnerNotification : Notification
    {
        [ManyToOneRequired(nameof(Partner.PartnerNotifications))]
        public virtual Partner Partner { get; set; }
        public virtual List<PartnerUser> PartnerUsers { get; } = new();
    }
}
