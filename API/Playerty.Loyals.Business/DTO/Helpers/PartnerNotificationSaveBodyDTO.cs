using Soft.Generator.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class PartnerNotificationSaveBodyDTO : TableSelectionDTO<long>
    {
        public PartnerNotificationDTO PartnerNotificationDTO { get; set; }
        public bool IsMarkedAsRead { get; set; }
    }
}
