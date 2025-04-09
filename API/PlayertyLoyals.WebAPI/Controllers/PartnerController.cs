using Microsoft.AspNetCore.Mvc;
using Spider.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.DTO;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerController : PartnerBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public PartnerController(
            IApplicationDbContext context,
            LoyalsBusinessService loyalsBusinessService,
            PartnerUserAuthenticationService partnerUserAuthenticationService
        )
            : base(context, loyalsBusinessService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpGet]
        //[AuthGuard] // FT: We should show login page of the partner to the user which is not logged in also.
        public async Task<PartnerDTO> GetCurrentPartner()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<CodebookDTO>> GetPartnerWithSlugAutocompleteList(int limit, string filter)
        {
            return await _loyalsBusinessService.GetPartnerWithSlugAutocompleteList(limit, filter, _context.DbSet<Partner>());
        }

        [HttpGet]
        [AuthGuard]
        public override async Task<List<PartnerDTO>> GetPartnerList()
        {
            return await _loyalsBusinessService.GetPartnerDTOList(_context.DbSet<Partner>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<int>> GetPartnerIdsForTheCurrentUser()
        {
            return await _loyalsBusinessService.GetPartnerIdsForTheCurrentUser();
        }

    }
}
