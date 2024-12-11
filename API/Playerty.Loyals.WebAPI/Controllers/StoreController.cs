using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
using Playerty.Loyals.Shared.Terms;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class StoreController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;
        private readonly SyncService _syncService;

        public StoreController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, WingsApiService wingsApiService,
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
        public async Task<TableResponseDTO<StoreDTO>> LoadStoreTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadStoreTableData(tableFilterDTO, _context.DbSet<Store>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportStoreTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportStoreTableDataToExcel(tableFilterDTO, _context.DbSet<Store>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Prodavnice.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteStore(int id)
        {
            await _loyalsBusinessService.DeleteStoreAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<StoreDTO> GetStore(int id)
        {
            return await _loyalsBusinessService.GetStoreDTOAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task SyncDiscountCategories(long storeId)
        {
            await _syncService.SyncDiscountCategories(storeId);
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<long>> LoadSelectedDiscountCategoryIdsForStore(long storeId)
        //{
        //    return await _loyalsBusinessService.LoadSelectedDiscountCategoryIdsForStore(_context.DbSet<DiscountCategory>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), storeId);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<DiscountCategoryDTO>> LoadSelectedDiscountCategoryListForStore(long storeId)
        //{
        //    return await _loyalsBusinessService.LoadSelectedDiscountCategoryListForStore(_context.DbSet<DiscountCategory>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), storeId);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<StoreItemDTO>> GetStoreItemsForTheStore(int segmentationId)
        //{
        //    return await _loyalsBusinessService.GetStoreItemsForTheStore(segmentationId);
        //}

        [HttpPut]
        [AuthGuard]
        public async Task<StoreDTO> SaveStore(StoreSaveBodyDTO storeSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveStoreExtendedAsync(storeSaveBodyDTO);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<int> SaveStoreUpdatePointsData(StoreUpdatePointsDataBodyDTO storeUpdatePointsDataBodyDTO)
        {
            return await _loyalsBusinessService.SaveStoreUpdatePointsDataAsync(storeUpdatePointsDataBodyDTO);
        }

        [HttpPost]
        [AuthGuard]
        public async Task UpdatePoints(UpdatePointsDTO updatePointsDTO)
        {
            await _loyalsBusinessService.UpdatePoints(updatePointsDTO.StoreId, updatePointsDTO.StoreVersion, updatePointsDTO.FromDate, updatePointsDTO.ToDate);
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<StoreDTO>> GetStoreListForTheCurrentPartner()
        //{
        //    return await _loyalsBusinessService.GetStoreListForTheCurrentPartner();
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<StoreItemDTO>> GetStoreItemListForTheCurrentPartner()
        //{
        //    return await _loyalsBusinessService.GetStoreItemListForTheCurrentPartner();
        //}

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadStoreListForDropdown()
        {
            return await _loyalsBusinessService.LoadStoreListForDropdown(_context.DbSet<Store>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<StoreUpdatePointsScheduledTaskDTO>> LoadStoreUpdatePointsScheduledTaskTableData(TableFilterDTO tableFilterDTO)
        {   
            return await _loyalsBusinessService.LoadStoreUpdatePointsScheduledTaskTableData(tableFilterDTO, _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportStoreUpdatePointsScheduledTaskTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportStoreUpdatePointsScheduledTaskTableDataToExcel(tableFilterDTO, _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Izvršena_Ažuriranja_Poena.xlsx"));
        }
    }
}
