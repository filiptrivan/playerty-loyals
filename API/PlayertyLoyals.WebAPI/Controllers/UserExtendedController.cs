using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.Interfaces;
using Azure.Storage.Blobs;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.DTO;
using Spider.Security.Services;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserExtendedController : UserExtendedBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly AuthenticationService _authenticationService;

        public UserExtendedController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, BlobContainerClient blobContainerClient, AuthenticationService authenticationService)
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUserExtended()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetGenderDropdownList()
        {
            return await _loyalsBusinessService.GetGenderDropdownList(_context.DbSet<Gender>(), false);
        }
    }
}
