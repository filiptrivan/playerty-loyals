using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class TierController : SoftBaseController
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
        public async Task<TableResponseDTO<TierDTO>> GetTierTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetTierTableData(tableFilterDTO, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportTierTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportTierTableDataToExcel(tableFilterDTO, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
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
        public async Task<List<NamebookDTO<int>>> GetTierListForDropdown()
        {
            return await _loyalsBusinessService.GetTierListForDropdown(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> GetTierDTOList()
        {
            return await _loyalsBusinessService.GetTierDTOList(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierSaveBodyDTO> GetTierSaveBodyDTO()
        {
            return await _loyalsBusinessService.GetTierSaveBodyDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> GetTierListForDisplay()
        {
            return await _loyalsBusinessService.GetTierListForDisplay();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTierForTheCurrentPartnerUser()
        {
            return await _loyalsBusinessService.GetTierDTOForTheCurrentPartnerUser();
        }

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<BusinessSystemTierDTO>> GetBusinessSystemTierDTOListForTierList(List<long> tierIds)
        //{
        //    return await _loyalsBusinessService.GetBusinessSystemTierDTOListForTierList(tierIds);
        //}

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<DiscountProductGroupDTO>> GetDiscountProductGroupDTOListForCurrentPartner(List<long> businessSystemTierIds)
        //{
        //    return await _loyalsBusinessService.GetDiscountProductGroupDTOListForCurrentPartner(businessSystemTierIds);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> GetUserListForTier(int roleId)
        //{
        //    return await _loyalsBusinessService.GetUserExtendedNamebookListForTier<TUser>(roleId);
        //}
    }
}
