using Microsoft.AspNetCore.Mvc;
using Spiderly.Security.Interfaces;
using Spiderly.Security.Services;
using Spiderly.Security.SecurityControllers;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Attributes;
using Spiderly.Security.DTO;
using Spiderly.Shared.Extensions;
using Spiderly.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SecurityController : SecurityBaseController<UserExtended>
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly IApplicationDbContext _context;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public SecurityController(
            ILogger<SecurityController> logger, 
            SecurityBusinessService<UserExtended> securityBusinessService, 
            IJwtAuthManager jwtAuthManagerService, 
            IApplicationDbContext context, 
            AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, 
            PartnerUserAuthenticationService partnerUserAuthenticationService,
            AuthorizationService authorizationService
        ) 
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService, authorizationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        [UIDoNotGenerate]
        public override async Task<AuthResultDTO> Register(VerificationTokenRequestDTO request)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.Register(request);
                await _loyalsBusinessService.OnAfterRegister(authResultDTO);
                return authResultDTO;
            });
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary
        [HttpPost]
        [UIDoNotGenerate]
        public override async Task<AuthResultDTO> Login(VerificationTokenRequestDTO request)
        {
            AuthResultDTO authResultDTO = _securityBusinessService.Login(request);
            await _loyalsBusinessService.OnAfterLogin(authResultDTO);
            return authResultDTO;
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        [UIDoNotGenerate]
        public override async Task<AuthResultDTO> LoginExternal(ExternalProviderDTO externalProviderDTO) // TODO FT: Add enum for which external provider you should login user
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.LoginExternal(externalProviderDTO, SettingsProvider.Current.GoogleClientId);
                await _loyalsBusinessService.OnAfterLoginExternal(authResultDTO);
                return authResultDTO;
            });
        }

        [HttpGet]
        [AuthGuard]
        [UIDoNotGenerate]
        public override async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentPartnerUserPermissionCodes();
        }

    }
}
