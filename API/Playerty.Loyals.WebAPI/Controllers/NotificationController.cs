using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Services;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using Soft.NgTable.Models;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class NotificationController : SoftControllerBase
    {
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public NotificationController(SecurityBusinessService securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService)
            : base()
        {
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<BaseTableResponseEntity<NotificationDTO>> LoadNotificationListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadNotificationListForTable(dto);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportNotificationListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportNotificationListToExcel(dto);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Notifications.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotification(long id)
        {
            await _loyalsBusinessService.DeleteEntity<Notification, long>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<NotificationDTO> GetNotification(long id)
        {
            return await _loyalsBusinessService.GetNotificationDTOAsync(id);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<NotificationDTO> SaveNotification(NotificationSaveBodyDTO notificationSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveNotificationAndReturnDTOExtendedAsync(notificationSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserExtendedNamebookListForNotification(long notificationId)
        {
            return await _loyalsBusinessService.LoadUserExtendedNamebookListForNotification(notificationId);
        }
    }
}
