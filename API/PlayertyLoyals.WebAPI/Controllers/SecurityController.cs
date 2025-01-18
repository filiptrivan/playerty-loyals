using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Security.SecurityControllers;
using Soft.Generator.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Soft.Generator.Shared.DTO;
using Microsoft.EntityFrameworkCore;
using Soft.Generator.Shared.Terms;
using Soft.Generator.Security.DTO;
using Soft.Generator.Shared.Extensions;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SecurityController : SecurityBaseController<UserExtended>
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public SecurityController(ILogger<SecurityController> logger, SecurityBusinessService<UserExtended> securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
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

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        public async Task<AuthResultDTO> Register(VerificationTokenRequestDTO request)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.Register(request);
                await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
                return authResultDTO;
            });
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary
        [HttpPost]
        public async Task<AuthResultDTO> Login(VerificationTokenRequestDTO request)
        {
            AuthResultDTO authResultDTO = _securityBusinessService.Login(request);
            await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
            return authResultDTO;
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        public async Task<AuthResultDTO> LoginExternal(ExternalProviderDTO externalProviderDTO) // TODO FT: Add enum for which external provider you should login user
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.LoginExternal(externalProviderDTO, SettingsProvider.Current.GoogleClientId);
                await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
                return authResultDTO;
            });
        }

    }
}
