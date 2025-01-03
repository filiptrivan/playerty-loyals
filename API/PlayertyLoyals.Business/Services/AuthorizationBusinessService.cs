using Azure.Storage.Blobs;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Interfaces;

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



        //public override async Task UserExtendedSingleReadAuthorize(long userExtendedId)
        //{
        //    await _context.WithTransactionAsync(async () =>
        //    {
        //        bool hasAdminReadPermission = await IsAuthorizedAsync<UserExtended>(PermissionCodes.ReadUserExtended);

        //        if (_authenticationService.GetCurrentUserId() != userExtendedId && hasAdminReadPermission == false)
        //            throw new UnauthorizedException();
        //    });
        //}

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
