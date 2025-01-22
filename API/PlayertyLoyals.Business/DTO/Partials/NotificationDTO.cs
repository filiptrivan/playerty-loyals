using PlayertyLoyals.Business.Enums;
using Spider.Shared.Attributes.EF.UI;

namespace PlayertyLoyals.Business.DTO
{
    public partial class NotificationDTO
    {
        /// <summary>
        /// This property is only for currently logged in user
        /// </summary>
        [UIDoNotGenerate]
        public bool? IsMarkedAsRead { get; set; }

        [UIDoNotGenerate]
        public NotificationDiscriminatorCodes Discriminator { get; set; }
    }
}
