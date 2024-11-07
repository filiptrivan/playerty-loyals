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
using Soft.Generator.Shared.Extensions;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerUserController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public PartnerUserController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<PartnerUserDTO> GetCurrentPartnerUser()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerUserDTO();
        }


        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<PartnerUserDTO>> LoadPartnerUserListForTable(TableFilterDTO dto)
        {
            // FT: Ordering by because of notifications
            return await _loyalsBusinessService.LoadPartnerUserListForTable(dto, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.Id), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerUserListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerUserListToExcel(dto, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Korisnici.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartnerUser(long id)
        {
            await _loyalsBusinessService.DeletePartnerUserAsync(id, false); // TODO FT: Override
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerUserDTO> GetPartnerUser(long id)
        {
            return await _loyalsBusinessService.GetPartnerUserDTOAsync(id, false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerUserSaveBodyDTO> SavePartnerUser(PartnerUserSaveBodyDTO dto)
        {
            return await _loyalsBusinessService.SavePartnerUserAndReturnDTOExtendedAsync(dto);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadPartnerUserListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.LoadPartnerUserListForAutocomplete(limit, query, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadPartnerUserListForDropdown()
        {
            return await _loyalsBusinessService.LoadPartnerUserListForDropdown(_context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentPartnerUserPermissionCodes();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadPartnerRoleNamebookListForPartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.LoadPartnerRoleNamebookListForPartnerUser(partnerUserId, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<long>> GetCheckedSegmentationItemIdsForThePartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetCheckedSegmentationItemIdsForThePartnerUser(partnerUserId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<int>> GetAlreadyFilledSegmentationIdsForThePartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetAlreadyFilledSegmentationIdsForThePartnerUser(partnerUserId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerUserDTO> GetPartnerUserForTheUser(long id)
        {
            return await _loyalsBusinessService.GetPartnerUserForTheUser(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task AddPartnerUserForTheCurrentUser(int partnerId)
        {
            await _loyalsBusinessService.AddPartnerUserForTheCurrentUser(partnerId);
        }

    }
}
