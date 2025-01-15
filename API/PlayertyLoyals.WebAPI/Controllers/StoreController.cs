using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Shared.Terms;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class BusinessSystemController : SoftBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;
        private readonly SyncService _syncService;

        public BusinessSystemController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, WingsApiService wingsApiService,
            SyncService syncService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _wingsApiService = wingsApiService;
            _syncService = syncService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<BusinessSystemDTO>> GetBusinessSystemTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetBusinessSystemTableData(tableFilterDTO, _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportBusinessSystemTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportBusinessSystemTableDataToExcel(tableFilterDTO, _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Prodavnice.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteBusinessSystem(int id)
        {
            await _loyalsBusinessService.DeleteBusinessSystemAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<BusinessSystemDTO> GetBusinessSystem(int id)
        {
            return await _loyalsBusinessService.GetBusinessSystemDTOAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task SyncDiscountCategories(long businessSystemId)
        {
            await _syncService.SyncDiscountCategories(businessSystemId);
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<long>> GetSelectedDiscountProductGroupIdsForBusinessSystem(long businessSystemId)
        //{
        //    return await _loyalsBusinessService.GetSelectedDiscountProductGroupIdsForBusinessSystem(_context.DbSet<DiscountProductGroup>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), businessSystemId);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<DiscountProductGroupDTO>> GetSelectedDiscountProductGroupListForBusinessSystem(long businessSystemId)
        //{
        //    return await _loyalsBusinessService.GetSelectedDiscountProductGroupListForBusinessSystem(_context.DbSet<DiscountProductGroup>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), businessSystemId);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<BusinessSystemItemDTO>> GetBusinessSystemItemsForTheBusinessSystem(int segmentationId)
        //{
        //    return await _loyalsBusinessService.GetBusinessSystemItemsForTheBusinessSystem(segmentationId);
        //}

        [HttpPut]
        [AuthGuard]
        public async Task<BusinessSystemDTO> SaveBusinessSystem(BusinessSystemSaveBodyDTO businessSystemSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveBusinessSystemAndReturnSaveBodyDTOAsync(businessSystemSaveBodyDTO);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<int> SaveBusinessSystemUpdatePointsData(BusinessSystemUpdatePointsDataBodyDTO businessSystemUpdatePointsDataBodyDTO)
        {
            return await _loyalsBusinessService.SaveBusinessSystemUpdatePointsDataAsync(businessSystemUpdatePointsDataBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task ChangeScheduledTaskUpdatePointsStatus(long businessSystemId, int businessSystemVersion)
        {
            await _loyalsBusinessService.ChangeScheduledTaskUpdatePointsStatusAsync(businessSystemId, businessSystemVersion);
        }

        [HttpPost]
        [AuthGuard]
        public async Task UpdatePoints(UpdatePointsDTO updatePointsDTO)
        {
            await _loyalsBusinessService.UpdatePointsAsync(updatePointsDTO);
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<BusinessSystemDTO>> GetBusinessSystemListForTheCurrentPartner()
        //{
        //    return await _loyalsBusinessService.GetBusinessSystemListForTheCurrentPartner();
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<BusinessSystemItemDTO>> GetBusinessSystemItemListForTheCurrentPartner()
        //{
        //    return await _loyalsBusinessService.GetBusinessSystemItemListForTheCurrentPartner();
        //}

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetBusinessSystemListForDropdown()
        {
            return await _loyalsBusinessService.GetBusinessSystemListForDropdown(_context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
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
