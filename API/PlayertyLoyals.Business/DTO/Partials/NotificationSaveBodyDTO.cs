using Soft.Generator.Shared.DTO;

namespace PlayertyLoyals.Business.DTO
{
    public partial class NotificationSaveBodyDTO : LazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }
    }
}
