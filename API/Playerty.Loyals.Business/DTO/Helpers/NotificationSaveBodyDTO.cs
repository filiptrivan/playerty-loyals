using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class NotificationSaveBodyDTO
    {
        public List<long> SelectedUserIds { get; set; }
        public NotificationDTO NotificationDTO { get; set; }
    }
}
