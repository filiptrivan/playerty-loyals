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
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public AuthController(ILogger<AuthController> logger, SecurityBusinessService securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService)
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
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

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadNotificationListForTheCurrentUser()
        {
            return await _loyalsBusinessService.LoadNotificationListForTheCurrentUser();
        }

        // joca puskom uzima podatke -> Za ovo ti ne treba endpoint!!!
        //[HttpGet]
        //[AuthGuard]
        //public async Task<QrCodeDTO> GetRetailQrCodeData()
        //{
        //    // 
        //}

        // na ng on init generisanje qr koda, qr kod mora da bude enkriptovan, kako korisnik sa fronta ne bi mogao sam da ubaci sta zeli, sifra za enkripciju treba da bude na nivou firme (stridon, uradimo sami itd...)
        [HttpGet]
        [AuthGuard]
        public async Task<QrCodeDTO> GetQrCodeDataForTheCurrentUser()
        {
            return await _loyalsBusinessService.GetQrCodeDataForTheCurrentUser();
        }

    }
}
