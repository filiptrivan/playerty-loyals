using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Interfaces;
using Azure.Storage.Blobs;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerNotificationController : PartnerNotificationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public PartnerNotificationController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, BlobContainerClient blobContainerClient, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base (context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<PartnerNotificationDTO>> GetPartnerNotificationTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerNotificationTableData(tableFilterDTO, _context.DbSet<PartnerNotification>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportPartnerNotificationTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerNotificationTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerNotification>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Notifikacije.xlsx"));
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<PartnerUserDTO>> GetRecipientsTableDataForPartnerNotification(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerUserTableData(tableFilterDTO, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.Id), false);
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportRecipientsTableDataToExcelForPartnerNotification(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerUserTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Korisnici.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetRecipientsNamebookListForPartnerNotification(long partnerNotificationId)
        {
            return await _loyalsBusinessService.GetRecipientsNamebookListForPartnerNotification(partnerNotificationId, false);
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<LazyLoadSelectedIdsResultDTO<long>> LazyLoadSelectedRecipientsIdsForPartnerNotification(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LazyLoadSelectedRecipientsIdsForPartnerNotification(tableFilterDTO, _context.DbSet<PartnerUser>()
                .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                .OrderBy(x => x.Id));
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendPartnerNotificationEmail(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _loyalsBusinessService.SendPartnerNotificationEmail(partnerNotificationId, partnerNotificationVersion);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetNotificationsForCurrentPartnerUser(tableFilterDTO);
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartnerNotificationForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _loyalsBusinessService.DeletePartnerNotificationForCurrentPartnerUser(partnerNotificationId, partnerNotificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkPartnerNotificationAsReadForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _loyalsBusinessService.MarkPartnerNotificationAsReadForCurrentPartnerUser(partnerNotificationId, partnerNotificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkPartnerNotificationAsUnreadForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _loyalsBusinessService.MarkPartnerNotificationAsUnreadForCurrentPartnerUser(partnerNotificationId, partnerNotificationVersion);
        }

    }
}
