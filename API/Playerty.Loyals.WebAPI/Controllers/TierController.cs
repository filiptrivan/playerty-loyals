using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using Soft.NgTable.Models;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class TierController : SoftControllerBase
    {
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;


        public TierController(SecurityBusinessService securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base()
        {
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<BaseTableResponseEntity<TierDTO>> LoadTierListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadTierListForTable(dto, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportTierListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportTierListToExcel(dto, _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Tiers.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteTier(int id)
        {
            await _loyalsBusinessService.DeleteEntity<Tier, int>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTier(int id)
        {
            return await _loyalsBusinessService.GetTierDTOAsync(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> GetTiersForThePartner()
        {
            return await _loyalsBusinessService.GetTiersForThePartner();
        }

        [HttpPut]
        [AuthGuard]
        public async Task<List<TierDTO>> SaveTierList(List<TierDTO> tierListDTO)
        {
            return await _loyalsBusinessService.SaveTierList(tierListDTO);
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> LoadUserListForTier(int roleId)
        //{
        //    return await _loyalsBusinessService.LoadUserExtendedNamebookListForTier<TUser>(roleId);
        //}
    }
}
