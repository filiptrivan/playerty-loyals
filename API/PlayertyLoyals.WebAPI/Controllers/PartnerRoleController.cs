using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using PlayertyLoyals.Business.DTO;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerRoleController : SoftBaseController
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
        public async Task<TableResponseDTO<PartnerRoleDTO>> GetPartnerRoleTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerRoleTableData(tableFilterDTO, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerRoleTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerRoleTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Uloge.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartnerRole(int id)
        {
            await _loyalsBusinessService.DeletePartnerRoleAsync(id, false);
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
            return await _loyalsBusinessService.SavePartnerRoleAndReturnSaveBodyDTOAsync(partnerRoleSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetPartnerUserNamebookListForPartnerRole(int partnerRoleId)
        {
            return await _loyalsBusinessService.GetPartnerUserNamebookListForPartnerRole(partnerRoleId, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetPartnerPermissionNamebookListForPartnerRole(int partnerRoleId)
        {
            return await _loyalsBusinessService.GetPartnerPermissionNamebookListForPartnerRole(partnerRoleId, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetPartnerPermissionListForDropdown()
        {
            return await _loyalsBusinessService.GetPartnerPermissionListForDropdown(_context.DbSet<PartnerPermission>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetPartnerRoleListForDropdown()
        {
            return await _loyalsBusinessService.GetPartnerRoleListForDropdown(_context.DbSet<PartnerRole>(), false);
        }

    }
}
