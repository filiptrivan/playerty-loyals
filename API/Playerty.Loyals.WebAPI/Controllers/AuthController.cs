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
using Soft.NgTable.Models;
using Soft.Generator.Shared.DTO;
using Playerty.Loyals.Business.Enums;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Security.Entities;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AuthController : BaseSecurityController<UserExtended>
    {
        private readonly ILogger<AuthController> _logger;
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public AuthController(ILogger<AuthController> logger, SecurityBusinessService securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<BaseTableResponseEntity<UserExtendedDTO>> LoadUserListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadUserExtendedListForTable(dto, _context.DbSet<UserExtended>());
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportUserListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportUserExtendedListToExcel(dto, _context.DbSet<UserExtended>());
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Users.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteUser(long id)
        {
            await _loyalsBusinessService.DeleteUserExtendedAsync(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<UserExtendedDTO> GetUser(long id)
        {
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerUserDTO> GetPartnerUserForTheUser(long id)
        {
            return await _loyalsBusinessService.GetPartnerUserForTheUser(id);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<UserExtendedDTO> SaveUserExtended(UserExtendedSaveBodyDTO dto)
        {
            return await _loyalsBusinessService.SaveUserExtendedAndReturnDTOExtendedAsync(dto);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.LoadUserExtendedListForAutocomplete(limit, query, _context.DbSet<UserExtended>());
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserListForDropdown()
        {
            return await _loyalsBusinessService.LoadUserExtendedListForDropdown(_context.DbSet<UserExtended>());
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentUserPermissionCodes();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadGenderNamebookListForDropdown()
        {
            return await _loyalsBusinessService.LoadGenderListForDropdown(_context.DbSet<Gender>(), false);
        }

    }
}
