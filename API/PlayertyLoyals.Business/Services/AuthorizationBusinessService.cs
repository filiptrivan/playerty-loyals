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

        public override async Task AuthorizeUserExtendedReadAndThrow(long? userExtendedId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool hasAdminReadPermission = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadUserExtended);
                bool isCurrentUser = _authenticationService.GetCurrentUserId() == userExtendedId;

                if (isCurrentUser == false && hasAdminReadPermission == false)
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

        #endregion

        #region Partner

        public override async Task AuthorizePartnerReadAndThrow(int? partnerId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadPartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForPartnerAsync(BusinessPermissionCodes.ReadCurrentPartner, partnerId.Value);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        public override async Task AuthorizePartnerUpdateAndThrow(PartnerDTO partnerDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdatePartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForPartnerAsync(BusinessPermissionCodes.UpdateCurrentPartner, partnerDTO.Id);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        private async Task<bool> IsPartnerUserAuthorizedForPartnerAsync(string permissionCode, int partnerId)
        {
            if (permissionCode == null)
                throw new ArgumentNullException("Permission code is not provided.");

            bool result = false;

            long currentUserId = _authenticationService.GetCurrentUserId();

            await _context.WithTransactionAsync(async () =>
            {
                result = await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .AnyAsync(pu =>
                        pu.User.Id == currentUserId &&
                        pu.Partner.Id == partnerId &&
                        pu.PartnerRoles.Any(r => r.PartnerPermissions.Any(p => p.Code == permissionCode))
                    );
            });

            return result;
        }

        #endregion

        #region Notification

        // FT: No need for overriding anything, for administration, everything is covered with the generated code, while for displaying and managing notifications of the current user, we rely on the id we have on the backend.

        #endregion

        #region PartnerUser

        public override async Task AuthorizePartnerUserReadAndThrow(long? partnerUserId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.ReadPartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForCurrentPartnerAsync(BusinessPermissionCodes.ReadPartnerUser);

                bool isCurrentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUserId() == partnerUserId;

                if (isCurrentPartnerUser == false && isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        public override async Task AuthorizePartnerUserReadAndThrow(List<long> partnerUserIds)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadPartnerUser);
        }

        public override async Task AuthorizePartnerUserUpdateAndThrow(PartnerUserDTO partnerUserDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdatePartner);
                if (isUserAuthorized)
                    return;

                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForCurrentPartnerAsync(BusinessPermissionCodes.UpdatePartnerUser);
                if (isPartnerUserAuthorized)
                    return;

                PartnerUser partnerUser = await GetInstanceAsync<PartnerUser, long>(partnerUserDTO.Id, null);

                if (partnerUser.Points != partnerUserDTO.Points)
                    throw new UnauthorizedException();

                bool isCurrentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUserId() == partnerUser.Id;

                if (isCurrentPartnerUser)
                    return;

                throw new UnauthorizedException();
            });
        }

        /// <summary>
        /// Didn't use AuthorizePartnerEntityWithoutSpecificCurrentUserLogic method because in the future partner user could delete his partner profile
        /// </summary>
        public override async Task AuthorizePartnerUserDeleteAndThrow(long partnerUserId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(BusinessPermissionCodes.UpdatePartner);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForCurrentPartnerAsync(BusinessPermissionCodes.DeletePartnerUser);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        #endregion

        #region PartnerRole

        public override async Task AuthorizePartnerRoleReadAndThrow(List<int> partnerRoleIds)
        {
            await AuthorizePartnerRoleReadAndThrow();
        }

        public override async Task AuthorizePartnerRoleReadAndThrow(int? partnerRoleId)
        {
            await AuthorizePartnerRoleReadAndThrow();
        }

        private async Task AuthorizePartnerRoleReadAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadPartnerRole);
        }

        public override async Task AuthorizePartnerRoleUpdateAndThrow(PartnerRoleDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.UpdatePartnerRole);
        }

        public override async Task AuthorizePartnerRoleInsertAndThrow(PartnerRoleDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.InsertPartnerRole);
        }

        public override async Task AuthorizePartnerRoleDeleteAndThrow(int partnerRoleId)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeletePartnerRole);
        }

        public override async Task AuthorizePartnerRoleDeleteAndThrow(List<int> partnerRoleListToDelete)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeletePartnerRole);
        }

        #endregion

        #region PartnerNotification

        public override async Task AuthorizePartnerNotificationReadAndThrow(List<long> partnerNotificationIds)
        {
            await AuthorizePartnerNotificationReadAndThrow();
        }

        public override async Task AuthorizePartnerNotificationReadAndThrow(long? partnerNotificationId)
        {
            await AuthorizePartnerNotificationReadAndThrow();
        }

        private async Task AuthorizePartnerNotificationReadAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadPartnerNotification);
        }

        public override async Task AuthorizePartnerNotificationUpdateAndThrow(PartnerNotificationDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.UpdatePartnerNotification);
        }

        public override async Task AuthorizePartnerNotificationInsertAndThrow(PartnerNotificationDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.InsertPartnerNotification);
        }

        public override async Task AuthorizePartnerNotificationDeleteAndThrow(long partnerNotificationId)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeletePartnerNotification);
        }

        public override async Task AuthorizePartnerNotificationDeleteAndThrow(List<long> partnerNotificationListToDelete)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeletePartnerNotification);
        }

        #endregion

        #region Segmentation

        public override async Task AuthorizeSegmentationReadAndThrow(List<int> segmentationIds)
        {
            await AuthorizeSegmentationReadAndThrow();
        }

        public override async Task AuthorizeSegmentationReadAndThrow(int? segmentationId)
        {
            await AuthorizeSegmentationReadAndThrow();
        }

        private async Task AuthorizeSegmentationReadAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadSegmentation);
        }

        public override async Task AuthorizeSegmentationUpdateAndThrow(SegmentationDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.UpdateSegmentation);
        }

        public override async Task AuthorizeSegmentationInsertAndThrow(SegmentationDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.InsertSegmentation);
        }

        public override async Task AuthorizeSegmentationDeleteAndThrow(int segmentationId)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeleteSegmentation);
        }

        public override async Task AuthorizeSegmentationDeleteAndThrow(List<int> segmentationListToDelete)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeleteSegmentation);
        }

        #endregion

        #region BusinessSystem
        
        public override async Task AuthorizeBusinessSystemReadAndThrow(List<long> businessSystemIds)
        {
            await AuthorizeBusinessSystemReadAndThrow();
        }

        public override async Task AuthorizeBusinessSystemReadAndThrow(long? businessSystemId)
        {
            await AuthorizeBusinessSystemReadAndThrow();
        }

        private async Task AuthorizeBusinessSystemReadAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadBusinessSystem);
        }

        public override async Task AuthorizeBusinessSystemUpdateAndThrow(BusinessSystemDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.UpdateBusinessSystem);
        }

        public override async Task AuthorizeBusinessSystemInsertAndThrow(BusinessSystemDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.InsertBusinessSystem);
        }

        public override async Task AuthorizeBusinessSystemDeleteAndThrow(long businessSystemId)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeleteBusinessSystem);
        }

        public override async Task AuthorizeBusinessSystemDeleteAndThrow(List<long> businessSystemListToDelete)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeleteBusinessSystem);
        }

        #endregion

        #region Tier

        public override async Task AuthorizeTierReadAndThrow(List<int> tierIds)
        {
            await AuthorizeTierReadAndThrow();
        }

        public override async Task AuthorizeTierReadAndThrow(int? tierId)
        {
            await AuthorizeTierReadAndThrow();
        }

        public override async Task AuthorizeBusinessSystemTierReadAndThrow(long? businessSystemTier)
        {
            await AuthorizeTierReadAndThrow();
        }

        public async Task AuthorizeTierReadAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.ReadPartner, BusinessPermissionCodes.ReadTier);
        }

        public override async Task AuthorizeTierUpdateAndThrow(TierDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.UpdateTier);
        }

        public override async Task AuthorizeTierInsertAndThrow(TierDTO dto)
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.InsertTier);
        }

        public override async Task AuthorizeTierDeleteAndThrow(int tierId)
        {
            await AuthorizeTierDeleteAndThrow();
        }

        public override async Task AuthorizeTierDeleteAndThrow(List<int> tierListToDelete)
        {
            await AuthorizeTierDeleteAndThrow();
        }

        public async Task AuthorizeTierDeleteAndThrow()
        {
            await AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(BusinessPermissionCodes.UpdatePartner, BusinessPermissionCodes.DeleteTier);
        }

        #endregion

        #region Helpers

        public async Task AuthorizePartnerEntityWithoutSpecificCurrentUserLogic(string userPermissionCode, string partnerUserPermissionCode)
        {
            await _context.WithTransactionAsync(async () =>
            {
                bool isUserAuthorized = await IsAuthorizedAsync<UserExtended>(userPermissionCode);
                bool isPartnerUserAuthorized = await IsPartnerUserAuthorizedForCurrentPartnerAsync(partnerUserPermissionCode);

                if (isPartnerUserAuthorized == false && isUserAuthorized == false)
                    throw new UnauthorizedException();
            });
        }

        public async Task<bool> IsPartnerUserAuthorizedForCurrentPartnerAsync(string permissionCode)
        {
            if (permissionCode == null)
                throw new ArgumentNullException("Permission code is not provided.");

            bool result = false;

            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerCode = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                result = await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .AnyAsync(pu =>
                        pu.User.Id == currentUserId &&
                        pu.Partner.Slug == currentPartnerCode &&
                        pu.PartnerRoles.Any(r => r.PartnerPermissions.Any(p => p.Code == permissionCode))
                    );
            });

            return result;
        }

        //public async Task<bool> IsPartnerUserAuthorizedForPartnerAsync(string permissionCode, List<int> partnerIds)
        //{
        //    if (permissionCode == null)
        //        throw new ArgumentNullException("Permission code is not provided.");

        //    if (partnerIds.Count == 0)
        //        return false;

        //    if (partnerIds.Count != partnerIds.Distinct().Count())
        //        return false;

        //    int partnerId = partnerIds.FirstOrDefault();

        //    return await IsPartnerUserAuthorizedForPartnerAsync(permissionCode, partnerId);
        //}

        #endregion

    }
}
