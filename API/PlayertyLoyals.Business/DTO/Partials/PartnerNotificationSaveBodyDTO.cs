using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public partial class PartnerNotificationSaveBodyDTO : ILazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }

        public TableFilterDTO TableFilter { get; set; }
        public List<long> SelectedIds { get; set; }
        public List<long> UnselectedIds { get; set; }
        public bool? IsAllSelected { get; set; }
    }
}
