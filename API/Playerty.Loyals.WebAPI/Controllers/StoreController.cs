using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.DTO.Helpers;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
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


        public StoreController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, WingsApiService wingsApiService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _wingsApiService = wingsApiService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<StoreDTO>> LoadStoreListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadStoreListForTable(dto, _context.DbSet<Store>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportStoreListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportStoreListToExcel(dto, _context.DbSet<Store>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
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
            await _loyalsBusinessService.UpdatePoints(updatePointsDTO.StoreId, updatePointsDTO.StoreVersion, updatePointsDTO.FromDate);
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
        public async Task<TableResponseDTO<StoreUpdatePointsScheduledTaskDTO>> LoadStoreUpdatePointsScheduledTaskListForTable(TableFilterDTO dto)
        {   
            return await _loyalsBusinessService.LoadStoreUpdatePointsScheduledTaskListForTable(dto, _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == dto.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportStoreUpdatePointsScheduledTaskListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportStoreUpdatePointsScheduledTaskListToExcel(dto, _context.DbSet<StoreUpdatePointsScheduledTask>().Where(x => x.Store.Id == dto.AdditionalFilterIdLong).OrderByDescending(x => x.TransactionsTo), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Izvršena_Ažuriranja_Poena.xlsx"));
        }
    }
}
