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

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AuthController : BaseSecurityController<UserExtended>
    {
        private readonly ILogger<AuthController> _logger;
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly SecurityBusinessServiceGenerated _securityBusinessServiceGenerated;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public AuthController(ILogger<AuthController> logger, SecurityBusinessService securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService, 
            SecurityBusinessServiceGenerated securityBusinessServiceGenerated, LoyalsBusinessService loyalsBusinessService)
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService, securityBusinessServiceGenerated)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _securityBusinessServiceGenerated = securityBusinessServiceGenerated;
            _loyalsBusinessService = loyalsBusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task<UserExtendedDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<BaseTableResponseEntity<UserExtendedDTO>> LoadUserListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadUserExtendedListForTable(dto);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportUserListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportUserExtendedListToExcel(dto);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Users.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteUser(long id)
        {
            await _loyalsBusinessService.DeleteEntity<UserExtended, long>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<UserExtendedDTO> GetUser(long id)
        {
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(id);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<UserExtendedDTO> SaveUserExtended(UserExtendedDTO dto)
        {
            return await _loyalsBusinessService.SaveUserExtendedAndReturnDTOAsync(dto);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadRoleListForUser(long userId)
        {
            return await _loyalsBusinessService.LoadRoleListForUserExtended(userId);
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
        public async Task<List<NamebookDTO<long>>> LoadUserListForRole(int roleId)
        {
            return await _loyalsBusinessService.LoadUserExtendedListForRole(roleId);
        }

    }
}
