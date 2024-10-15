using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Infrastructure.Data;
using Soft.Generator.Security.SecurityControllers;
using Soft.Generator.Shared.Interfaces;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using Playerty.Loyals.Services;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.DTO;
using Playerty.Loyals.Business.Enums;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.Helpers;


namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public PartnerController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<PartnerDTO>> LoadPartnerListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadPartnerListForTable(dto, _context.DbSet<Partner>(), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerListToExcel(dto, _context.DbSet<Partner>(), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Partners.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartner(int id)
        {
            await _loyalsBusinessService.DeleteEntityAsync<Partner, int>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerDTO> GetPartner(int id)
        {
            return await _loyalsBusinessService.GetPartnerDTOAsync(id, false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerDTO> SavePartner(PartnerDTO partnerDTO)
        {
            return await _loyalsBusinessService.SavePartnerAndReturnDTOAsync(partnerDTO, false, false);
        }

        [HttpGet]
        //[AuthGuard] // FT: We should show login page of the partner to the user which is not logged in also.
        public async Task<PartnerDTO> GetCurrentPartner()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<CodebookDTO>> LoadPartnerWithSlugListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.LoadPartnerWithSlugListForAutocomplete(limit, query, _context.DbSet<Partner>(), false);
        }
    }
}
