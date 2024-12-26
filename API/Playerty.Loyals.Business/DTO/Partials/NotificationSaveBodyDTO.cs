using Soft.Generator.Shared.DTO;

namespace Playerty.Loyals.Business.DTO
{
    public partial class NotificationSaveBodyDTO : LazyTableSelectionDTO<long>
    {
        public bool IsMarkedAsRead { get; set; }
    }
}
