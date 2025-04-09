using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class BusinessSystemController : BusinessSystemBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;
        private readonly SyncService _syncService;

        public BusinessSystemController(
            IApplicationDbContext context,
            LoyalsBusinessService loyalsBusinessService,
            PartnerUserAuthenticationService partnerUserAuthenticationService,
            WingsApiService wingsApiService,
            SyncService syncService
        )
            : base(context, loyalsBusinessService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _wingsApiService = wingsApiService;
            _syncService = syncService;
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<BusinessSystemDTO>> GetBusinessSystemTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetBusinessSystemTableData(
                tableFilterDTO, 
                _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportBusinessSystemTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportBusinessSystemTableDataToExcel(
                tableFilterDTO, 
                _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Poslovni_Sistemi.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public async Task SyncDiscountProductGroups(long businessSystemId)
        {
            await _syncService.SyncDiscountProductGroups(businessSystemId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<InfoAndWarningResultDTO> ExcelUpdatePointsForWings([FromForm] ExcelUpdatePointsDTO excelUpdatePointsDTO)
        {
            return await _loyalsBusinessService.ExcelUpdatePointsForWings(excelUpdatePointsDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task RevertToTaskState(long taskForRevertId)
        {
            await _loyalsBusinessService.RevertToTaskState(taskForRevertId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendUpdatePointsNotificationToUsers(long taskForNotificationId)
        {
            await _loyalsBusinessService.SendUpdatePointsNotificationToUsers(taskForNotificationId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<BusinessSystemUpdatePointsScheduledTaskDTO>> GetBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem(tableFilterDTO);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem(tableFilterDTO);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Izvršena_Ažuriranja_Bodova.xlsx"));
        }
    }
}
