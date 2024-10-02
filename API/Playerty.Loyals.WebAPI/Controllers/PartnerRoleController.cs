using Microsoft.AspNetCore.Mvc;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Services;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using Soft.NgTable.Models;
using Playerty.Loyals.Business.DTO;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerRoleController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public PartnerRoleController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<BaseTableResponseEntity<PartnerRoleDTO>> LoadPartnerRoleListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadPartnerRoleListForTable(dto, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerRoleListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerRoleListToExcel(dto, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Partner_Roles.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartnerRole(int id)
        {
            await _loyalsBusinessService.DeleteEntity<PartnerRole, int>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerRoleDTO> GetPartnerRole(int id)
        {
            return await _loyalsBusinessService.GetPartnerRoleDTOAsync(id, false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerRoleDTO> SavePartnerRole(PartnerRoleSaveBodyDTO partnerRoleSaveBodyDTO)
        {
            return await _loyalsBusinessService.SavePartnerRoleAndReturnDTOExtendedAsync(partnerRoleSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadPartnerUserNamebookListForPartnerRole(int partnerRoleId)
        {
            return await _loyalsBusinessService.LoadPartnerUserNamebookListForPartnerRole(partnerRoleId, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadPermissionNamebookListForPartnerRole(int partnerRoleId)
        {
            return await _loyalsBusinessService.LoadPermissionNamebookListForPartnerRole(partnerRoleId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadPartnerRoleListForDropdown()
        {
            return await _loyalsBusinessService.LoadPartnerRoleListForDropdown(_context.DbSet<PartnerRole>(), false);
        }

    }
}
