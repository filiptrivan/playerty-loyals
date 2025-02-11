using Azure.Storage.Blobs;
using Spider.Security.Services;
using Spider.Shared.Interfaces;
using Spider.Shared.Extensions;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Enums;
using Spider.Shared.Exceptions;

namespace PlayertyLoyals.Business.Services
{
    public class AuthorizationBusinessService : AuthorizationBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;

        public AuthorizationBusinessService(IApplicationDbContext context, AuthenticationService authenticationService, BlobContainerClient blobContainerClient)
            : base(context, authenticationService, blobContainerClient)
        {
            _context = context;
            _authenticationService = authenticationService;
        }

        public override async Task AuthorizeUserExtendedReadAndThrow(long userExtendedId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool hasAdminReadPermission = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadUserExtended);

                if (_authenticationService.GetCurrentUserId() != userExtendedId && hasAdminReadPermission == false)
                    throw new UnauthorizedException();
            });
        }

        ///// <summary>
        ///// Not implemented on the UI yet, so the user can delete his own account. Maybe add that in the settings.
        ///// </summary>
        //public override async Task UserExtendedDeleteAuthorize(long userExtendedId)
        //{
        //    await _context.WithTransactionAsync(async () =>
        //    {
        //        bool hasAdminReadPermission = await IsAuthorizedAsync<UserExtended>(PermissionCodes.ReadUserExtended);

        //        if (_authenticationService.GetCurrentUserId() != userExtendedId && hasAdminReadPermission == false)
        //            throw new UnauthorizedException();
        //    });
        //}

    }
}
