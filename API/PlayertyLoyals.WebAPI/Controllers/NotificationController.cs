using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.Interfaces;
using Azure.Storage.Blobs;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class NotificationController : NotificationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public NotificationController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, BlobContainerClient blobContainerClient)
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _loyalsBusinessService.SendNotificationEmail(notificationId, notificationVersion);
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _loyalsBusinessService.DeleteNotificationForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _loyalsBusinessService.MarkNotificationAsReadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _loyalsBusinessService.MarkNotificationAsUnreadForCurrentUser(notificationId, notificationVersion);
        }

        //[HttpPost]
        //[AuthGuard]
        //public async Task<TableResponseDTO<NotificationDTO>> GetNotificationListForCurrentUser(TableFilterDTO tableFilterDTO)
        //{
        //    return await _loyalsBusinessService.GetNotificationListForCurrentUser(tableFilterDTO);
        //}

        // TODO FT: This should exist in other systems
        //[HttpGet]
        //[AuthGuard]
        //public async Task<int> GetUnreadNotificationCountForTheCurrentUser()
        //{
        //    return await _loyalsBusinessService.GetUnreGetUnreadNotificationCountForTheCurrentUser();
        //}

    }
}
