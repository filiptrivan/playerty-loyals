using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Security.Entities;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.Services;
using Playerty.Loyals.Enums;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Enums;
using Soft.Generator.Shared.SoftExceptions;
using Mapster;
using Soft.Generator.Security.DTO;
using Playerty.Loyals.Business.DataMappers;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Soft.Generator.Shared.Emailing;
using Azure.Storage.Blobs;

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthorizationService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly EmailingService _emailingService;
        private readonly BlobContainerClient _blobContainerClient;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, AuthorizationService authorizationService, SecurityBusinessService securityBusinessService, AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService, EmailingService emailingService, BlobContainerClient blobContainerClient)
            : base(context, excelService, authorizationService, blobContainerClient)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _emailingService = emailingService;
            _blobContainerClient = blobContainerClient;
        }

        #region User

        public async Task DeletePartnerAsync(int partnerId, bool authorize = true)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.DeletePartner);
                }

                await OnBeforePartnerAsyncDelete(partnerId);

                List<long> partnerUsersToDelete = _context.DbSet<PartnerUser>().Where(x => x.Partner.Id == partnerId);
                IQueryable<TransactionStatus> transactionStatusQuery = _context.DbSet<TransactionStatus>().Where(x => x.PartnerUser.)

                await _context.DbSet<PartnerUser>().Where(x => x.Partner.Id == partnerId).ExecuteDeleteAsync();

                await DeleteEntityAsync<Partner, int>(partnerId);
            });
        }

        public async Task<UserExtendedDTO> SaveUserExtendedAndReturnDTOExtendedAsync(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Password != null)
                    throw new HackerException("You can not change password from here.");

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id == 0)
                    throw new HackerException("You can add new user.");

                UserExtended user = await LoadInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != user.Email)
                    throw new HackerException("You can not change email from here.");

                if (userExtendedSaveBodyDTO.SelectedRoleIds != null)
                    await _securityBusinessService.UpdateRoleListForUser<UserExtended>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRoleIds);

                userExtendedSaveBodyDTO.UserExtendedDTO.Password = user.Password;
                return await SaveUserExtendedAndReturnDTOAsync(userExtendedSaveBodyDTO.UserExtendedDTO, false, false); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI
            });
        }

        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                UserExtended currentUser = await _authenticationService.GetCurrentUser<UserExtended>();

                if (currentUser == null)
                    return new List<string>();

                return currentUser.Roles
                    .SelectMany(x => x.Permissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToList();
            });
        }

        #endregion

        #region Notification

        public async Task<NotificationDTO> SaveNotificationAndReturnDTOExtendedAsync(NotificationSaveBodyDTO notificationSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                NotificationDTO savedNotificationDTO = await SaveNotificationAndReturnDTOAsync(notificationSaveBodyDTO.NotificationDTO, false, false);

                PaginationResult<UserExtended> paginationResult = await LoadUserExtendedListForPagination(notificationSaveBodyDTO.TableFilter, _context.DbSet<UserExtended>());

                await UpdateUserExtendedListForNotificationTableSelection(paginationResult.Query, savedNotificationDTO.Id, notificationSaveBodyDTO);

                return savedNotificationDTO;
            });
        }

        // FT: Add this to the generator
        public async Task<TableResponseDTO<UserExtendedDTO>> LoadUserForNotificationListForTable(TableFilterDTO tableFilterPayload)
        {
            TableResponseDTO<UserExtendedDTO> tableResponse = new TableResponseDTO<UserExtendedDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                IQueryable<UserExtended> query = _context.DbSet<UserExtended>().Skip(tableFilterPayload.First).Take(tableFilterPayload.Rows).Where(x => x.Notifications.Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)); // notificationId
                PaginationResult<UserExtended> paginationResult = await LoadUserExtendedListForPagination(tableFilterPayload, query);

                tableResponse.Data = await paginationResult.Query
                    .ProjectToType<UserExtendedDTO>(Mapper.UserExtendedProjectToConfig())
                    .ToListAsync();

                int count = await _context.DbSet<UserExtended>().Where(x => x.Notifications.Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)).CountAsync();

                tableResponse.TotalRecords = count;
            });

            return tableResponse;
        }

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                Notification notification = await LoadInstanceAsync<Notification, long>(notificationId, notificationVersion); // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users

                List<string> recipients = notification.Users.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        #endregion

        #region Tier

        public async Task<List<TierDTO>> SaveTierList(List<TierDTO> tierListDTO)
        {
            List<int> exceptionHelper = new List<int>();

            for (int i = 0; i < tierListDTO.Count; i++)
            {
                if (tierListDTO[i].ValidTo <= tierListDTO[i].ValidFrom)
                {
                    exceptionHelper.Add(i+1);
                }

                if (i < tierListDTO.Count - 1)
                {
                    if (tierListDTO[i].ValidTo != tierListDTO[i + 1].ValidFrom)
                    {
                        exceptionHelper.Add(i+2); // FT: If he provided 0 - 10 and 12 - 20, the second is invalid.
                        i++; // FT: Skip the next one so we don't need to do distinct.
                    }
                }
            }

            if (exceptionHelper.Count > 0)
            {
                string helper = exceptionHelper.Count == 1 ? "tier" : "tiers";
                throw new BusinessException($"Invalid {helper}: {exceptionHelper.ToCommaSeparatedString()}. Tiers must be saved sequentialy (Eg. Tier 1: 1p - 10p, Tier 2: 10p - 20p, Tier 3: 20p - 30p). You can not add tier which upper bound is greater (or equal) than lower bound. ");
            }

            List<TierDTO> result = new List<TierDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                List<int> tierIdsDTO = tierListDTO.Select(x => x.Id).ToList();

                IQueryable<Tier> tiersForDeleteQuery = _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode() && tierIdsDTO.Contains(x.Id) == false);

                await DeleteTiers(tiersForDeleteQuery);

                foreach (TierDTO tierDTO in tierListDTO)
                {
                    tierDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                    result.Add(await SaveTierAndReturnDTOAsync(tierDTO, false, false));
                }

                await UpdatePartnerUsersTiers();
            });

            return result;
        }

        private async Task DeleteTiers(IQueryable<Tier> tiersForDeleteQuery)
        {
            await _context.WithTransactionAsync(async () =>
            {
                //await SetEveryUsersTierToNullForTheProvidedTiers(await tiersForDeleteQuery.Select(x => x.Id).ToListAsync()); // FT: SET NULL is doing this now.

                // FT: Can't use execute delete because of disabled changes tracker, we need to know which tiers are deleted so we can update partner users.
                _context.DbSet<Tier>().RemoveRange(await tiersForDeleteQuery.ToListAsync());

                await _context.SaveChangesAsync();
            });
        }

        public async Task UpdatePartnerUsersTiers()
        {
            await _context.WithTransactionAsync(async () =>
            {
                List<PartnerUser> partnerUsers = await _context.DbSet<PartnerUser>().ToListAsync();

                foreach (PartnerUser partnerUser in partnerUsers)
                {
                    int points = partnerUser.Points;
                    Tier tier = await GetTierForThePoints(points);
                    partnerUser.Tier = tier;
                }

                await _context.SaveChangesAsync();
            });
        }

        public async Task UpdatePartnerUserTier(PartnerUser partnerUser)
        {
            await _context.WithTransactionAsync(async () =>
            {
                int points = partnerUser.Points;
                Tier tier = await GetTierForThePoints(points);
                partnerUser.Tier = tier;

                await _context.SaveChangesAsync();
            });
        }

        public async Task<Tier> GetTierForThePoints(int points)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                Tier greatestTier = await GetTheGreatestTier();
                if (greatestTier == null)
                {
                    return null;
                }
                else if (greatestTier.ValidTo <= points)
                {
                    return greatestTier;
                }
                else
                {
                    Tier tier = await _context.DbSet<Tier>().Where(x => points >= x.ValidFrom && points < x.ValidTo).SingleOrDefaultAsync();
                    return tier;
                }
            });
        }

        public async Task<Tier> GetTheGreatestTier()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Tier>().OrderByDescending(x => x.ValidTo).FirstOrDefaultAsync();
            });
        }

        public async Task<TierDTO> GetTierDTOForTheCurrentPartnerUser()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                PartnerUser partnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUser();

                if (partnerUser == null)
                    return null;

                Tier tier = await GetTierForThePoints(partnerUser.Points);

                return tier.Adapt<TierDTO>(Mapper.TierToDTOConfig());
            });
        }

        #endregion

        #region Partner
        public async Task<List<CodebookDTO>> LoadPartnerWithSlugListForAutocomplete(int limit, string query, IQueryable<Partner> partnerQuery, bool authorize = true)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartner);
                }

                if (!string.IsNullOrEmpty(query))
                    partnerQuery = partnerQuery.Where(x => x.Name.Contains(query));

                return await partnerQuery
                    .Take(limit)
                    .Select(x => new CodebookDTO
                    {
                        Code = x.Slug,
                        DisplayName = x.Name,
                    })
                    .ToListAsync();
            });
        }

        #endregion

        #region PartnerUser

        public async Task<PartnerUserDTO> GetPartnerUserForTheUser(long userId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                //if (authorize)
                //{
                //    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartnerUser);
                //}
                return await _context.DbSet<PartnerUser>().AsNoTracking()
                    .Where(x => x.User.Id == userId && x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig())
                    .SingleOrDefaultAsync();
            });
        }

        //public async Task DeletePartnerUserAsync(long userId)
        //{
        //    await _context.WithTransactionAsync(async () =>
        //    {
        //        await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(Business.Enums.PermissionCodes.DeletePartnerUser);
        //        await DeleteEntityAsync<PartnerUser, long>(userId);
        //    });
        //}

        public async Task<PartnerUserSaveBodyDTO> SavePartnerUserAndReturnDTOExtendedAsync(PartnerUserSaveBodyDTO partnerUserSaveBodyDTO)
        {
            UserExtendedSaveBodyDTO userExtendedSaveBodyDTO = new UserExtendedSaveBodyDTO
            {
                UserExtendedDTO = partnerUserSaveBodyDTO.UserExtendedDTO,
                SelectedRoleIds = partnerUserSaveBodyDTO.SelectedRoleIds,
            };

            return await _context.WithTransactionAsync(async () =>
            {
                UserExtendedDTO savedUserExtendedDTO = await SaveUserExtendedAndReturnDTOExtendedAsync(userExtendedSaveBodyDTO);

                if (partnerUserSaveBodyDTO.PartnerUserDTO.Id == 0)
                    throw new HackerException("You can't add new partner user.");

                await UpdatePartnerRoleListForPartnerUser(partnerUserSaveBodyDTO.PartnerUserDTO.Id, partnerUserSaveBodyDTO.SelectedPartnerRoleIds);

                await UpdateSegmentationItemListForPartnerUser(partnerUserSaveBodyDTO.PartnerUserDTO.Id, partnerUserSaveBodyDTO.SelectedSegmentationItemIds);

                int pointsBeforeSave = await GetPointsForThePartnerUser(partnerUserSaveBodyDTO.PartnerUserDTO.Id);

                PartnerUser savedPartnerUser = await SavePartnerUserAndReturnDomainAsync(partnerUserSaveBodyDTO.PartnerUserDTO, false, false); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI

                await UpdateFirstTimeFilledPointsForThePartnerUser(savedPartnerUser, partnerUserSaveBodyDTO.SelectedSegmentationItemIds);

                if (pointsBeforeSave != savedPartnerUser.Points)
                    await UpdatePartnerUserTier(savedPartnerUser);

                return new PartnerUserSaveBodyDTO
                {
                    UserExtendedDTO = savedUserExtendedDTO,
                    PartnerUserDTO = savedPartnerUser.Adapt<PartnerUserDTO>(Mapper.PartnerUserToDTOConfig()),
                };
            });
        }

        public async Task<int> GetPointsForThePartnerUser(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return _context.DbSet<PartnerUser>().Where(x => x.Id == partnerUserId).Select(x => x.Points).Single();
            });
        }

        private async Task UpdateFirstTimeFilledPointsForThePartnerUser(PartnerUser partnerUser, List<long> segmentationItemIdsToCheck)
        {
            await _context.WithTransactionAsync(async () =>
            {
                List<Segmentation> segmentationsToCheck = await _context.DbSet<Segmentation>().Where(x => x.SegmentationItems.Any(x => segmentationItemIdsToCheck.Contains(x.Id))).ToListAsync();

                foreach (Segmentation segmentation in segmentationsToCheck)
                {
                    if (partnerUser.AlreadyFilledSegmentations.Any(x => x.Id == segmentation.Id) == false)
                    {
                        partnerUser.AlreadyFilledSegmentations.Add(segmentation);
                        partnerUser.Points += segmentation.PointsForTheFirstTimeFill;
                    }
                }

                if(partnerUser.HasFilledGenderForTheFirstTime == false && partnerUser.User.Gender != null)
                {
                    partnerUser.Points += partnerUser.Partner.PointsForTheFirstTimeGenderFill;
                    partnerUser.HasFilledGenderForTheFirstTime = true;
                }

                if (partnerUser.HasFilledBirthDateForTheFirstTime == false && partnerUser.User.BirthDate != null)
                {
                    partnerUser.Points += partnerUser.Partner.PointsForTheFirstTimeBirthDateFill;
                    partnerUser.HasFilledBirthDateForTheFirstTime = true;
                }

                await _context.SaveChangesAsync();
            });
        }

        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                PartnerUser currentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUser();

                if (currentPartnerUser == null)
                    return new List<string>();

                return currentPartnerUser.PartnerRoles
                    .SelectMany(x => x.Permissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToList();
            });
        }

        public async override Task<List<NamebookDTO<long>>> LoadPartnerUserNamebookListForPartnerRole(int partnerRoleId, bool authorize = true)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartnerRole);
                }

                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.PartnerRoles.Any(x => x.Id == partnerRoleId))
                    .Select(x => new NamebookDTO<long>
                    {
                        Id = x.Id,
                        DisplayName = x.User.Email,
                    })
                    .ToListAsync();
            });
        }

        public async override Task<List<NamebookDTO<long>>> LoadPartnerUserNamebookListForPartnerNotification(long partnerNotificationId, bool authorize = true)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartnerNotification);
                }

                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.PartnerNotifications.Any(x => x.Id == partnerNotificationId))
                    .Select(x => new NamebookDTO<long>
                    {
                        Id = x.Id,
                        DisplayName = x.User.Email,
                    })
                    .ToListAsync();
            });
        }

        public async Task<TableResponseDTO<PartnerUserDTO>> LoadPartnerUserForPartnerNotificationListForTable(TableFilterDTO tableFilterPayload)
        {
            TableResponseDTO<PartnerUserDTO> tableResponse = new TableResponseDTO<PartnerUserDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                IQueryable<PartnerUser> query = _context.DbSet<PartnerUser>().Skip(tableFilterPayload.First).Take(tableFilterPayload.Rows).Where(x => x.PartnerNotifications.Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)); // partnerNotificationId
                PaginationResult<PartnerUser> paginationResult = await LoadPartnerUserListForPagination(tableFilterPayload, query);

                tableResponse.Data = await paginationResult.Query
                    .ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig())
                    .ToListAsync();

                int count = await _context.DbSet<PartnerUser>().Where(x => x.PartnerNotifications.Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)).CountAsync();

                tableResponse.TotalRecords = count;
            });

            return tableResponse;
        }

        public async override Task<List<NamebookDTO<long>>> LoadPartnerUserListForAutocomplete(int limit, string query, IQueryable<PartnerUser> partnerUserQuery, bool authorize = true)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartnerUser);
                }

                if (!string.IsNullOrEmpty(query))
                    partnerUserQuery = partnerUserQuery.Where(x => x.Id.ToString().Contains(query));

                return await partnerUserQuery
                    .Take(limit)
                    .Select(x => new NamebookDTO<long>
                    {
                        Id = x.Id,
                        DisplayName = x.User.Email,
                    })
                    .ToListAsync();
            });
        }

        public async Task<List<long>> GetCheckedSegmentationItemIdsForThePartnerUser(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Id == partnerUserId)
                    .SelectMany(x => x.CheckedSegmentationItems)
                    .Select(x => x.Id)
                    .ToListAsync();
            });
        }

        public async Task<List<int>> GetAlreadyFilledSegmentationIdsForThePartnerUser(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Id == partnerUserId)
                    .SelectMany(x => x.AlreadyFilledSegmentations)
                    .Select(x => x.Id)
                    .ToListAsync();
            });
        }

        #endregion

        #region Gender


        #endregion

        #region PartnerRole

        public async Task<PartnerRoleDTO> SavePartnerRoleAndReturnDTOExtendedAsync(PartnerRoleSaveBodyDTO partnerRoleSaveBodyDTO)
        {

            return await _context.WithTransactionAsync(async () =>
            {
                partnerRoleSaveBodyDTO.PartnerRoleDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();

                PartnerRoleDTO savedPartnerRoleDTO = await SavePartnerRoleAndReturnDTOAsync(partnerRoleSaveBodyDTO.PartnerRoleDTO, false, false);
                
                await UpdatePartnerUserListForPartnerRole(savedPartnerRoleDTO.Id, partnerRoleSaveBodyDTO.SelectedPartnerUserIds);
                await UpdatePermissionListForPartnerRole(savedPartnerRoleDTO.Id, partnerRoleSaveBodyDTO.SelectedPermissionIds);

                return savedPartnerRoleDTO;
            });
        }

        public async Task UpdatePermissionListForPartnerRole(int partnerRoleId, List<int> selectedPermissionIds)
        {
            if (selectedPermissionIds == null)
                return;

            List<int> selectedIdsHelper = selectedPermissionIds.ToList();

            await _context.WithTransactionAsync(async () =>
            {
                // FT: Not doing authorization here, because we can not figure out here if we are updating while inserting object (eg. User), or updating object, we will always get the id which is not 0 here.

                PartnerRole partnerRole = await LoadInstanceAsync<PartnerRole, int>(partnerRoleId, null); // FT: Version will always be checked before or after this method

                if (partnerRole.Permissions != null)
                {
                    foreach (Permission permission in partnerRole.Permissions.ToList())
                    {
                        if (selectedIdsHelper.Contains(permission.Id))
                            selectedIdsHelper.Remove(permission.Id);
                        else
                            partnerRole.Permissions.Remove(permission);
                    }
                }
                else
                {
                    partnerRole.Permissions = new List<Permission>();
                }

                List<Permission> permissionListToInsert = await _context.DbSet<Permission>().Where(x => selectedIdsHelper.Contains(x.Id)).ToListAsync();

                partnerRole.Permissions.AddRange(permissionListToInsert);
                await _context.SaveChangesAsync();
            });
        }

        public async Task<List<NamebookDTO<int>>> LoadPermissionNamebookListForPartnerRole(int partnerRoleId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerRole>()
                    .AsNoTracking()
                    .Where(x => x.Id == partnerRoleId && x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .SelectMany(x => x.Permissions)
                    .Select(x => new NamebookDTO<int>
                    {
                        Id = x.Id,
                        DisplayName = x.Name,
                    })
                    .ToListAsync();
            });
        }

        #endregion

        #region PartnerNotification

        public async Task<PartnerNotificationDTO> SavePartnerNotificationAndReturnDTOExtendedAsync(PartnerNotificationSaveBodyDTO partnerNotificationSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                int currentPartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                partnerNotificationSaveBodyDTO.PartnerNotificationDTO.PartnerId = currentPartnerId;

                PartnerNotificationDTO savedPartnerNotificationDTO = await SavePartnerNotificationAndReturnDTOAsync(partnerNotificationSaveBodyDTO.PartnerNotificationDTO, false, false);

                IQueryable<PartnerUser> allPartnerUsersQuery = _context.DbSet<PartnerUser>()
                    .Where(x => x.Partner.Id == currentPartnerId);

                PaginationResult<PartnerUser> paginationResult = await LoadPartnerUserListForPagination(partnerNotificationSaveBodyDTO.TableFilter, allPartnerUsersQuery);

                await UpdatePartnerUserListForPartnerNotificationTableSelection(paginationResult.Query, savedPartnerNotificationDTO.Id, partnerNotificationSaveBodyDTO);

                return savedPartnerNotificationDTO;
            });
        }

        public async Task SendPartnerNotificationEmail(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                PartnerNotification partnerNotification = await LoadInstanceAsync<PartnerNotification, long>(partnerNotificationId, partnerNotificationVersion); // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users

                List<string> recipients = partnerNotification.PartnerUsers.Select(x => x.User.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, partnerNotification.Title, partnerNotification.EmailBody);
            });
        }

        public async Task<TableResponseDTO<NotificationDTO>> LoadNotificationListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            TableResponseDTO<NotificationDTO> result = new TableResponseDTO<NotificationDTO>();
            long currentUserId = _authenticationService.GetCurrentUserId(); // FT: Not doing user.Notifications, because he could have a lot of them.

            await _context.WithTransactionAsync(async () =>
            {
                long currentPartnerUserId = await _partnerUserAuthenticationService.GetCurrentPartnerUserId();

                var notificationUsersQuery = _context.DbSet<NotificationUser>()
                    .Where(x => x.UsersId == currentUserId)
                    .Select(x => new {
                        UserId = x.UsersId,
                        NotificationId = x.NotificationsId,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = nameof(NotificationUser),
                    });

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerNotificationPartnerUser>()
                    .Where(x => x.PartnerUsersId == currentPartnerUserId)
                    .Select(x => new {
                        UserId = x.PartnerUsersId,
                        NotificationId = x.PartnerNotificationsId,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = nameof(PartnerNotificationPartnerUser),
                    });

                var combinedQuery = notificationUsersQuery.Concat(partnerNotificationPartnerUsersQuery); // FT: Concat instead of union because it includes duplicates

                int count = await combinedQuery.CountAsync();

                var notificationUsers = await combinedQuery
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    .ToListAsync();

                List<NotificationDTO> notificationsDTO = new List<NotificationDTO>();

                foreach (var item in notificationUsers)
                {
                    NotificationDTO notificationDTO = new NotificationDTO();

                    if (item.Discriminator == nameof(NotificationUser))
                    {
                        Notification notification = await LoadInstanceAsync<Notification, long>(item.NotificationId, null);
                        notificationDTO.Id = notification.Id;
                        notificationDTO.Title = notification.Title;
                        notificationDTO.Description = notification.Description;
                        notificationDTO.CreatedAt = notification.CreatedAt;
                        notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;
                    }
                    else if (item.Discriminator == nameof(PartnerNotificationPartnerUser))
                    {
                        PartnerNotification partnerNotification = await LoadInstanceAsync<PartnerNotification, long>(item.NotificationId, null);
                        notificationDTO.Id = partnerNotification.Id;
                        notificationDTO.Title = partnerNotification.Title;
                        notificationDTO.Description = partnerNotification.Description;
                        notificationDTO.CreatedAt = partnerNotification.CreatedAt;
                        notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;
                    }

                    notificationsDTO.Add(notificationDTO);
                }

                notificationsDTO = notificationsDTO.OrderByDescending(x => x.CreatedAt).ToList();

                result.Data = notificationsDTO;
                result.TotalRecords = count;
            });

            return result;
        }

        public async Task<int> GetUnreadNotificationCountForTheCurrentPartnerUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                long currentPartnerUserId = await _partnerUserAuthenticationService.GetCurrentPartnerUserId();

                var notificationUsersQuery = _context.DbSet<NotificationUser>()
                    .Where(x => x.UsersId == currentUserId && x.IsMarkedAsRead == false);

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerNotificationPartnerUser>()
                    .Where(x => x.PartnerUsersId == currentPartnerUserId && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync() + await partnerNotificationPartnerUsersQuery.CountAsync();

                return count;
            });
        }

        #endregion

        #region Segmentation

        public async Task<SegmentationSaveBodyDTO> SaveSegmentationExtendedAsync(SegmentationSaveBodyDTO segmentationSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                segmentationSaveBodyDTO.SegmentationDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                SegmentationDTO savedSegmentationDTO = await SaveSegmentationAndReturnDTOAsync(segmentationSaveBodyDTO.SegmentationDTO, false, false);

                List<long> segmentationItemIdsDTO = segmentationSaveBodyDTO.SegmentationItemsDTO.Select(x => x.Id).ToList();

                if (segmentationItemIdsDTO.Count == 0)
                    throw new HackerException("The segmentation item list can't be empty.");

                List<SegmentationItem> segmentationItemsForDelete = await _context.DbSet<SegmentationItem>()
                    .Where(x => x.Segmentation.Id == savedSegmentationDTO.Id && segmentationItemIdsDTO.Contains(x.Id) == false)
                    .ToListAsync();

                await _context.DbSet<SegmentationItem>().Where(x => x.Segmentation.Id == savedSegmentationDTO.Id && segmentationItemIdsDTO.Contains(x.Id) == false).ExecuteDeleteAsync();

                List<SegmentationItemDTO> savedSegmentationItemsDTO = new List<SegmentationItemDTO>();

                for (int i = 0; i < segmentationSaveBodyDTO.SegmentationItemsDTO.Count; i++)
                {
                    segmentationSaveBodyDTO.SegmentationItemsDTO[i].SegmentationId = savedSegmentationDTO.Id;
                    segmentationSaveBodyDTO.SegmentationItemsDTO[i].OrderNumber = i + 1;
                    savedSegmentationItemsDTO.Add(await SaveSegmentationItemAndReturnDTOAsync(segmentationSaveBodyDTO.SegmentationItemsDTO[i], false, false));
                }

                return new SegmentationSaveBodyDTO 
                { 
                    SegmentationDTO = savedSegmentationDTO,
                    SegmentationItemsDTO = savedSegmentationItemsDTO,
                };
            });
        }

        public async Task<List<SegmentationItemDTO>> GetSegmentationItemsForTheSegmentation(int segmentationId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<SegmentationItem>()
                    .Where(x => x.Segmentation.Id == segmentationId)
                    .OrderBy(x => x.OrderNumber)
                    .ProjectToType<SegmentationItemDTO>(Mapper.SegmentationItemToDTOConfig())
                    .ToListAsync();
            });
        }

        public async Task<List<SegmentationDTO>> GetSegmentationListForTheCurrentPartner()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Segmentation>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.Id).ProjectToType<SegmentationDTO>(Mapper.SegmentationToDTOConfig()).ToListAsync();
            });
        }

        public async Task<List<SegmentationItemDTO>> GetSegmentationItemListForTheCurrentPartner()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<SegmentationItem>()
                    .Where(x => x.Segmentation.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .OrderBy(x => x.OrderNumber)
                    .ProjectToType<SegmentationItemDTO>(Mapper.SegmentationItemToDTOConfig())
                    .ToListAsync();
            });
        }
        
        //public async Task DeleteSegmentation(int segmentationId)
        //{
        //    await _context.WithTransactionAsync(async () =>
        //    {
        //        // TODO FT: Add authorization

        //        await DeleteEntityAsync<Segmentation, int>(segmentationId);
        //    });
        //}

        #endregion

    }

}


//protected override void OnBeforeUserExtendedIsMapped(UserExtendedDTO dto)
//{
//dto.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(dto.Password); // FT: We don't need this because we will read hashed password from the database
//}

#region Scheduled tasks

//public async Task LoadTransactionsAndAddPointsToUsers()
//{
//    //_context
//}

#endregion

//public async Task AddPointsToTheUser(string email, Guid transactionCode, List<ProductDTO> productsDTO)
//{
//    await _context.WithTransactionAsync(async () =>
//    {
//        UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();

//        Transaction transaction = new Transaction();
//        transaction.Guid = transactionCode;
//        transaction.Statuses.Add(await LoadInstanceAsync<TransactionStatus, byte>((byte)TransactionStatusCodes.Completed));

//        foreach (ProductDTO productDTO in productsDTO)
//        {
//            TransactionProduct transactionProduct = new TransactionProduct 
//            {
//                ProductId = productDTO.Id,
//                Transaction = transaction,
//            };
//            _context.DbSet<TransactionProduct>().Add(transactionProduct);
//            user.Points += (int)productDTO.Price * SettingsProvider.Current.PointsMultiplier; // TODO FT: Always round on the upper decimal
//        }

//        Tier tier = await GetTierForThePoints(user.Points);
//        user.Tier = tier;

//        await _context.SaveChangesAsync();
//    });
//}

// Tabele: sve ok
//public async Task RemovePointsFromTheUser(string email, Guid transactionCode)
//{
//    await _context.WithTransactionAsync(async () =>
//    {
//        UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();
//        Transaction transaction = await _context.DbSet<Transaction>().Where(x => x.Guid == transactionCode).SingleOrDefaultAsync();
//        transaction.Statuses.Add(await LoadInstanceAsync<TransactionStatus, byte>((byte)TransactionStatusCodes.Cancelled));
//        user.Points -= (int)transaction.Points;
//    });
//}

//// Maloprodaja
//public async Task<QrCodeDTO> GetQrCodeDataForTheCurrentUser()
//{
//    string email = null;
//    int discount = 0;

//    await _context.WithTransactionAsync(async () =>
//    {
//        UserExtended user = await _authenticationService.GetCurrentUser<UserExtended>();
//        discount = user.Tier.Discount;
//        email = user.Email;
//    });

//    Guid transactionCode = new Guid();

//    return new QrCodeDTO 
//    {
//        Email = email,
//        TransactionCode = transactionCode,
//        Discount = discount
//    };
//}

//private bool ExistsInCache(string sixDigitCode)
//{
//    return true;
//}

//// Maloprodaja - new
//public async Task<QrCodeDTO> GetRetailDataForTheCart(string discountVerificationCode, List<ProductDTO> productsDTO)
//{
//    DiscountVerificationDTO discountVerification = TryGetValue(discountVerificationCode);

//    if (discountVerification == null)
//        throw new Exception("The six digit code you provided doesn't exist.");

//    Guid transactionCode = new Guid();

//    decimal priceBeforeDiscount = 0;
//    decimal priceAfterDiscount = 0;

//    foreach (ProductDTO productDTO in productsDTO)
//    {
//        priceBeforeDiscount += productDTO.Price;
//        decimal productDiscount = GetProductDiscountForTheUser();
//        priceAfterDiscount += (productDTO.Discount / 100) * productDTO.Price;
//        // 1. da li cuvati brednove kod sebe i slati samo brandCode sa svakim proizvodom ili
//        // 2. slati productDTO.brand.tiers
//        // 3. sa njihovog apija dovucem tiere, pa u tierima trazim tier sa kodom trenutnog korisnika, onda u brendovima trazim brend trenutnog proizvoda
//    }

//    decimal totalDiscount = priceAfterDiscount * 100 / priceAfterDiscount;

//    return new QrCodeDTO
//    {
//        Email = discountVerification.Email,
//        TransactionCode = transactionCode,
//        Discount = discount,
//    };

//}

//// Internet: Ne treba ni da mi dokazuje i upisuje kod, samo moraju da poboljsaju autentifikaciju


//public async Task<OnlineShopDTO> GetDiscountForTheUser(string email)
//{
//    int discount = 0;

//    await _context.WithTransactionAsync(async () =>
//    {
//        PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Email == email).SingleOrDefaultAsync();
//        discount = partnerUser.Tier.Discount;
//    });

//    Guid transactionCode = new Guid();

//    return new OnlineShopDTO
//    {
//        TransactionCode = transactionCode,
//        Discount = discount
//    };
//}