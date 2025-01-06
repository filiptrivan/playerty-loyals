using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Interfaces;

namespace PlayertyLoyals.Business.DTO
{
    public partial class NotificationSaveBodyDTO : ILazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }

        public TableFilterDTO TableFilter { get ; set ; }
        public List<long> SelectedIds { get ; set ; }
        public List<long> UnselectedIds { get ; set ; }
        public bool? IsAllSelected { get ; set ; }
    }
}
