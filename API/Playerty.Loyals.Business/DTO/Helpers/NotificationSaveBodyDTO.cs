using Soft.Generator.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public partial class NotificationSaveBodyDTO : LazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }
    }
}
