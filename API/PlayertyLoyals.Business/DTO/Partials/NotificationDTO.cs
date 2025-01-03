namespace PlayertyLoyals.Business.DTO
{
    public partial class NotificationDTO
    {
        /// <summary>
        /// This property is only for currently logged in user
        /// </summary>
        public bool? IsMarkedAsRead { get; set; }
    }
}
