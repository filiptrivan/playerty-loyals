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

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
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
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Password != null)
                    throw new HackerException("You can't change password from here.");

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id == 0)
                    throw new HackerException("You can't add new user.");

                UserExtended user = await LoadInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != user.Email)
                    throw new HackerException("You can't change email from here.");

                if (userExtendedSaveBodyDTO.SelectedRoleIds != null)
                    await _securityBusinessService.UpdateRoleListForUser(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRoleIds);

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
                NotificationDTO savedNotificationDTO = await SaveNotificationAndReturnDTOAsync(notificationSaveBodyDTO.NotificationDTO, true, true);

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
                IQueryable<UserExtended> query = _context.DbSet<UserExtended>()
                    .OrderBy(x => x.Id) // FT: It's important that OrderBy is before skip and take
                    .Skip(tableFilterPayload.First)
                    .Take(tableFilterPayload.Rows)
                    .Where(x => x.Notifications
                        .Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)); // notificationId

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
            List<StoreTierDTO> storeTierResultDTOList = new List<StoreTierDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                List<int> tierIdsDTO = tierSaveBodyDTO.TierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed tiers
                List<int> tierIdListToDelete = _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode() && tierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                await DeleteTierListAsync(tierIdListToDelete, false);

                List<long> storeTierIdsDTO = tierSaveBodyDTO.StoreTierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed store tiers
                List<long> storeTierIdListToDelete = _context.DbSet<StoreTier>().Where(x => tierIdsDTO.Contains(x.Tier.Id) && storeTierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                await DeleteStoreTierListAsync(storeTierIdListToDelete, false);

                for (int i = 0; i < tierSaveBodyDTO.TierDTOList.Count; i++)
                {
                    TierDTO tierDTO = tierSaveBodyDTO.TierDTOList[i];
                    tierDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                    TierDTO savedTierDTO = await SaveTierAndReturnDTOAsync(tierDTO, false, false);
                    tierResultDTOList.Add(savedTierDTO);

                    List<StoreTierDTO> storeTierDTOList = tierSaveBodyDTO.StoreTierDTOList.Where(x => x.TierClientIndex == i).ToList();
                    for (int j = 0; j < storeTierDTOList.Count; j++)
                    {
                        StoreTierDTO storeTierDTO = storeTierDTOList[j];
                        storeTierDTO.TierId = savedTierDTO.Id;
                        storeTierDTO.OrderNumber = j + 1;
                        StoreTierDTO savedStoreTierDTO = await SaveStoreTierAndReturnDTOAsync(storeTierDTO, false, false);
                        savedStoreTierDTO.TierClientIndex = i;
                        storeTierResultDTOList.Add(savedStoreTierDTO);

                        List<StoreTierDiscountCategoryDTO> storeTierDiscountCategoryDTOList = tierSaveBodyDTO.StoreTierDiscountCategoryDTOList.Where(x => x.SelectedForStore == true && x.TierClientIndex == i && x.StoreTierClientIndex == j).ToList();
                        await UpdateDiscountCategoryListForStoreTier(savedStoreTierDTO.Id, storeTierDiscountCategoryDTOList);
                    }
                }

                await UpdatePartnerUsersTiers();
            });

            tierSaveBodyDTO.TierDTOList = tierResultDTOList;
            tierSaveBodyDTO.StoreTierDTOList = storeTierResultDTOList;

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

        //public async Task<List<StoreTierDTO>> LoadStoreTierDTOListForTierList(List<long> tierIds)
        //{
        //    List<StoreTierDTO> storeTierDTOList = await LoadStoreTierDTOList(_context.DbSet<StoreTier>().Where(x => tierIds.Contains(x.Tier.Id)), false);

        //    for (int i = 0; i < tierIds.Count; i++)
        //    {
        //        List<StoreTierDTO> storeTierDTOForTierList = storeTierDTOList.Where(x => x.TierId == tierIds[i]).ToList();

        //        foreach (StoreTierDTO storeTierDTO in storeTierDTOForTierList)
        //        {
        //            storeTierDTO.TierClientIndex = i;
        //        }
        //    }

        //    return storeTierDTOList;
        //}

        public async Task<TierSaveBodyDTO> LoadTierSaveBodyDTO()
        {
            TierSaveBodyDTO tierSaveBodyDTO = new TierSaveBodyDTO();

            await _context.WithTransactionAsync(async () =>
            {
                List<TierDTO> tierDTOList = await LoadTierDTOList(_context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), false);
                List<int> tierIds = tierDTOList.Select(x => x.Id).ToList();

                List<StoreTierDTO> storeTierDTOList = await LoadStoreTierDTOList(_context.DbSet<StoreTier>().Where(x => tierIds.Contains(x.Tier.Id)).OrderBy(x => x.OrderNumber), false);
                List<long> storeTierIds = storeTierDTOList.Select(x => x.Id).ToList();

                await SyncDiscountCategories();

                List<DiscountCategoryDTO> discountCategoryDTOList = await LoadDiscountCategoryDTOList(_context.DbSet<DiscountCategory>().Where(x => x.Store.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false); // 14
                List<StoreTierDiscountCategoryDTO> storeTierDiscountCategoryResultDTOList = discountCategoryDTOList
                    .Select(x => new StoreTierDiscountCategoryDTO
                    {
                        Id = x.Id,
                        DiscountCategoryId = x.Id,
                        DiscountCategoryDisplayName = x.Name,
                        SelectedForStore = false,
                        Discount = null,
                        StoreId = x.StoreId, // FT: Needs StoreId because when we add a new table on the client we have to separate which data to show
                    })
                    .ToList();

                List<StoreTierDiscountCategoryDTO> selectedStoreTierDiscountCategoryDTOList = await _context.DbSet<StoreTierDiscountCategory>() // TODO FT: Add to generator
                    .AsNoTracking()
                    .Where(x => storeTierIds.Contains(x.StoreTier.Id))
                    .ProjectToType<StoreTierDiscountCategoryDTO>(Mapper.StoreTierDiscountCategoryToDTOConfig())
                    .ToListAsync();

                for (int i = 0; i < tierIds.Count; i++)
                {
                    List<StoreTierDTO> storeTierDTOForTierList = storeTierDTOList.Where(x => x.TierId == tierIds[i]).ToList();
                    List<long> storeTierIdsForTierList = storeTierDTOForTierList.Select(x => x.Id).ToList();

                    for (int j = 0; j < storeTierIdsForTierList.Count; j++)
                    {
                        storeTierDTOForTierList[j].TierClientIndex = i;

                        List<StoreTierDiscountCategoryDTO> storeTierDiscountCategoryDTOList = discountCategoryDTOList
                            .Where(x => x.StoreId == storeTierDTOForTierList[j].StoreId)
                            .Select(x =>
                            {
                                StoreTierDiscountCategoryDTO selectedStoreTierDiscountCategoryDTO = selectedStoreTierDiscountCategoryDTOList
                                    .Where(s => s.DiscountCategoryId == x.Id && s.StoreTierId == storeTierIdsForTierList[j])
                                    .SingleOrDefault();

                                return new StoreTierDiscountCategoryDTO
                                {
                                    Id = x.Id,
                                    DiscountCategoryDisplayName = x.Name,
                                    SelectedForStore = selectedStoreTierDiscountCategoryDTO != null,
                                    Discount = selectedStoreTierDiscountCategoryDTO?.Discount,
                                    DiscountCategoryId = x.Id,
                                    StoreTierId = storeTierIdsForTierList[j],
                                    TierClientIndex = i,
                                    StoreTierClientIndex = j,
                                };
                            })
                            .ToList();

                        storeTierDiscountCategoryResultDTOList = storeTierDiscountCategoryResultDTOList.Concat(storeTierDiscountCategoryDTOList).ToList();
                    }
                }

                tierSaveBodyDTO.TierDTOList = tierDTOList;
                tierSaveBodyDTO.StoreTierDTOList = storeTierDTOList;
                tierSaveBodyDTO.StoreTierDiscountCategoryDTOList = storeTierDiscountCategoryResultDTOList;
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
                    .Include(x => x.StoreTiers)
                        .ThenInclude(x => x.Store)
                    .Include(x => x.StoreTiers)
                        .ThenInclude(x => x.StoreTierDiscountCategories)
                            .ThenInclude(x => x.DiscountCategory)
                    .Include(x => x.Partner)
                    .OrderByDescending(x => x.ValidFrom), false);

                foreach (Tier tier in tierList)
                {
                    TierDTO tierDTO = tier.Adapt<TierDTO>(Mapper.TierToDTOConfig());
                    tierDTO.StoreTiersDTOList = new List<StoreTierDTO>();

                    foreach (StoreTier storeTier in tier.StoreTiers.OrderBy(x => x.OrderNumber))
                    {
                        StoreTierDTO storeTierDTO = storeTier.Adapt<StoreTierDTO>(Mapper.StoreTierToDTOConfig());
                        storeTierDTO.StoreTierDiscountCategoriesDTOList = new List<StoreTierDiscountCategoryDTO>();

                        foreach (StoreTierDiscountCategory storeTierDiscountCategory in storeTier.StoreTierDiscountCategories)
                        {
                            StoreTierDiscountCategoryDTO storeTierDiscountCategoryDTO = storeTierDiscountCategory.Adapt<StoreTierDiscountCategoryDTO>(Mapper.StoreTierDiscountCategoryToDTOConfig());
                            storeTierDTO.StoreTierDiscountCategoriesDTOList.Add(storeTierDiscountCategoryDTO);
                        }

                        tierDTO.StoreTiersDTOList.Add(storeTierDTO);
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

                partnerQuery = partnerQuery.Where(x => x.Users.Any(x => x.User.Id == currentUserId));

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
                return await _context.DbSet<Partner>().Where(x => x.Users.Any(x => x.User.Id == currentUserId)).Select(x => x.Id).ToListAsync();
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
                await _context.SaveChangesAsync();
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

        public async Task<TableResponseDTO<PartnerUserDTO>> LoadPartnerUserForPartnerNotificationListForTable(TableFilterDTO tableFilterPayload)
        {
            TableResponseDTO<PartnerUserDTO> tableResponse = new TableResponseDTO<PartnerUserDTO>();

            await _context.WithTransactionAsync(async () =>
            {
                IQueryable<PartnerUser> query = _context.DbSet<PartnerUser>()
                    .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .OrderBy(x => x.Id) // FT: It's important that OrderBy is before skip and take
                    .Skip(tableFilterPayload.First)
                    .Take(tableFilterPayload.Rows)
                    .Where(x => x.PartnerNotifications
                        .Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)); // partnerNotificationId

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
                    .Select(x => new
                    {
                        UserId = x.UsersId,
                        NotificationId = x.NotificationsId,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = nameof(NotificationUser),
                    });

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerNotificationPartnerUser>()
                    .Where(x => x.PartnerUsersId == currentPartnerUserId)
                    .Select(x => new
                    {
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

        #region Store

        /// <summary>
        /// When we need order numbers on M2M
        /// FT: The first elements of the list with StoreTierId == 0 will be used for adding new StoreTier in the list on the UI
        /// </summary>
        //public async Task<List<DiscountCategoryDTO>> LoadDiscountCategoryDTOListForCurrentPartner(List<long> storeTierIds)
        //{
        //    return await _context.WithTransactionAsync(async () =>
        //    {
        //        await SyncDiscountCategories();

        //        IQueryable<DiscountCategory> discountCategoryQuery = _context.DbSet<DiscountCategory>().Where(x => x.Store.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode());

        //        List<DiscountCategoryDTO> discountCategoryDTOList = await LoadDiscountCategoryDTOList(discountCategoryQuery, false); // 14

        //        List<DiscountCategoryDTO> discountCategoryResultDTOList = discountCategoryDTOList.ToList(); // 14

        //        List<StoreTierDiscountCategory> storeTierDiscountCategoryList = await _context.DbSet<StoreTierDiscountCategory>().AsNoTracking().Where(x => storeTierIds.Contains(x.StoreTiersId)).ToListAsync();
        //        //List<long> selectedDiscountCategoryIdsForStore = storeTierDiscountCategoryList.Select(x => x.DiscountCategoriesId).ToList();

        //        for (int i = 0; i < storeTierIds.Count; i++)
        //        {
        //            List<DiscountCategoryDTO> helper = discountCategoryDTOList.ToList(); // 14

        //            foreach (DiscountCategoryDTO discountCategoryDTO in helper)
        //            {
        //                StoreTierDiscountCategory storeDiscountCategory = storeTierDiscountCategoryList.Where(x => x.DiscountCategoriesId == discountCategoryDTO.Id && x.StoreTiersId == storeTierIds[i]).SingleOrDefault();

        //                if (storeDiscountCategory != null)
        //                {
        //                    discountCategoryDTO.SelectedForStore = true;
        //                    discountCategoryDTO.Discount = storeDiscountCategory.Discount;
        //                    discountCategoryDTO.StoreTierId = storeTierIds[i];
        //                }
        //            }

        //            discountCategoryResultDTOList = discountCategoryResultDTOList.Concat(helper).ToList(); // 20
        //        }

        //        return discountCategoryDTOList;
        //    });
        //}

        public async Task<StoreDTO> SaveStoreExtendedAsync(StoreSaveBodyDTO storeSaveBodyDTO)
        {
            DateTimeOffset? scheduledJobResult = null;
            StoreDTO savedStoreDTO = null;

            try
            {
                if ((storeSaveBodyDTO.StoreDTO.UpdatePointsInterval == null && storeSaveBodyDTO.StoreDTO.UpdatePointsStartDatetime != null) ||
                    (storeSaveBodyDTO.StoreDTO.UpdatePointsInterval != null && storeSaveBodyDTO.StoreDTO.UpdatePointsStartDatetime == null))
                    throw new BusinessException("Ako želite da ažurirate poene na određenom intervalu, morate da popunite polje interval i polje početak ažuriranja."); // TODO FT: Return message, don't throw

                DateTime now = DateTime.Now;

                // FT: We redundantly check both here and inside the ScheduleJob method, in the method due to the programming principle, and here so that they do not enter the transaction and block other threads from executing
                if (storeSaveBodyDTO.StoreDTO.UpdatePointsStartDatetime != null && storeSaveBodyDTO.StoreDTO.UpdatePointsStartDatetime.Value <= now)
                    throw new BusinessException("Vreme početka ažuriranja poena mora biti veće od sadašnjeg trenutka.");

                await _context.WithTransactionAsync(async () =>
                {
                    int currentPartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                    storeSaveBodyDTO.StoreDTO.PartnerId = currentPartnerId;

                    savedStoreDTO = await SaveStoreAndReturnDTOAsync(storeSaveBodyDTO.StoreDTO, false, false);

                    if (savedStoreDTO.UpdatePointsInterval != null && savedStoreDTO.UpdatePointsStartDatetime != null)
                        scheduledJobResult = await _updatePointsScheduler.ScheduleJob(savedStoreDTO.Id, savedStoreDTO.UpdatePointsInterval.Value, savedStoreDTO.UpdatePointsStartDatetime.Value, now);
                });

                return savedStoreDTO;
            }
            catch (Exception)
            {
                if (scheduledJobResult != null)
                    await _updatePointsScheduler.DeleteJob(storeSaveBodyDTO.StoreDTO.Id);

                throw;
            }
        }

        /// <summary>
        /// Pass fromDate only if it is the first time
        /// </summary>
        public async Task UpdatePoints(long storeId, int version, DateTime? fromDate)
        {
            await _context.WithTransactionAsync(async () =>
            {
                DateTime now = DateTime.Now;
                Store store = await LoadInstanceAsync<Store, long>(storeId, version);

                if ((store.StoreUpdatePointsScheduledTasks == null || store.StoreUpdatePointsScheduledTasks.Count == 0) && fromDate == null)
                    throw new BusinessException("Zato što prvi put ažurirate poene, morate da odredite datum od kada želite da počnete."); // TODO FT: Make better message
                else if (store.StoreUpdatePointsScheduledTasks.Count > 0 && fromDate != null)
                    throw new BusinessException("Zato što ste već jednom ažurirali poene, ne možete više da popunjavate polje od kada želite."); // TODO FT: Make better message

                int firstManualStartInterval;

                if (fromDate == null)
                {
                    firstManualStartInterval = 0;
                }
                else
                {
                    //firstManualStartInterval = (int)(now - fromDate.Value).TotalHours; // FT: If you can let the user choose only minutes on UI (without seconds), because of this (int), he will not update some data.
                    firstManualStartInterval = (int)(now - fromDate.Value).TotalMinutes;

                    if (firstManualStartInterval <= 0)
                        throw new BusinessException("Sati za koje ćete da ažurirate poene moraju da budu veći od 0.");
                }

                await _updatePointsScheduler.ScheduleJobManually(storeId, firstManualStartInterval, now);
            });
        }

        /// <summary>
        /// TODO FT: Move to Sync service
        /// </summary>
        public async Task SyncDiscountCategories()
        {
            List<DiscountCategoryDTO> discountCategoryApiDTOList = await _wingsApiService.GetDiscountCategoryDTOList();

            await _context.WithTransactionAsync(async () =>
            {
                DbSet<DiscountCategory> dbSet = _context.DbSet<DiscountCategory>();
                List<DiscountCategory> discountCategoryList = await _context.DbSet<DiscountCategory>().Where(x => x.Store.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).ToListAsync();

                foreach (DiscountCategoryDTO discountCategoryApiDTO in discountCategoryApiDTOList)
                {
                    DiscountCategoryDTOValidationRules validationRules = new DiscountCategoryDTOValidationRules();
                    validationRules.ValidateAndThrow(discountCategoryApiDTO);

                    DiscountCategory discountCategory = discountCategoryList.Where(x => x.Code == discountCategoryApiDTO.Code && x.Store.Id == discountCategoryApiDTO.StoreId).SingleOrDefault();

                    if (discountCategory == null) // Add new
                    {
                        discountCategory = discountCategoryApiDTO.Adapt<DiscountCategory>(Mapper.DiscountCategoryDTOToEntityConfig());
                        await dbSet.AddAsync(discountCategory);
                    }
                    else // Update
                    {
                        discountCategoryApiDTO.Adapt(discountCategory, Mapper.DiscountCategoryDTOToEntityConfig());
                        dbSet.Update(discountCategory);

                        discountCategoryList.Remove(discountCategory);
                    }

                    discountCategory.Store = await LoadInstanceAsync<Store, long>((long)discountCategoryApiDTO.StoreId, null);
                }

                _context.DbSet<DiscountCategory>().RemoveRange(discountCategoryList);

                await _context.SaveChangesAsync();
            });
        }

        /// <summary>
        /// Need to put validation so user can not assign any other partners discount category nor store
        /// Passing store id because when we are making new object we don't know which id it has
        /// </summary>
        //public async Task UpdateDiscountCategoryListForStoreTableClientSelection(List<StoreDiscountCategoryDTO> selectedDTOList, long storeId)
        //{
        //    if (selectedDTOList == null)
        //        return;

        //    List<StoreDiscountCategoryDTO> selectedDTOListHelper = selectedDTOList.ToList();

        //    await _context.WithTransactionAsync((Func<Task>)(async () =>
        //    {
        //        // FT: Not doing authorization here, because we can not figure out here if we are updating while inserting object (eg. User), or updating object, we will always get the id which is not 0 here.

        //        DbSet<StoreTierDiscountCategory> dbSet = _context.DbSet<StoreTierDiscountCategory>();
        //        List<StoreTierDiscountCategory> storeDiscountCategoryList = await _context.DbSet<StoreTierDiscountCategory>().Where(x => x.StoresId == storeId).ToListAsync();

        //        foreach (Business.DTO.StoreDiscountCategoryDTO selectedStoreDiscountCategoryDTO in selectedDTOListHelper)
        //        {
        //            Business.ValidationRules.StoreDiscountCategoryDTOValidationRules validationRules = new Business.ValidationRules.StoreDiscountCategoryDTOValidationRules();
        //            DefaultValidatorExtensions.ValidateAndThrow<Business.DTO.StoreDiscountCategoryDTO>(validationRules, (Business.DTO.StoreDiscountCategoryDTO)selectedStoreDiscountCategoryDTO);

        //            StoreTierDiscountCategory storeDiscountCategory = storeDiscountCategoryList.Where(x => x.DiscountCategoriesId == selectedStoreDiscountCategoryDTO.DiscountCategoriesId).SingleOrDefault();

        //            if (storeDiscountCategory == null)
        //            {
        //                storeDiscountCategory = TypeAdapter.Adapt<StoreTierDiscountCategory>(selectedStoreDiscountCategoryDTO, (TypeAdapterConfig)Mapper.StoreDiscountCategoryDTOToEntityConfig());
        //                storeDiscountCategory.StoresId = storeId;
        //                _context.DbSet<StoreTierDiscountCategory>().Add(storeDiscountCategory);
        //            }
        //            else
        //            {
        //                selectedStoreDiscountCategoryDTO.Adapt<Business.DTO.StoreDiscountCategoryDTO, StoreTierDiscountCategory>(storeDiscountCategory, (TypeAdapterConfig)Mapper.StoreDiscountCategoryDTOToEntityConfig());
        //                dbSet.Update(storeDiscountCategory);

        //                storeDiscountCategoryList.Remove(storeDiscountCategory);
        //            }
        //        }

        //        _context.DbSet<StoreTierDiscountCategory>().RemoveRange(storeDiscountCategoryList);

        //        await _context.SaveChangesAsync();
        //    }));
        //}

        /// <summary>
        /// TODO FT: Add to generator, lazy load
        /// </summary>
        //public async Task<TableResponseDTO<DiscountCategoryDTO>> LoadDiscountCategoryForStoreForTable(TableFilterDTO tableFilterPayload)
        //{
        //    TableResponseDTO<DiscountCategoryDTO> tableResponse = new TableResponseDTO<DiscountCategoryDTO>();

        //    await _context.WithTransactionAsync(async () =>
        //    {
        //        IQueryable<DiscountCategory> query = _context.DbSet<DiscountCategory>()
        //            .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
        //            .Where(x => x.Stores
        //                .Any(x => x.Id == tableFilterPayload.AdditionalFilterIdLong)); // storeId

        //        PaginationResult<DiscountCategory> paginationResult = await LoadDiscountCategoryListForPagination(tableFilterPayload, query);

        //        tableResponse.Data = await paginationResult.Query
        //            .ProjectToType<DiscountCategoryDTO>(Mapper.DiscountCategoryProjectToConfig())
        //            .ToListAsync();

        //        tableResponse.TotalRecords = tableResponse.Data.Count;
        //    });

        //    return tableResponse;
        //}

        /// <summary>
        /// TODO FT: Add to generator, client table, without additional fields in M2M
        /// </summary>
        //public async Task<List<long>> LoadSelectedDiscountCategoryIdsForStore(IQueryable<DiscountCategory> query, long storeId)
        //{
        //    return await _context.WithTransactionAsync(async () =>
        //    {
        //        List<long> ids = await query
        //            .AsNoTracking()
        //            .Where(x => x.Stores
        //                .Any(x => x.Id == storeId))
        //            .Select(x => x.Id)
        //            .ToListAsync();

        //        return ids;
        //    });
        //}

        /// <summary>
        /// TODO FT: Add to generator, client table, with additional fields in M2M
        /// </summary>
        //public async Task<List<DiscountCategoryDTO>> LoadSelectedDiscountCategoryListForStore(IQueryable<DiscountCategory> discountCategoryQuery, long storeId)
        //{
        //    return await _context.WithTransactionAsync(async () =>
        //    {
        //        List<DiscountCategoryDTO> dtoList = await discountCategoryQuery
        //            .AsNoTracking()
        //            .Where(x => x.Stores
        //                .Any(x => x.Id == storeId))
        //            .ProjectToType<DiscountCategoryDTO>(Mapper.DiscountCategoryToDTOConfig())
        //            .ToListAsync();

        //        return dtoList;
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