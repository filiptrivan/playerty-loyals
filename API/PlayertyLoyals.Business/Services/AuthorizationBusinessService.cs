using Azure.Storage.Blobs;
using Spider.Security.Services;
using Spider.Shared.Interfaces;
using Spider.Shared.Extensions;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Enums;
using Spider.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.Helpers;

namespace PlayertyLoyals.Business.Services
{
    public class AuthorizationBusinessService : AuthorizationBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public AuthorizationBusinessService(
            IApplicationDbContext context,
            AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService,
            BlobContainerClient blobContainerClient
        )
            : base(context, authenticationService, blobContainerClient)
        {
            _context = context;
            _authenticationService = authenticationService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        #region UserExtended

        public override async Task AuthorizeUserExtendedReadAndThrow(long userExtendedId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool hasAdminReadPermission = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadUserExtended);

                if (_authenticationService.GetCurrentUserId() != userExtendedId && hasAdminReadPermission == false)
                    throw new UnauthorizedException();
            });
        }

        public override async Task AuthorizeUserExtendedUpdateAndThrow(UserExtendedDTO userExtendedDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool hasAdminUpdatePermission = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdateUserExtended);
                if (hasAdminUpdatePermission)
                    return;

                long currentUserId = _authenticationService.GetCurrentUserId();
                if (currentUserId != userExtendedDTO.Id)
                    throw new UnauthorizedException();

                UserExtended userExtended = await GetInstanceAsync<UserExtended, long>(userExtendedDTO.Id, null);

                if (
                    userExtendedDTO.IsDisabled != userExtended.IsDisabled ||
                    userExtendedDTO.HasLoggedInWithExternalProvider != userExtended.HasLoggedInWithExternalProvider
                )
                {
                    throw new UnauthorizedException();
                }
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

        #endregion

        #region Partner

        public override async Task AuthorizePartnerReadAndThrow(int partnerId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadPartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedAsync(BusinessPermissionCodes.ReadPartner);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        public override async Task AuthorizePartnerUpdateAndThrow(PartnerDTO partnerDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdatePartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedAsync(BusinessPermissionCodes.UpdatePartner);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        #endregion

        #region PartnerUser

        public override async Task AuthorizePartnerUserReadAndThrow(long partnerUserId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadPartnerUser);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedAsync(BusinessPermissionCodes.ReadPartnerUser);
                bool isCurrentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUserId() == partnerUserId;

                if (isCurrentPartnerUser == false && isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        public override async Task AuthorizePartnerUserUpdateAndThrow(PartnerUserDTO partnerUserDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                PartnerUser partnerUser = await GetInstanceAsync<PartnerUser, long>(partnerUserDTO.Id, null);

                // FT: Noone can change these from the partner user page
                // TODO FT: Transfer this to on before save (or generate it, but inside save body dto method, not save dto)
                if (partnerUser.Tier.Id != partnerUserDTO.TierId ||
                    partnerUser.User.Id != partnerUserDTO.UserId ||
                    partnerUser.Partner.Id != partnerUserDTO.PartnerId
                )
                {
                    throw new UnauthorizedException();
                }

                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdatePartnerUser);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedAsync(BusinessPermissionCodes.UpdatePartnerUser);

                if (isPartnerUserAuthorized == false &&
                    isUserAuthorized == false &&
                    partnerUser.Points != partnerUserDTO.Points
                )
                {
                    throw new UnauthorizedException();
                }

                bool isCurrentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUserId() == partnerUser.Id;

                if (isCurrentPartnerUser == false && isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        #endregion

        #region PartnerRole

        #endregion

        #region PartnerNotification

        #endregion

        #region Segmentation

        #endregion

        #region BusinessSystem

        #endregion

        #region Tier

        #endregion

        #region Helpers

        public async Task<bool> IsPartnerUserAuthorizedAsync(string permissionCode)
        {
            if (permissionCode == null)
                throw new ArgumentNullException("Permission code is not provided.");

            bool result = false;

            await _context.WithTransactionAsync(async () =>
            {
                long partnerUserId = await _partnerUserAuthenticationService.GetCurrentPartnerUserId();

                result = await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .AnyAsync(pu =>
                        pu.Id == partnerUserId &&
                        pu.PartnerRoles.Any(r => r.PartnerPermissions.Any(p => p.Code == permissionCode))
                    );
            });

            return result;
        }

        #endregion

    }
}
