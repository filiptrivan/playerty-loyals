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
        public async Task<UserExtendedDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerUserDTO> GetCurrentPartnerUser()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerUserDTO();
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
            await _loyalsBusinessService.DeleteUserExtendedAsync(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<UserExtendedDTO> GetUser(long id)
        {
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(id);
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

        // joca puskom uzima podatke -> Za ovo ti ne treba endpoint!!!
        //[HttpGet]
        //[AuthGuard]
        //public async Task<QrCodeDTO> GetRetailQrCodeData()
        //{
        //    // 
        //}

        // na ng on init generisanje qr koda, qr kod mora da bude enkriptovan, kako korisnik sa fronta ne bi mogao sam da ubaci sta zeli, sifra za enkripciju treba da bude na nivou firme (stridon, uradimo sami itd...)
        //[HttpGet]
        //[AuthGuard]
        //public async Task<QrCodeDTO> GetQrCodeDataForTheCurrentUser()
        //{
        //    return await _loyalsBusinessService.GetQrCodeDataForTheCurrentUser();
        //}

        [HttpGet]
        [AuthGuard]
        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentUserPermissionCodes();
        }

    }
}
