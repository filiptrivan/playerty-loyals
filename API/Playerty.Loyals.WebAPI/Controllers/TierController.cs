using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class TierController : SoftControllerBase
    {
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;


        public TierController(IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base()
        {
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<TierDTO>> LoadTierListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadTierListForTable(dto, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportTierListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportTierListToExcel(dto, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Nivoi_Lojalnosti.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteTier(int id)
        {
            await _loyalsBusinessService.DeleteTierAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTier(int id)
        {
            return await _loyalsBusinessService.GetTierDTOAsync(id, false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<TierSaveBodyDTO> SaveTier(TierSaveBodyDTO tierSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveTier(tierSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadTierListForDropdown()
        {
            return await _loyalsBusinessService.LoadTierListForDropdown(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> LoadTierDTOList()
        {
            return await _loyalsBusinessService.LoadTierDTOList(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierSaveBodyDTO> LoadTierSaveBodyDTO()
        {
            return await _loyalsBusinessService.LoadTierSaveBodyDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> LoadTierListFromLargestToSmallest()
        {
            return await _loyalsBusinessService.LoadTierDTOList(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderByDescending(x => x.ValidFrom), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTierForTheCurrentPartnerUser()
        {
            return await _loyalsBusinessService.GetTierDTOForTheCurrentPartnerUser();
        }

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<StoreTierDTO>> LoadStoreTierDTOListForTierList(List<long> tierIds)
        //{
        //    return await _loyalsBusinessService.LoadStoreTierDTOListForTierList(tierIds);
        //}

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<DiscountCategoryDTO>> LoadDiscountCategoryDTOListForCurrentPartner(List<long> storeTierIds)
        //{
        //    return await _loyalsBusinessService.LoadDiscountCategoryDTOListForCurrentPartner(storeTierIds);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> LoadUserListForTier(int roleId)
        //{
        //    return await _loyalsBusinessService.LoadUserExtendedNamebookListForTier<TUser>(roleId);
        //}
    }
}
