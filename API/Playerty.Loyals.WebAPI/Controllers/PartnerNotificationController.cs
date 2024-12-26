using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Emailing;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerNotificationController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public PartnerNotificationController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<PartnerNotificationDTO>> LoadPartnerNotificationTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadPartnerNotificationTableData(tableFilterDTO, _context.DbSet<PartnerNotification>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerNotificationTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerNotificationTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerNotification>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Notifikacije.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartnerNotification(long id)
        {
            await _loyalsBusinessService.DeletePartnerNotificationAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerNotificationDTO> GetPartnerNotification(long id)
        {
            return await _loyalsBusinessService.GetPartnerNotificationDTOAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadPartnerUserNamebookListForPartnerNotification(long partnerNotificationId)
        {
            return await _loyalsBusinessService.LoadPartnerUserNamebookListForPartnerNotification(partnerNotificationId, false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<LazyLoadSelectedIdsResultDTO<long>> LazyLoadSelectedPartnerUserIdsForPartnerNotification(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LazyLoadSelectedPartnerUserIdsForPartnerNotification(tableFilterDTO, _context.DbSet<PartnerUser>()
                .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                .OrderBy(x => x.Id));
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerNotificationDTO> SavePartnerNotification(PartnerNotificationSaveBodyDTO partnerNotificationSaveBodyDTO)
        {
            return await _loyalsBusinessService.SavePartnerNotificationAndReturnDTOExtendedAsync(partnerNotificationSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendPartnerNotificationEmail(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _loyalsBusinessService.SendPartnerNotificationEmail(partnerNotificationId, partnerNotificationVersion);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<NotificationDTO>> LoadNotificationListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadNotificationListForTheCurrentPartnerUser(tableFilterDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<int> GetUnreadNotificationCountForTheCurrentPartnerUser()
        {
            return await _loyalsBusinessService.GetUnreadNotificationCountForTheCurrentPartnerUser();
        }

    }
}
