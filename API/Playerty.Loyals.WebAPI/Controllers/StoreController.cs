using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
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
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Segmentacije.xlsx"));
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
        public async Task<List<DiscountCategoryDTO>> LoadDiscountCategoryDTOListForCurrentPartner(long storeId)
        {
            return await _loyalsBusinessService.LoadDiscountCategoryDTOListForCurrentPartner(storeId);
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

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> LoadStoreItemListForDropdown()
        //{
        //    return await _loyalsBusinessService.LoadStoreItemListForDropdown(_context.DbSet<StoreItem>().Where(x => x.Store.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        //}

    }
}
