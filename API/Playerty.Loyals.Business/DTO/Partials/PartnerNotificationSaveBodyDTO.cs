using Soft.Generator.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public partial class PartnerNotificationSaveBodyDTO : LazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }
    }
}
