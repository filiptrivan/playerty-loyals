using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Shared.Resources;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Helpers;
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
            SyncService syncService,
            BlobContainerClient blobContainerClient
        )
            : base(context, loyalsBusinessService, blobContainerClient)
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
            return await _loyalsBusinessService.GetBusinessSystemTableData(tableFilterDTO, _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportBusinessSystemTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportBusinessSystemTableDataToExcel(tableFilterDTO, _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Prodavnice.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public async Task SyncDiscountCategories(long businessSystemId)
        {
            await _syncService.SyncDiscountCategories(businessSystemId);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<int> SaveBusinessSystemUpdatePointsData(BusinessSystemUpdatePointsDataBodyDTO businessSystemUpdatePointsDataBodyDTO)
        {
            return await _loyalsBusinessService.SaveBusinessSystemUpdatePointsData(businessSystemUpdatePointsDataBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task ChangeScheduledTaskUpdatePointsStatus(long businessSystemId, int businessSystemVersion)
        {
            await _loyalsBusinessService.ChangeScheduledTaskUpdatePointsStatus(businessSystemId, businessSystemVersion);
        }

        [HttpPost]
        [AuthGuard]
        public async Task UpdatePoints(UpdatePointsDTO updatePointsDTO)
        {
            await _loyalsBusinessService.UpdatePoints(updatePointsDTO);
        }

        [HttpPost]
        [AuthGuard]
        public async Task ExcelManualUpdatePoints([FromForm] ExcelManualUpdatePointsDTO excelManualUpdatePointsDTO) // FT: It doesn't work without interface
        {
            await _loyalsBusinessService.ExcelManualUpdatePoints(excelManualUpdatePointsDTO); // TODO: Make authorization in business service
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<BusinessSystemUpdatePointsScheduledTaskDTO>> GetBusinessSystemUpdatePointsScheduledTaskTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetBusinessSystemUpdatePointsScheduledTaskTableData(tableFilterDTO, _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().Where(x => x.BusinessSystem.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel(tableFilterDTO, _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().Where(x => x.BusinessSystem.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Izvršena_Ažuriranja_Poena.xlsx"));
        }
    }
}
