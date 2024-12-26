using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.Services;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Enums;
using Soft.Generator.Shared.SoftExceptions;
using Mapster;
using Soft.Generator.Security.DTO;
using Playerty.Loyals.Business.DataMappers;
using FluentValidation;
using Soft.Generator.Shared.Emailing;
using Azure.Storage.Blobs;
using Playerty.Loyals.Business.ValidationRules;
using System.Collections.Generic;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Database;
using System.Linq;
using Playerty.Loyals.Business.BackroundJobs;
using Soft.Generator.Shared.Helpers;
using System.Diagnostics;

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly Playerty.Loyals.Business.Services.AuthorizationBusinessService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly EmailingService _emailingService;
        private readonly BlobContainerClient _blobContainerClient;
        private readonly WingsApiService _wingsApiService;
        private readonly UpdatePointsScheduler _updatePointsScheduler;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, Playerty.Loyals.Business.Services.AuthorizationBusinessService authorizationService, SecurityBusinessService<UserExtended> securityBusinessService, AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService, EmailingService emailingService, BlobContainerClient blobContainerClient, WingsApiService wingsApiService, UpdatePointsScheduler updatePointsScheduler)
            : base(context, excelService, authorizationService, blobContainerClient)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _emailingService = emailingService;
            _blobContainerClient = blobContainerClient;
            _wingsApiService = wingsApiService;
            _updatePointsScheduler = updatePointsScheduler;
        }

        #region User

        public async Task<UserExtendedDTO> SaveUserExtendedAndReturnDTOExtendedAsync(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id == 0)
                    throw new HackerException("You can't add new user.");

                UserExtended user = await LoadInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != user.Email)
                    throw new HackerException("You can't change email from here.");

                if (userExtendedSaveBodyDTO.SelectedRoleIds != null)
                    await _securityBusinessService.UpdateRoleListForUser(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRoleIds);

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
                NotificationDTO savedNotificationDTO = await SaveNotificationAndReturnDTOAsync(notificationSaveBodyDTO.NotificationDTO, true, true);

                PaginationResult<UserExtended> paginationResult = await LoadUserExtendedListForPagination(notificationSaveBodyDTO.TableFilter, _context.DbSet<UserExtended>());

                await UpdateUserExtendedListForNotificationWithLazyTableSelection(paginationResult.Query, savedNotificationDTO.Id, notificationSaveBodyDTO);

                return savedNotificationDTO;
            });
        }

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.EditNotification);

                Notification notification = await LoadInstanceAsync<Notification, long>(notificationId, notificationVersion); // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users

                List<string> recipients = notification.Users.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        #endregion

        #region Tier

        public async Task<TierSaveBodyDTO> SaveTier(TierSaveBodyDTO tierSaveBodyDTO)
        {
            List<int> exceptionHelper = new List<int>();

            for (int i = 0; i < tierSaveBodyDTO.TierDTOList.Count; i++)
            {
                if (tierSaveBodyDTO.TierDTOList[i].ValidTo <= tierSaveBodyDTO.TierDTOList[i].ValidFrom)
                {
                    exceptionHelper.Add(i+1);
                }

                if (i < tierSaveBodyDTO.TierDTOList.Count - 1)
                {
                    if (tierSaveBodyDTO.TierDTOList[i].ValidTo != tierSaveBodyDTO.TierDTOList[i + 1].ValidFrom)
                    {
                        exceptionHelper.Add(i+2); // FT: If he provided 0 - 10 and 12 - 20, the second is invalid.
                        i++; // FT: Skip the next one so we don't need to do distinct.
                    }
                }
            }

            if (exceptionHelper.Count > 0)
            {
                string helper = exceptionHelper.Count == 1 ? "unesen nivo lojalnosti" : "uneseni nivoi lojalnosti";
                throw new BusinessException($"Neispravno {helper}: {exceptionHelper.ToCommaSeparatedString()}. Nivoi lojalnosti moraju biti sačuvani rastućim redosledom (npr. Nivo 1: 1p - 10p, Nivo 2: 10p - 20p, Nivo 3: 20p - 30p). Ne možete dodati nivo lojalnosti čija je gornja granica veća (ili jednaka) od donje granice.");
            }

            List<TierDTO> tierResultDTOList = new List<TierDTO>();
            List<BusinessSystemTierDTO> businessSystemTierResultDTOList = new List<BusinessSystemTierDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                List<int> tierIdsDTO = tierSaveBodyDTO.TierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed tiers
                List<int> tierIdListToDelete = _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode() && tierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                await DeleteTierListAsync(tierIdListToDelete, false);

                List<long> businessSystemTierIdsDTO = tierSaveBodyDTO.BusinessSystemTierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed businessSystem tiers
                List<long> businessSystemTierIdListToDelete = _context.DbSet<BusinessSystemTier>().Where(x => tierIdsDTO.Contains(x.Tier.Id) && businessSystemTierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                await DeleteBusinessSystemTierListAsync(businessSystemTierIdListToDelete, false);

                for (int i = 0; i < tierSaveBodyDTO.TierDTOList.Count; i++)
                {
                    TierDTO tierDTO = tierSaveBodyDTO.TierDTOList[i];
                    tierDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                    TierDTO savedTierDTO = await SaveTierAndReturnDTOAsync(tierDTO, false, false);
                    tierResultDTOList.Add(savedTierDTO);

                    List<BusinessSystemTierDTO> businessSystemTierDTOList = tierSaveBodyDTO.BusinessSystemTierDTOList.Where(x => x.TierClientIndex == i).ToList();
                    for (int j = 0; j < businessSystemTierDTOList.Count; j++)
                    {
                        BusinessSystemTierDTO businessSystemTierDTO = businessSystemTierDTOList[j];
                        businessSystemTierDTO.TierId = savedTierDTO.Id;
                        businessSystemTierDTO.OrderNumber = j + 1;
                        BusinessSystemTierDTO savedBusinessSystemTierDTO = await SaveBusinessSystemTierAndReturnDTOAsync(businessSystemTierDTO, false, false);
                        savedBusinessSystemTierDTO.TierClientIndex = i;
                        businessSystemTierResultDTOList.Add(savedBusinessSystemTierDTO);

                        List<BusinessSystemTierDiscountProductGroupDTO> businessSystemTierDiscountProductGroupDTOList = tierSaveBodyDTO.BusinessSystemTierDiscountProductGroupDTOList.Where(x => x.SelectedForBusinessSystem == true && x.TierClientIndex == i && x.BusinessSystemTierClientIndex == j).ToList();
                        await UpdateDiscountProductGroupListForBusinessSystemTier(savedBusinessSystemTierDTO.Id, businessSystemTierDiscountProductGroupDTOList);
                    }
                }

                await UpdatePartnerUsersTiers();
            });

            tierSaveBodyDTO.TierDTOList = tierResultDTOList;
            tierSaveBodyDTO.BusinessSystemTierDTOList = businessSystemTierResultDTOList;

            return tierSaveBodyDTO;
        }

        public async Task UpdatePartnerUsersTiers()
        {
            await _context.WithTransactionAsync(async () =>
            {
                List<PartnerUser> partnerUsers = await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).ToListAsync();

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
                    Tier tier = await _context.DbSet<Tier>().Where(x => points >= x.ValidFrom && points < x.ValidTo && x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).SingleOrDefaultAsync();
                    return tier;
                }
            });
        }

        public async Task<Tier> GetTheGreatestTier()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderByDescending(x => x.ValidTo).FirstOrDefaultAsync();
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

        public async Task<TierSaveBodyDTO> LoadTierSaveBodyDTO()
        {
            TierSaveBodyDTO tierSaveBodyDTO = new TierSaveBodyDTO();

            await _context.WithTransactionAsync(async () =>
            {
                List<TierDTO> tierDTOList = await LoadTierDTOList(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
                List<int> tierIds = tierDTOList.Select(x => x.Id).ToList();

                List<BusinessSystemTierDTO> businessSystemTierDTOList = await LoadBusinessSystemTierDTOList(_context.DbSet<BusinessSystemTier>().Where(x => tierIds.Contains(x.Tier.Id)).OrderBy(x => x.OrderNumber), false);
                List<long> businessSystemTierIds = businessSystemTierDTOList.Select(x => x.Id).ToList();

                List<DiscountProductGroupDTO> discountCategoryDTOList = await LoadDiscountProductGroupDTOList(_context.DbSet<DiscountProductGroup>().Where(x => x.BusinessSystem.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false); // 14
                List<BusinessSystemTierDiscountProductGroupDTO> businessSystemTierDiscountProductGroupResultDTOList = discountCategoryDTOList
                    .Select(x => new BusinessSystemTierDiscountProductGroupDTO
                    {
                        Id = x.Id,
                        DiscountProductGroupId = x.Id,
                        DiscountProductGroupDisplayName = x.Name,
                        SelectedForBusinessSystem = false,
                        Discount = null,
                        BusinessSystemId = x.BusinessSystemId, // FT: Needs BusinessSystemId because when we add a new table on the client we have to separate which data to show
                    })
                    .ToList();

                List<BusinessSystemTierDiscountProductGroupDTO> selectedBusinessSystemTierDiscountProductGroupDTOList = await _context.DbSet<BusinessSystemTierDiscountProductGroup>() // TODO FT: Add to generator
                    .AsNoTracking()
                    .Where(x => businessSystemTierIds.Contains(x.BusinessSystemTier.Id))
                    .ProjectToType<BusinessSystemTierDiscountProductGroupDTO>(Mapper.BusinessSystemTierDiscountProductGroupToDTOConfig())
                    .ToListAsync();

                for (int i = 0; i < tierIds.Count; i++)
                {
                    List<BusinessSystemTierDTO> businessSystemTierDTOForTierList = businessSystemTierDTOList.Where(x => x.TierId == tierIds[i]).ToList();
                    List<long> businessSystemTierIdsForTierList = businessSystemTierDTOForTierList.Select(x => x.Id).ToList();

                    for (int j = 0; j < businessSystemTierIdsForTierList.Count; j++)
                    {
                        businessSystemTierDTOForTierList[j].TierClientIndex = i;

                        List<BusinessSystemTierDiscountProductGroupDTO> businessSystemTierDiscountProductGroupDTOList = discountCategoryDTOList
                            .Where(x => x.BusinessSystemId == businessSystemTierDTOForTierList[j].BusinessSystemId)
                            .Select(x =>
                            {
                                BusinessSystemTierDiscountProductGroupDTO selectedBusinessSystemTierDiscountProductGroupDTO = selectedBusinessSystemTierDiscountProductGroupDTOList
                                    .Where(s => s.DiscountProductGroupId == x.Id && s.BusinessSystemTierId == businessSystemTierIdsForTierList[j])
                                    .SingleOrDefault();

                                return new BusinessSystemTierDiscountProductGroupDTO
                                {
                                    Id = x.Id,
                                    DiscountProductGroupDisplayName = x.Name,
                                    SelectedForBusinessSystem = selectedBusinessSystemTierDiscountProductGroupDTO != null,
                                    Discount = selectedBusinessSystemTierDiscountProductGroupDTO?.Discount,
                                    DiscountProductGroupId = x.Id,
                                    BusinessSystemTierId = businessSystemTierIdsForTierList[j],
                                    TierClientIndex = i,
                                    BusinessSystemTierClientIndex = j,
                                };
                            })
                            .ToList();

                        businessSystemTierDiscountProductGroupResultDTOList = businessSystemTierDiscountProductGroupResultDTOList.Concat(businessSystemTierDiscountProductGroupDTOList).ToList();
                    }
                }

                tierSaveBodyDTO.TierDTOList = tierDTOList;
                tierSaveBodyDTO.BusinessSystemTierDTOList = businessSystemTierDTOList;
                tierSaveBodyDTO.BusinessSystemTierDiscountProductGroupDTOList = businessSystemTierDiscountProductGroupResultDTOList;
            });

            return tierSaveBodyDTO;
        }

        public async Task<List<TierDTO>> LoadTierListForDisplay()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                List<TierDTO> tierDTOList = new List<TierDTO>();

                List<Tier> tierList = await LoadTierList(_context.DbSet<Tier>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .Include(x => x.BusinessSystemTiers)
                        .ThenInclude(x => x.BusinessSystem)
                    .Include(x => x.BusinessSystemTiers)
                        .ThenInclude(x => x.BusinessSystemTierDiscountProductGroups)
                            .ThenInclude(x => x.DiscountProductGroup)
                    .Include(x => x.Partner)
                    .OrderByDescending(x => x.ValidFrom), false);

                foreach (Tier tier in tierList)
                {
                    TierDTO tierDTO = tier.Adapt<TierDTO>(Mapper.TierToDTOConfig());
                    tierDTO.BusinessSystemTiersDTOList = new List<BusinessSystemTierDTO>();

                    foreach (BusinessSystemTier businessSystemTier in tier.BusinessSystemTiers.OrderBy(x => x.OrderNumber))
                    {
                        BusinessSystemTierDTO businessSystemTierDTO = businessSystemTier.Adapt<BusinessSystemTierDTO>(Mapper.BusinessSystemTierToDTOConfig());
                        businessSystemTierDTO.BusinessSystemTierDiscountProductGroupsDTOList = new List<BusinessSystemTierDiscountProductGroupDTO>();

                        foreach (BusinessSystemTierDiscountProductGroup businessSystemTierDiscountProductGroup in businessSystemTier.BusinessSystemTierDiscountProductGroups)
                        {
                            BusinessSystemTierDiscountProductGroupDTO businessSystemTierDiscountProductGroupDTO = businessSystemTierDiscountProductGroup.Adapt<BusinessSystemTierDiscountProductGroupDTO>((TypeAdapterConfig)Mapper.BusinessSystemTierDiscountProductGroupToDTOConfig());
                            businessSystemTierDTO.BusinessSystemTierDiscountProductGroupsDTOList.Add(businessSystemTierDiscountProductGroupDTO);
                        }

                        tierDTO.BusinessSystemTiersDTOList.Add(businessSystemTierDTO);
                    }

                    tierDTOList.Add(tierDTO);
                }

                return tierDTOList;
            });
        }

        #endregion

        #region Partner

        /// <summary>
        /// TODO FT: Add this to generator (you will need to add one more custom attribute [Code])
        /// </summary>
        public async Task<List<CodebookDTO>> LoadPartnerWithSlugListForAutocomplete(int limit, string query, IQueryable<Partner> partnerQuery, bool authorize = true)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                if (authorize)
                {
                    await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.ReadPartner);
                }

                partnerQuery = partnerQuery.Where(x => x.PartnerUsers.Any(x => x.User.Id == currentUserId));

                if (!string.IsNullOrEmpty(query))
                    partnerQuery = partnerQuery.Where(x => x.Name.Contains(query));

                return await partnerQuery
                    .AsNoTracking()
                    .Take(limit)
                    .Select(x => new CodebookDTO
                    {
                        Code = x.Slug,
                        DisplayName = x.Name,
                    })
                    .ToListAsync();
            });
        }

        public async Task<List<int>> GetPartnerIdsForTheCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Partner>().Where(x => x.PartnerUsers.Any(x => x.User.Id == currentUserId)).Select(x => x.Id).ToListAsync();
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

        public async Task AddPartnerUserAfterAuthResult(AuthResultDTO authResultDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                Partner currentPartner = await _partnerUserAuthenticationService.GetCurrentPartner();

                if (currentPartner != null)
                {
                    UserExtended user = await LoadInstanceAsync<UserExtended, long>(authResultDTO.UserId, null);

                    PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Id == user.Id && x.Partner.Id == currentPartner.Id).SingleOrDefaultAsync();

                    await AddPartnerUser(partnerUser, user, currentPartner);
                }
            });
        }

        public async Task AddPartnerUserForTheCurrentUser(int partnerId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                Partner partner = await LoadInstanceAsync<Partner, int>(partnerId, null);

                UserExtended user = await _authenticationService.GetCurrentUser<UserExtended>();

                PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Id == user.Id && x.Partner.Id == partner.Id).SingleOrDefaultAsync();

                await AddPartnerUser(partnerUser, user, partner);
            });
        }

        private async Task AddPartnerUser(PartnerUser partnerUser, UserExtended user, Partner partner)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (partnerUser == null)
                {
                    partnerUser = new PartnerUser
                    {
                        User = user,
                        Partner = partner,
                        Points = 0,
                        Tier = partner.Tiers.OrderBy(t => t.ValidTo).FirstOrDefault() // FT: If exists, saving the lowest tier, else null.
                    };

                    await _context.DbSet<PartnerUser>().AddAsync(partnerUser);
                    await _context.SaveChangesAsync();
                }
            });
        }

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

                int pointsBeforeSave = await _context.DbSet<PartnerUser>().Where(x => x.Id == partnerUserSaveBodyDTO.PartnerUserDTO.Id).Select(x => x.Points).SingleAsync();

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

                await _context.SaveChangesAsync();
            });
        }

        /// <summary>
        /// </summary>
        /// <param name="pointsToAdd">Can be negative value also</param>
        public async Task UpdatePointsForThePartnerUser(PartnerUser partnerUser, int pointsToAdd)
        {
            await _context.WithTransactionAsync(async () =>
            {
                partnerUser.Points += pointsToAdd;

                await UpdatePartnerUserTier(partnerUser);
            });
        }

        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                PartnerUser currentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUser();

                List<string> currentPartnerUserPermissionCodes = new List<string>();

                if (currentPartnerUser != null)
                {
                    currentPartnerUserPermissionCodes = currentPartnerUser.PartnerRoles
                        .SelectMany(x => x.PartnerPermissions)
                        .Select(x => x.Code)
                        .Distinct()
                        .ToList();
                }

                UserExtended currentUser = await _authenticationService.GetCurrentUser<UserExtended>();

                List<string> currentUserPermissionCodes = currentUser.Roles
                    .SelectMany(x => x.Permissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToList();

                return currentUserPermissionCodes.Concat(currentUserPermissionCodes).ToList();
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

        public async Task<TableResponseDTO<TransactionDTO>> LoadTransactionListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                long partnerUserId = await _partnerUserAuthenticationService.GetCurrentPartnerUserId();

                TableResponseDTO<TransactionDTO> transactionTableResponse = await LoadTransactionTableData(tableFilterDTO, _context.DbSet<Transaction>().Where(x => x.PartnerUser.Id == partnerUserId).OrderByDescending(x => x.Id), false);

                return transactionTableResponse;
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
                await UpdatePartnerPermissionListForPartnerRole(savedPartnerRoleDTO.Id, partnerRoleSaveBodyDTO.SelectedPermissionIds);

                return savedPartnerRoleDTO;
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

                await UpdatePartnerUserListForPartnerNotificationWithLazyTableSelection(paginationResult.Query, savedPartnerNotificationDTO.Id, partnerNotificationSaveBodyDTO);

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

                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId)
                    .Select(x => new
                    {
                        UserId = x.User.Id,
                        NotificationId = x.Notification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = nameof(UserNotification),
                    });

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.Id == currentPartnerUserId)
                    .Select(x => new
                    {
                        UserId = x.PartnerUser.Id,
                        NotificationId = x.PartnerNotification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = nameof(PartnerUserPartnerNotification),
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

                    if (item.Discriminator == nameof(UserNotification))
                    {
                        Notification notification = await LoadInstanceAsync<Notification, long>(item.NotificationId, null);
                        notificationDTO.Id = notification.Id;
                        notificationDTO.Title = notification.Title;
                        notificationDTO.Description = notification.Description;
                        notificationDTO.CreatedAt = notification.CreatedAt;
                        notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;
                    }
                    else if (item.Discriminator == nameof(PartnerUserPartnerNotification))
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

                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.Id == currentPartnerUserId && x.IsMarkedAsRead == false);

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

        #region BusinessSystem

        public async Task<BusinessSystemDTO> SaveBusinessSystemExtendedAsync(BusinessSystemSaveBodyDTO businessSystemSaveBodyDTO)
        {
            if (businessSystemSaveBodyDTO.BusinessSystemDTO.Id == 0 && (businessSystemSaveBodyDTO.BusinessSystemDTO.UpdatePointsInterval != null || businessSystemSaveBodyDTO.BusinessSystemDTO.UpdatePointsStartDate != null))
                throw new HackerException("Can't save UpdatePointsInterval nor UpdatePointsStartDate from here.");

            return await _context.WithTransactionAsync(async () =>
            {
                int currentPartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                businessSystemSaveBodyDTO.BusinessSystemDTO.PartnerId = currentPartnerId;

                if (businessSystemSaveBodyDTO.BusinessSystemDTO.Id > 0)
                {
                    BusinessSystem businessSystemBeforeSave = await LoadInstanceAsync<BusinessSystem, long>(businessSystemSaveBodyDTO.BusinessSystemDTO.Id, businessSystemSaveBodyDTO.BusinessSystemDTO.Version);

                    if ((businessSystemBeforeSave.UpdatePointsInterval != businessSystemSaveBodyDTO.BusinessSystemDTO.UpdatePointsInterval) ||
                        (!Helper.AreDatesEqualToSeconds(businessSystemBeforeSave.UpdatePointsStartDate, businessSystemSaveBodyDTO.BusinessSystemDTO.UpdatePointsStartDate)))
                        throw new HackerException("Can't save UpdatePointsInterval nor UpdatePointsStartDate from here.");
                }


                return await SaveBusinessSystemAndReturnDTOAsync(businessSystemSaveBodyDTO.BusinessSystemDTO, false, false);
            });
        }

        public async Task<int> SaveBusinessSystemUpdatePointsDataAsync(BusinessSystemUpdatePointsDataBodyDTO businessSystemUpdatePointsDataBodyDTO)
        {
            DateTimeOffset? scheduledJobResult = null;

            try
            {
                if ((businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval == null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate != null) ||
                    (businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval != null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate == null))
                    throw new BusinessException("Ako želite da ažurirate poene na određenom intervalu, morate da popunite polje interval i polje početak ažuriranja.");

                if (businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval != null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval <= 0)
                    throw new HackerException($"The negative or zero interval can't be saved (BusinessSystemId: {businessSystemUpdatePointsDataBodyDTO.BusinessSystemId}).");

                DateTime now = DateTime.Now;

                // FT: We redundantly check both here and inside the ScheduleJob method, in the method due to the programming principle, and here so that they do not enter the transaction and block other threads from executing
                if (businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate != null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate.Value <= now)
                    throw new BusinessException("Vreme početka ažuriranja poena mora biti veće od sadašnjeg trenutka.");

                return await _context.WithTransactionAsync(async () =>
                {
                    BusinessSystem businessSystem = await LoadInstanceAsync<BusinessSystem, long>(businessSystemUpdatePointsDataBodyDTO.BusinessSystemId, businessSystemUpdatePointsDataBodyDTO.BusinessSystemVersion);

                    if (businessSystem.GetTransactionsEndpoint == null)
                        throw new BusinessException("Morate da popunite i sačuvate polje 'Putanja za učitavanje transakcija', kako biste pokrenuli ažuriranje poena.");

                    businessSystem.UpdatePointsInterval = businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval;
                    businessSystem.UpdatePointsStartDate = businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate;

                    if (businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval != null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate != null)
                    {
                        businessSystem.UpdatePointsScheduledTaskIsPaused = false;
                        await _context.SaveChangesAsync();

                        scheduledJobResult = await _updatePointsScheduler.ScheduleJob(
                            businessSystemUpdatePointsDataBodyDTO.BusinessSystemId,
                            businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval.Value,
                            businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate.Value,
                            now
                        );
                    }
                    else if (businessSystemUpdatePointsDataBodyDTO.UpdatePointsInterval == null && businessSystemUpdatePointsDataBodyDTO.UpdatePointsStartDate == null)
                    {
                        businessSystem.UpdatePointsScheduledTaskIsPaused = true;
                        await _context.SaveChangesAsync();

                        await _updatePointsScheduler.DeleteJob(businessSystemUpdatePointsDataBodyDTO.BusinessSystemId);
                    }


                    return businessSystem.Version;
                });
            }
            catch (Exception)
            {
                if (scheduledJobResult != null)
                    await _updatePointsScheduler.DeleteJob(businessSystemUpdatePointsDataBodyDTO.BusinessSystemId);

                throw;
            }
        }

        public async Task<int> ChangeScheduledTaskUpdatePointsStatusAsync(long businessSystemId, int businessSystemVersion)
        {
            bool scheduledJobContinued = false;

            try
            {
                return await _context.WithTransactionAsync(async () =>
                {
                    BusinessSystem businessSystem = await LoadInstanceAsync<BusinessSystem, long>(businessSystemId, businessSystemVersion);

                    List<string> exceptions = new List<string>();

                    if (businessSystem.GetTransactionsEndpoint == null)
                        exceptions.Add("Morate da popunite i sačuvate polje 'Putanja za učitavanje transakcija', kako biste pokrenuli ažuriranje poena.");

                    if (businessSystem.UpdatePointsInterval == null)
                        exceptions.Add("Morate da popunite i sačuvate polje 'Interval ažuriranja', kako biste pokrenuli ažuriranje poena.");

                    if (businessSystem.UpdatePointsStartDate == null)
                        exceptions.Add("Morate da popunite i sačuvate polje 'Početak ažuriranja', kako biste pokrenuli ažuriranje poena.");

                    if (businessSystem.UpdatePointsScheduledTaskIsPaused == null)
                        exceptions.Add("Pre promene statusa, morate da pokrenete automatsko ažuriranje.");

                    if (exceptions.Count > 0)
                        throw new BusinessException(string.Join("\n", exceptions));

                    businessSystem.UpdatePointsScheduledTaskIsPaused = !businessSystem.UpdatePointsScheduledTaskIsPaused.Value;

                    await _context.SaveChangesAsync();

                    if (businessSystem.UpdatePointsScheduledTaskIsPaused.Value)
                    {
                        await _updatePointsScheduler.DeleteJob(businessSystemId);
                    }
                    else
                    {
                        BusinessSystemUpdatePointsScheduledTask lastBusinessSystemUpdatePointsScheduledTask = businessSystem.BusinessSystemUpdatePointsScheduledTasks.OrderByDescending(x => x.TransactionsTo).FirstOrDefault();

                        scheduledJobContinued = await _updatePointsScheduler.ContinueJob(
                            businessSystem.Id,
                            businessSystem.UpdatePointsInterval.Value,
                            businessSystem.UpdatePointsStartDate.Value,
                            lastBusinessSystemUpdatePointsScheduledTask?.TransactionsTo
                        );
                    }

                    return businessSystem.Version;
                });
            }
            catch (Exception)
            {
                if (scheduledJobContinued == true)
                    await _updatePointsScheduler.DeleteJob(businessSystemId);

                throw;
            }
        }

        /// <summary>
        /// Pass fromDate only if it is the first time
        /// </summary>
        public async Task UpdatePointsAsync(long businessSystemId, int businessSystemVersion, DateTime manualDateFrom, DateTime manualDateTo)
        {
            DateTime now = DateTime.Now;

            if (manualDateTo >= now)
                throw new BusinessException("Datum do kog želite da ažurirate poene ne sme biti veći od sadašnjeg trenutka.");

            if (manualDateTo <= manualDateFrom)
                throw new HackerException($"BusinessSystem: {businessSystemId}. Can not pass greater {nameof(manualDateTo)} then {nameof(manualDateFrom)} in manually started points update.");

            await _context.WithTransactionAsync(async () =>
            {
                BusinessSystem businessSystem = await LoadInstanceAsync<BusinessSystem, long>(businessSystemId, businessSystemVersion);

                if (businessSystem.GetTransactionsEndpoint == null)
                    throw new BusinessException("Morate da popunite i sačuvate polje 'Putanja za učitavanje transakcija', kako biste pokrenuli ažuriranje poena.");

                await _updatePointsScheduler.ScheduleJobManually(businessSystemId, manualDateFrom, manualDateTo);
            });
        }

        #endregion

        #region Transaction

        protected override async Task OnBeforeTransactionIsMapped(TransactionDTO transactionDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (await EntityFrameworkQueryableExtensions.AnyAsync<Transaction>(_context.DbSet<Transaction>(), x => x.BusinessSystem.Id == (long)transactionDTO.BusinessSystemId && x.Code == transactionDTO.Code))
                    throw new BusinessException($"Transakcija '{transactionDTO.Code}' već postoji u sistemu.");
            });
        }

        #endregion
    }

}