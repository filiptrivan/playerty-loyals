using Microsoft.AspNetCore.Mvc;
using Spider.Security.Interface;
using Spider.Security.Services;
using Spider.Infrastructure;
using Spider.Security.SecurityControllers;
using Spider.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.DTO;
using PlayertyLoyals.Business.Enums;
using Spider.Shared.Helpers;
using Spider.Shared.Extensions;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerUserController : SpiderBaseController
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
        public async Task<TableResponseDTO<PartnerUserDTO>> GetPartnerUserTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerUserTableData(tableFilterDTO, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerUserTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerUserTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
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
        public async Task<PartnerUserSaveBodyDTO> SavePartnerUser(PartnerUserSaveBodyDTO saveBodyDTO)
        {
            return await _loyalsBusinessService.SavePartnerUserAndReturnSaveBodyDTOAsync(saveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetPartnerUserListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.GetPartnerUserListForAutocomplete(limit, query, _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetPartnerUserListForDropdown()
        {
            return await _loyalsBusinessService.GetPartnerUserListForDropdown(_context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetPartnerRoleNamebookListForPartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetPartnerRolesNamebookListForPartnerUser(partnerUserId, false);
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

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<TransactionDTO>> GetTransactionListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetTransactionListForTheCurrentPartnerUser(tableFilterDTO);
        }

    }
}
