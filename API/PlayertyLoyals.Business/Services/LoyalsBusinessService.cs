using Spider.Shared.DTO;
using Spider.Shared.Excel;
using Spider.Shared.Interfaces;
using Spider.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.Entities;
using Spider.Security.Services;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Enums;
using Spider.Shared.Exceptions;
using Mapster;
using Spider.Security.DTO;
using PlayertyLoyals.Business.DataMappers;
using FluentValidation;
using Spider.Shared.Emailing;
using Azure.Storage.Blobs;
using PlayertyLoyals.Business.BackroundJobs;
using Spider.Shared.Helpers;
using PlayertyLoyals.Business.ValidationRules;
using PlayertyLoyals.Business.DTO.Helpers;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using Serilog.Events;
using System.Text;

namespace PlayertyLoyals.Business.Services
{
    public class LoyalsBusinessService : PlayertyLoyals.Business.Services.BusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly PlayertyLoyals.Business.Services.AuthorizationBusinessService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly EmailingService _emailingService;
        private readonly BlobContainerClient _blobContainerClient;
        private readonly WingsApiService _wingsApiService;

        public LoyalsBusinessService(
            IApplicationDbContext context,
            ExcelService excelService,
            PlayertyLoyals.Business.Services.AuthorizationBusinessService authorizationService,
            SecurityBusinessService<UserExtended> securityBusinessService,
            AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService,
            EmailingService emailingService,
            BlobContainerClient blobContainerClient,
            WingsApiService wingsApiService
        )
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
        }

        #region User

        /// <summary>
        /// FT: IsDisabled is handled inside authorization service
        /// </summary>
        protected override async Task OnBeforeSaveUserExtendedAndReturnSaveBodyDTO(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id <= 0)
                    throw new HackerException("You can't add new user.");

                UserExtended userExtended = await GetInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != userExtended.Email ||
                    userExtendedSaveBodyDTO.UserExtendedDTO.HasLoggedInWithExternalProvider != userExtended.HasLoggedInWithExternalProvider
                //userExtendedSaveBodyDTO.UserExtendedDTO.AccessedTheSystem != userExtended.AccessedTheSystem
                )
                {
                    throw new HackerException("You can't change Email, HasLoggedInWithExternalProvider nor AccessedTheSystem from the main UI form.");
                }
            });
        }

        public async Task OnAfterRegister(AuthResultDTO authResultDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await AddPartnerUserAfterAuthResult(authResultDTO);
            });
        }

        public async Task OnAfterLogin(AuthResultDTO authResultDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await AddPartnerUserAfterAuthResult(authResultDTO);
            });
        }

        public async Task OnAfterLoginExternal(AuthResultDTO authResultDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await AddPartnerUserAfterAuthResult(authResultDTO);
            });
        }

        #endregion

        #region Notification

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(BusinessPermissionCodes.UpdateNotification);

                // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                List<string> recipients = notification.Recipients.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        #endregion

        #region Tier

        public override async Task<TierSaveBodyDTO> SaveTierAndReturnSaveBodyDTO(TierSaveBodyDTO tierSaveBodyDTO, bool authorizeUpdate, bool authorizeInsert)
        {
            List<int> exceptionHelper = new();

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

            List<TierDTO> tierResultDTOList = new();
            List<BusinessSystemTierDTO> businessSystemTierResultDTOList = new();

            await _context.WithTransactionAsync(async () =>
            {
                int currentPartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();

                List<int> tierIdsDTO = tierSaveBodyDTO.TierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed tiers
                List<int> tierIdsToDelete = _context.DbSet<Tier>().Where(x => x.Partner.Id == currentPartnerId && tierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                if (tierIdsToDelete.Count > 0)
                    await DeleteTierList(tierIdsToDelete, true);

                List<long> businessSystemTierIdsDTO = tierSaveBodyDTO.BusinessSystemTierDTOList.Select(x => x.Id).ToList(); // TODO FT: Check if user is authorized to delete passed businessSystem tiers
                List<long> businessSystemTierIdsToDelete = _context.DbSet<BusinessSystemTier>().Where(x => tierIdsDTO.Contains(x.Tier.Id) && businessSystemTierIdsDTO.Contains(x.Id) == false).Select(x => x.Id).ToList();
                if (businessSystemTierIdsToDelete.Count > 0)
                {
                    await _authorizationService.AuthorizeTierDeleteAndThrow();
                    await DeleteBusinessSystemTierList(businessSystemTierIdsToDelete, false);
                }

                for (int i = 0; i < tierSaveBodyDTO.TierDTOList.Count; i++)
                {
                    TierDTO tierDTO = tierSaveBodyDTO.TierDTOList[i];
                    tierDTO.PartnerId = currentPartnerId;
                    TierDTO savedTierDTO = await SaveTierAndReturnDTO(tierDTO, authorizeUpdate, authorizeInsert);
                    tierResultDTOList.Add(savedTierDTO);

                    List<BusinessSystemTierDTO> businessSystemTierDTOList = tierSaveBodyDTO.BusinessSystemTierDTOList.Where(x => x.TierClientIndex == i).ToList();
                    for (int j = 0; j < businessSystemTierDTOList.Count; j++)
                    {
                        BusinessSystemTierDTO businessSystemTierDTO = businessSystemTierDTOList[j];
                        businessSystemTierDTO.TierId = savedTierDTO.Id;
                        businessSystemTierDTO.OrderNumber = j + 1;
                        BusinessSystemTierDTO savedBusinessSystemTierDTO = await SaveBusinessSystemTierAndReturnDTO(businessSystemTierDTO, false, false);
                        savedBusinessSystemTierDTO.TierClientIndex = i;
                        businessSystemTierResultDTOList.Add(savedBusinessSystemTierDTO);

                        List<BusinessSystemTierDiscountProductGroupDTO> businessSystemTierDiscountProductGroupDTOList = tierSaveBodyDTO.BusinessSystemTierDiscountProductGroupDTOList
                            .Where(x => x.SelectedForBusinessSystem == true && x.TierClientIndex == i && x.BusinessSystemTierClientIndex == j)
                            .ToList();
                        await UpdateDiscountProductGroupListForBusinessSystemTier(savedBusinessSystemTierDTO.Id, businessSystemTierDiscountProductGroupDTOList);
                    }
                }

                await UpdatePartnerUsersTiers();
            });

            tierSaveBodyDTO.TierDTOList = tierResultDTOList;
            tierSaveBodyDTO.BusinessSystemTierDTOList = businessSystemTierResultDTOList;

            return tierSaveBodyDTO;
        }

        /// <summary>
        /// FT: Updating tiers when tiers changed
        /// </summary>
        private async Task UpdatePartnerUsersTiers()
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

        private async Task UpdatePartnerUserTier(PartnerUser partnerUser)
        {
            await _context.WithTransactionAsync(async () =>
            {
                int points = partnerUser.Points;
                Tier tier = await GetTierForThePoints(points);

                if (tier == null)
                {
                    var _ = partnerUser.Tier; // HACK
                }

                partnerUser.Tier = tier;
            });
        }

        private async Task<Tier> GetTierForThePoints(int points)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                Tier tier = await _context.DbSet<Tier>()
                    .Where(x =>
                        points >= x.ValidFrom &&
                        points < x.ValidTo &&
                        x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()
                    )
                    .SingleOrDefaultAsync();

                if (tier == null)
                {
                    tier = await _context.DbSet<Tier>()
                    .Where(x =>
                        points >= x.ValidTo &&
                        x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()
                    )
                    .OrderByDescending(x => x.ValidTo)
                    .FirstOrDefaultAsync();
                }

                return tier;
            });
        }

        public async Task<TierSaveBodyDTO> GetTierSaveBodyDTOForCurrentPartner()
        {
            TierSaveBodyDTO tierSaveBodyDTO = new();

            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeTierReadAndThrow();

                List<TierDTO> tierDTOList = await GetTierDTOList(
                    _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom),
                    false
                );
                List<int> tierIds = tierDTOList.Select(x => x.Id).ToList();

                List<BusinessSystemTierDTO> businessSystemTierDTOList = await GetBusinessSystemTierDTOList(
                    _context.DbSet<BusinessSystemTier>().Where(x => tierIds.Contains(x.Tier.Id)).OrderBy(x => x.OrderNumber),
                    false
                );
                List<long> businessSystemTierIds = businessSystemTierDTOList.Select(x => x.Id).ToList();

                List<DiscountProductGroupDTO> discountCategoryDTOList = await GetDiscountProductGroupDTOList(
                    _context.DbSet<DiscountProductGroup>()
                        .Where(x => x.BusinessSystem.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                        .OrderBy(x => x.OrderNumber),
                    false
                );
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

        public async Task<List<TierDTO>> GetTierListForDisplay()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                List<TierDTO> tierDTOList = new();

                List<Tier> tierList = await GetTierList(
                    _context.DbSet<Tier>()
                        .AsNoTracking()
                        .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                        .Include(x => x.BusinessSystemTiers)
                            .ThenInclude(x => x.BusinessSystem)
                        .Include(x => x.BusinessSystemTiers)
                            .ThenInclude(x => x.BusinessSystemTierDiscountProductGroups)
                                .ThenInclude(x => x.DiscountProductGroup)
                        .Include(x => x.Partner)
                        .OrderBy(x => x.ValidFrom),
                    false
                );

                foreach (Tier tier in tierList)
                {
                    TierDTO tierDTO = tier.Adapt<TierDTO>(Mapper.TierToDTOConfig());
                    tierDTO.BusinessSystemTiersDTOList = new List<BusinessSystemTierDTO>();

                    foreach (BusinessSystemTier businessSystemTier in tier.BusinessSystemTiers.OrderBy(x => x.OrderNumber))
                    {
                        BusinessSystemTierDTO businessSystemTierDTO = businessSystemTier.Adapt<BusinessSystemTierDTO>(Mapper.BusinessSystemTierToDTOConfig());
                        businessSystemTierDTO.BusinessSystemTierDiscountProductGroupsDTOList = new List<BusinessSystemTierDiscountProductGroupDTO>();

                        foreach (BusinessSystemTierDiscountProductGroup businessSystemTierDiscountProductGroup in businessSystemTier.BusinessSystemTierDiscountProductGroups.OrderBy(x => x.DiscountProductGroup.OrderNumber))
                        {
                            BusinessSystemTierDiscountProductGroupDTO businessSystemTierDiscountProductGroupDTO = businessSystemTierDiscountProductGroup.Adapt<BusinessSystemTierDiscountProductGroupDTO>(Mapper.BusinessSystemTierDiscountProductGroupToDTOConfig());
                            businessSystemTierDTO.BusinessSystemTierDiscountProductGroupsDTOList.Add(businessSystemTierDiscountProductGroupDTO);
                        }

                        tierDTO.BusinessSystemTiersDTOList.Add(businessSystemTierDTO);
                    }

                    tierDTOList.Add(tierDTO);
                }

                return tierDTOList;
            });
        }

        public async Task<TierDTO> GetTierDTOForPartnerUser(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizePartnerUserReadAndThrow(partnerUserId);

                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Id == partnerUserId)
                    .Select(x => x.Tier)
                    .ProjectToType<TierDTO>(Mapper.TierProjectToConfig())
                    .SingleOrDefaultAsync();
            });
        }

        #endregion

        #region Partner

        /// <summary>
        /// TODO FT: Add this to generator (you will need to add one more custom attribute [Code])
        /// </summary>
        public async Task<List<CodebookDTO>> GetPartnerWithSlugAutocompleteList(int limit, string filter, IQueryable<Partner> query)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                query = query.Where(x => x.PartnerUsers.Any(x => x.User.Id == currentUserId));

                if (!string.IsNullOrEmpty(filter))
                    query = query.Where(x => x.Name.Contains(filter));

                return await query
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
                await _authorizationService.AuthorizeUserExtendedReadAndThrow(userId);

                return await _context.DbSet<PartnerUser>().AsNoTracking()
                    .Where(x => x.User.Id == userId && x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig())
                    .SingleOrDefaultAsync();
            });
        }

        public async Task AddPartnerUserAfterAuthResult(AuthResultDTO authResultDTO)
        {
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                if (currentPartnerSlug != null)
                {
                    PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Id == authResultDTO.UserId && x.Partner.Slug == currentPartnerSlug).SingleOrDefaultAsync();

                    if (partnerUser == null)
                    {
                        Partner currentPartner = await _context.DbSet<Partner>().Where(x => x.Slug == currentPartnerSlug).SingleAsync();
                        UserExtended user = await GetInstanceAsync<UserExtended, long>(authResultDTO.UserId, null);
                        await AddPartnerUser(partnerUser, user, currentPartner);
                    }
                }
            });
        }

        public async Task AddPartnerUserForTheCurrentUser(int partnerId)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            await _context.WithTransactionAsync(async () =>
            {
                PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Id == currentUserId && x.Partner.Id == partnerId).SingleOrDefaultAsync();

                if (partnerUser == null)
                {
                    Partner partner = await GetInstanceAsync<Partner, int>(partnerId, null);
                    UserExtended currentUser = await GetInstanceAsync<UserExtended, long>(currentUserId, null);
                    await AddPartnerUser(partnerUser, currentUser, partner);
                }
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

        public override async Task<PartnerUserSaveBodyDTO> SavePartnerUserAndReturnSaveBodyDTO(PartnerUserSaveBodyDTO partnerUserSaveBodyDTO, bool authorizeUpdate, bool authorizeInsert)
        {
            if (partnerUserSaveBodyDTO.PartnerUserDTO.Id == 0)
                throw new HackerException("You can't add new partner user.");

            return await _context.WithTransactionAsync(async () =>
            {
                await ValidateExistingPartnerUserAndThrow(partnerUserSaveBodyDTO.PartnerUserDTO);

                await UpdateCheckedSegmentationItemsForPartnerUser(partnerUserSaveBodyDTO.PartnerUserDTO.Id, partnerUserSaveBodyDTO.SelectedSegmentationItemsIds);

                int pointsBeforeSave = await _context.DbSet<PartnerUser>().Where(x => x.Id == partnerUserSaveBodyDTO.PartnerUserDTO.Id).Select(x => x.Points).SingleAsync();

                PartnerUser savedPartnerUser = await SavePartnerUser(partnerUserSaveBodyDTO.PartnerUserDTO, authorizeUpdate, authorizeInsert); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI

                await UpdateFirstTimeFilledPointsForThePartnerUser(savedPartnerUser, partnerUserSaveBodyDTO.SelectedSegmentationItemsIds);

                // FT: We don't need to authorize, we will authorize everything in SavePartnerUser method
                await UpdateBirthDateAndGenderForUser(partnerUserSaveBodyDTO.PartnerUserDTO.UserId.Value, partnerUserSaveBodyDTO.BirthDate, partnerUserSaveBodyDTO.GenderId);

                if (pointsBeforeSave != savedPartnerUser.Points)
                {
                    await UpdatePartnerUserTier(savedPartnerUser);
                    await _context.SaveChangesAsync();
                }

                return new PartnerUserSaveBodyDTO
                {
                    PartnerUserDTO = savedPartnerUser.Adapt<PartnerUserDTO>(Mapper.PartnerUserToDTOConfig()),
                };
            });
        }

        private async Task ValidateExistingPartnerUserAndThrow(PartnerUserDTO partnerUserDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                PartnerUser partnerUser = await GetInstanceAsync<PartnerUser, long>(partnerUserDTO.Id, partnerUserDTO.Version);

                // FT: Noone can change these from the partner user page
                if (partnerUser.Tier?.Id != partnerUserDTO.TierId ||
                    partnerUser.User.Id != partnerUserDTO.UserId ||
                    partnerUser.Partner.Id != partnerUserDTO.PartnerId
                )
                {
                    throw new UnauthorizedException();
                }
            });
        }

        private async Task UpdateBirthDateAndGenderForUser(long userExtendedId, DateTime? birthDate, int? genderId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                UserExtended userExtended = await GetInstanceAsync<UserExtended, long>(userExtendedId, null);

                userExtended.BirthDate = birthDate;

                if (genderId > 0)
                {
                    userExtended.Gender = await GetInstanceAsync<Gender, int>(genderId.Value);
                }
                else
                {
                    var _ = userExtended.Gender; // FT HACK: https://github.com/dotnet/efcore/issues/14086
                    userExtended.Gender = null;
                }

                await _context.SaveChangesAsync();
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
        private async Task UpdatePointsForThePartnerUser(PartnerUser partnerUser, int pointsToAdd)
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
                List<string> currentPartnerUserPermissionCodes = await _partnerUserAuthenticationService.GetCurrentPartnerUserPermissionCodes();
                List<string> currentUserPermissionCodes = await _authorizationService.GetCurrentUserPermissionCodes<UserExtended>();

                return currentUserPermissionCodes.Concat(currentPartnerUserPermissionCodes).ToList();
            });
        }

        public async Task<List<long>> GetCheckedSegmentationItemIdsForThePartnerUser(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizePartnerUserReadAndThrow(partnerUserId);

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
                await _authorizationService.AuthorizePartnerUserReadAndThrow(partnerUserId);

                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Id == partnerUserId)
                    .SelectMany(x => x.AlreadyFilledSegmentations)
                    .Select(x => x.Id)
                    .ToListAsync();
            });
        }

        public async Task<TableResponseDTO<TransactionDTO>> GetTransactionListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            return await _context.WithTransactionAsync(async () =>
            {
                TableResponseDTO<TransactionDTO> transactionTableResponse = await GetTransactionTableData(
                    tableFilterDTO,
                    _context.DbSet<Transaction>().Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug).OrderByDescending(x => x.Id),
                    false
                );

                return transactionTableResponse;
            });
        }

        public async Task<TierDTO> GetTierDTOForCurrentPartnerUser()
        {
            string partnerCode = _partnerUserAuthenticationService.GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                int? tierId = await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .Select(x => (int?)x.Tier.Id) // FT: Nullable object must have a value, if we don't add (int?)
                    .SingleOrDefaultAsync();

                if (tierId == null)
                    return null;

                return await GetTierDTO(tierId.Value, false);
            });
        }

        public async Task<GenderAndBirthDateDTO> GetPartnerUserGenderAndBirthDateDTO(long partnerUserId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizePartnerUserReadAndThrow(partnerUserId);

                return await _context.DbSet<PartnerUser>()
                    .Where(x => x.Id == partnerUserId)
                    .Select(x => new GenderAndBirthDateDTO
                    {
                        BirthDate = x.User.BirthDate,
                        GenderId = x.User.Gender.Id
                    })
                    .SingleAsync();
            });
        }

        #endregion

        #region PartnerRole

        protected override async Task OnBeforeSavePartnerRoleAndReturnSaveBodyDTO(PartnerRoleSaveBodyDTO partnerRoleSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                // FT: There is no need to validate PartnerId changes because we are reading it from the server
                partnerRoleSaveBodyDTO.PartnerRoleDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
            });
        }

        #endregion

        #region PartnerNotification

        protected override async Task OnBeforeSavePartnerNotificationAndReturnSaveBodyDTO(PartnerNotificationSaveBodyDTO partnerNotificationSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                // FT: There is no need to validate PartnerId changes because we are reading it from the server
                partnerNotificationSaveBodyDTO.PartnerNotificationDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
            });
        }

        protected override async Task<IQueryable<PartnerUser>> GetAllRecipientsQueryForPartnerNotification(IQueryable<PartnerUser> query)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                int currentPartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
                return query.Where(x => x.Partner.Id == currentPartnerId);
            });
        }

        public async Task SendPartnerNotificationEmail(long partnerNotificationId, int partnerNotificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizePartnerNotificationUpdateAndThrow(null);

                // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                PartnerNotification partnerNotification = await GetInstanceAsync<PartnerNotification, long>(partnerNotificationId, partnerNotificationVersion);

                List<string> recipients = partnerNotification.Recipients.Select(x => x.User.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, partnerNotification.Title, partnerNotification.EmailBody);
            });
        }

        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            TableResponseDTO<NotificationDTO> result = new TableResponseDTO<NotificationDTO>();
            long currentUserId = _authenticationService.GetCurrentUserId(); // FT: Not doing user.Notifications, because he could have a lot of them.
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                //long currentPartnerUserId = await _partnerUserAuthenticationService.GetCurrentPartnerUserId();

                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId)
                    .Select(x => new
                    {
                        UserId = x.User.Id,
                        NotificationId = x.Notification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = NotificationDiscriminatorCodes.Notification,
                    });

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug)
                    .Select(x => new
                    {
                        UserId = x.PartnerUser.Id,
                        NotificationId = x.PartnerNotification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                        Discriminator = NotificationDiscriminatorCodes.PartnerNotification,
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

                    if (item.Discriminator == NotificationDiscriminatorCodes.Notification)
                    {
                        Notification notification = await GetInstanceAsync<Notification, long>(item.NotificationId, null);
                        notificationDTO.Id = notification.Id;
                        notificationDTO.Version = notification.Version;
                        notificationDTO.Title = notification.Title;
                        notificationDTO.Description = notification.Description;
                        notificationDTO.CreatedAt = notification.CreatedAt;
                    }
                    else if (item.Discriminator == NotificationDiscriminatorCodes.PartnerNotification)
                    {
                        PartnerNotification partnerNotification = await GetInstanceAsync<PartnerNotification, long>(item.NotificationId, null);
                        notificationDTO.Id = partnerNotification.Id;
                        notificationDTO.Version = partnerNotification.Version;
                        notificationDTO.Title = partnerNotification.Title;
                        notificationDTO.Description = partnerNotification.Description;
                        notificationDTO.CreatedAt = partnerNotification.CreatedAt;
                    }

                    notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;
                    notificationDTO.Discriminator = item.Discriminator; // FT: Using it on the frontend also

                    notificationsDTO.Add(notificationDTO);
                }

                notificationsDTO = notificationsDTO.OrderByDescending(x => x.CreatedAt).ToList();

                result.Data = notificationsDTO;
                result.TotalRecords = count;
            });

            return result;
        }

        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            return await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                var partnerNotificationPartnerUsersQuery = _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync() + await partnerNotificationPartnerUsersQuery.CountAsync();

                return count;
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task DeletePartnerNotificationForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                PartnerNotification partnerNotification = await GetInstanceAsync<PartnerNotification, long>(partnerNotificationId, partnerNotificationVersion);

                await _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug && x.PartnerNotification.Id == partnerNotification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkPartnerNotificationAsReadForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                PartnerNotification partnerNotification = await GetInstanceAsync<PartnerNotification, long>(partnerNotificationId, partnerNotificationVersion);

                await _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug && x.PartnerNotification.Id == partnerNotification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkPartnerNotificationAsUnreadForCurrentPartnerUser(long partnerNotificationId, int partnerNotificationVersion)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                PartnerNotification partnerNotification = await GetInstanceAsync<PartnerNotification, long>(partnerNotificationId, partnerNotificationVersion);

                await _context.DbSet<PartnerUserPartnerNotification>()
                    .Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug && x.PartnerNotification.Id == partnerNotification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        #endregion

        #region Segmentation

        protected override async Task OnBeforeSaveSegmentationAndReturnSaveBodyDTO(SegmentationSaveBodyDTO segmentationSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                // FT: There is no need to validate PartnerId changes because we are reading it from the server
                segmentationSaveBodyDTO.SegmentationDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();
            });
        }

        /// <summary>
        /// The information is available as soon as you register, there is no need for further authorization
        /// </summary>
        public async Task<List<SegmentationDTO>> GetSegmentationListForTheCurrentPartner()
        {
            List<SegmentationDTO> segmentationDTOList = new();

            await _context.WithTransactionAsync(async () =>
            {
                List<Segmentation> segmentations = await _context.DbSet<Segmentation>()
                    .AsNoTracking()
                    .Include(x => x.Partner)
                    .Include(x => x.SegmentationItems)
                    .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .OrderBy(x => x.Id)
                    .ToListAsync();

                foreach (Segmentation segmentation in segmentations)
                {
                    SegmentationDTO segmentationDTO = segmentation.Adapt<SegmentationDTO>(Mapper.SegmentationToDTOConfig());
                    segmentationDTO.SegmentationItemsDTOList = new List<SegmentationItemDTO>();

                    foreach (SegmentationItem segmentationItem in segmentation.SegmentationItems.OrderBy(x => x.OrderNumber))
                    {
                        SegmentationItemDTO segmentationItemDTO = segmentationItem.Adapt<SegmentationItemDTO>(Mapper.SegmentationItemToDTOConfig());
                        segmentationDTO.SegmentationItemsDTOList.Add(segmentationItemDTO);
                    }

                    segmentationDTOList.Add(segmentationDTO);
                }
            });

            return segmentationDTOList;
        }

        #endregion

        #region BusinessSystem

        public override async Task<BusinessSystemSaveBodyDTO> SaveBusinessSystemAndReturnSaveBodyDTO(BusinessSystemSaveBodyDTO businessSystemSaveBodyDTO, bool authorizeUpdate, bool authorizeInsert)
        {
            ValidateNewBusinessSystemAndThrow(businessSystemSaveBodyDTO.BusinessSystemDTO);

            return await _context.WithTransactionAsync(async () =>
            {
                if (businessSystemSaveBodyDTO.BusinessSystemDTO.Id > 0)
                    await ValidateExistingBusinessSystemAndThrow(businessSystemSaveBodyDTO.BusinessSystemDTO);

                // FT: There is no need to validate PartnerId changes because we are reading it from the server
                businessSystemSaveBodyDTO.BusinessSystemDTO.PartnerId = await _partnerUserAuthenticationService.GetCurrentPartnerId();

                BusinessSystemDTO savedBusinessSystemDTO = await SaveBusinessSystemAndReturnDTO(businessSystemSaveBodyDTO.BusinessSystemDTO, authorizeUpdate, authorizeInsert);

                List<DiscountProductGroupDTO> savedDiscountProductGroupsDTO = await UpdateOrderedDiscountProductGroupsForBusinessSystem(savedBusinessSystemDTO.Id, businessSystemSaveBodyDTO.DiscountProductGroupsDTO);

                return new BusinessSystemSaveBodyDTO
                {
                    BusinessSystemDTO = savedBusinessSystemDTO,
                    DiscountProductGroupsDTO = savedDiscountProductGroupsDTO,
                };
            });
        }

        private static void ValidateNewBusinessSystemAndThrow(BusinessSystemDTO businessSystemDTO)
        {
            if (
                businessSystemDTO.Id == 0 &&
               (
                businessSystemDTO.UpdatePointsInterval != null ||
                businessSystemDTO.UpdatePointsStartDate != null ||
                businessSystemDTO.UpdatePointsScheduledTaskIsPaused != null
               )
            )
            {
                throw new HackerException("Can't save UpdatePointsInterval nor UpdatePointsStartDate from here.");
            }
        }

        private async Task ValidateExistingBusinessSystemAndThrow(BusinessSystemDTO businessSystemDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                BusinessSystem businessSystemBeforeSave = await GetInstanceAsync<BusinessSystem, long>(businessSystemDTO.Id, businessSystemDTO.Version);

                if (
                    businessSystemBeforeSave.UpdatePointsInterval != businessSystemDTO.UpdatePointsInterval ||
                    Helper.AreDatesEqualToSeconds(businessSystemBeforeSave.UpdatePointsStartDate, businessSystemDTO.UpdatePointsStartDate) == false ||
                    businessSystemBeforeSave.UpdatePointsScheduledTaskIsPaused != businessSystemDTO.UpdatePointsScheduledTaskIsPaused
                )
                {
                    throw new HackerException("Can't save UpdatePointsInterval, UpdatePointsStartDate nor UpdatePointsScheduledTaskIsPaused from the main UI form page.");
                }
            });
        }

        public async Task<InfoAndWarningResultDTO> ExcelUpdatePointsForWings(ExcelUpdatePointsDTO excelUpdatePointsDTO)
        {
            new ExcelUpdatePointsDTOValidationRules().ValidateAndThrow(excelUpdatePointsDTO);

            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemUpdateAndThrow(null);

                ExternalTransactionsExcelParsingResultDTO externalTransactionsExcelParsingResultDTO = GetExternalTransactionsFromExcelsForWings(excelUpdatePointsDTO.Excels);

                await ProccessTransactions(excelUpdatePointsDTO.BusinessSystemId.Value, externalTransactionsExcelParsingResultDTO.ExternalTransactionDTOList);

                return externalTransactionsExcelParsingResultDTO.WarningAndInfoResultDTO;
            });
        }

        private ExternalTransactionsExcelParsingResultDTO GetExternalTransactionsFromExcelsForWings(List<IFormFile> excels)
        {
            if (excels == null || excels.Count == 0)
                throw new ArgumentException("You need to provide at least one excel file.");

            List<ExternalTransactionDTO> externalTransactions = new();
            List<string> exceptions = new();
            List<string> infos = new();
            List<string> warnings = new();
            int processedTransactionsCount = 0;

            foreach (IFormFile excel in excels)
            {
                using (MemoryStream stream = new MemoryStream())
                {
                    excel.CopyTo(stream);
                    stream.Position = 0;

                    using (ExcelPackage package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();

                        if (worksheet == null)
                            throw new InvalidOperationException("The Excel file does not contain any worksheets.");

                        int row = SettingsProvider.Current.WingsStartingRow;

                        while (true)
                        {
                            List<string> rowExceptions = new();
                            List<string> rowWarnings = new();

                            string transactionId = worksheet.Cells[row, 4].Text;
                            if (string.IsNullOrWhiteSpace(transactionId))
                            {
                                infos.Add($"Excel '{excel.FileName}' je obrađen do {row}. reda.");
                                break;
                            }

                            string priceText = worksheet.Cells[row, 6].Text;
                            if (decimal.TryParse(priceText, out decimal price) == false)
                                rowExceptions.Add($"Greška: Prazno polje 'F{row}'.");


                            string boughtAtText = worksheet.Cells[row, 7].Text;
                            if (DateTime.TryParse(boughtAtText, out DateTime boughtAt) == false)
                                rowExceptions.Add($"Greška: Prazno polje 'G{row}'.");

                            string userEmail = worksheet.Cells[row, 10].Text;
                            if (string.IsNullOrEmpty(userEmail))
                                rowWarnings.Add($"Upozorenje: Prazno polje J{row}, transakcija preskočena."); // It's not exception because user can buy, but don't want to give email address for loyalty

                            if (rowExceptions.Count == 0 && rowWarnings.Count == 0)
                            {
                                externalTransactions.Add(new ExternalTransactionDTO
                                {
                                    BoughtAt = boughtAt,
                                    Code = transactionId,
                                    Price = price,
                                    UserEmail = userEmail
                                });
                            }

                            exceptions.AddRange(rowExceptions);
                            warnings.AddRange(rowWarnings);

                            processedTransactionsCount++;
                            row++;
                        }
                    }
                }
            }

            if (exceptions.Count > 0)
                throw new BusinessException(string.Join("\n", exceptions));

            return new ExternalTransactionsExcelParsingResultDTO
            {
                ExternalTransactionDTOList = externalTransactions,
                WarningAndInfoResultDTO = new InfoAndWarningResultDTO
                {
                    // FT: These infos are for excel parsing, more detailed stats is sent to the email
                    Info = $"Obrađenih transakcija: {processedTransactionsCount}.\n\n{string.Join("\n", infos)}",
                    Warning = string.Join("\n", warnings),
                }
            };
        }

        private async Task ProccessTransactions(long businessSystemId, List<ExternalTransactionDTO> externalTransactionDTOList)
        {
            await _context.WithTransactionAsync(async () =>
            {
                BusinessSystem businessSystem = await GetInstanceAsync<BusinessSystem, long>(businessSystemId, null);

                BusinessSystemUpdatePointsScheduledTask businessSystemUpdatePointsScheduledTaskForSave = new BusinessSystemUpdatePointsScheduledTask
                {
                    TransactionsFrom = null,
                    TransactionsTo = null,
                    BusinessSystem = businessSystem,
                    IsManual = true,
                };

                await _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().AddAsync(businessSystemUpdatePointsScheduledTaskForSave);
                await _context.SaveChangesAsync();

                TransactionsProcessingResult transactionsProcessingResult = await ProcessTransactionsAndReturnResult(businessSystemUpdatePointsScheduledTaskForSave, externalTransactionDTOList);
                await NotifyPartnerAboutSuccessfullyProcessedTransactions(businessSystem.Partner, transactionsProcessingResult, null, null);
            });
        }

        private async Task NotifyPartnerAboutSuccessfullyProcessedTransactions(
            Partner partner, TransactionsProcessingResult transactionsProcessingResult, DateTime? processedTransactionsFrom, DateTime? processedTransactionsTo
        )
        {
            string successMessage = GetSuccessMessageForProcessedTransactions(transactionsProcessingResult, processedTransactionsFrom, processedTransactionsTo);

            await _emailingService.SendEmailAsync(partner.Email, "Uspešno izvršeno ažuriranje bodova", successMessage);
        }

        private static string GetSuccessMessageForProcessedTransactions(
            TransactionsProcessingResult transactionsProcessingResult, DateTime? processedTransactionsFrom, DateTime? processedTransactionsTo
        )
        {
            return $$"""
Interval u kom su obrađene transakcije: {{(processedTransactionsFrom?.ToString("dd.MM.yyyy. HH:mm") ?? "?")}} - {{(processedTransactionsTo?.ToString("dd.MM.yyyy. HH:mm") ?? "?")}}. <br>
<br>
Ukupan broj obrađenih transakcija: {{transactionsProcessingResult.TotalProcessedTransactionsCount}}. <br>
<br>
Uspešno obrađene transakcije ({{transactionsProcessingResult.TransactionWhichUpdateSucceededList.Count}}): <br>
{{string.Join("", transactionsProcessingResult.TransactionWhichUpdateSucceededList.Select(x => $"    {x}<br>"))}}
<br>
Neuspešno obrađene transakcije ({{transactionsProcessingResult.TransactionWhichUpdateFailedList.Count}}): <br>
{{string.Join("", transactionsProcessingResult.TransactionWhichUpdateFailedList.Select(x => $"    {x}<br>"))}}
<br>
Već obrađene transakcije u prosleđenom periodu ({{transactionsProcessingResult.TransactionWhichWeAlreadyUpdatedForThisPeriodList.Count}}): <br>
{{string.Join("", transactionsProcessingResult.TransactionWhichWeAlreadyUpdatedForThisPeriodList.Select(x => $"    {x}<br>"))}}
<br>
Korisnici kojima nismo uspeli da ažuriramo bodove, jer ne postoje u 'loyalty program' sistemu ({{transactionsProcessingResult.PartnerUserWhichDoesNotExistList.Count}}): <br>
{{string.Join("", transactionsProcessingResult.PartnerUserWhichDoesNotExistList.Select(x => $"    {x}<br>"))}}
<br>
""";
        }

        private async Task<TransactionsProcessingResult> ProcessTransactionsAndReturnResult(
            BusinessSystemUpdatePointsScheduledTask savedBusinessSystemUpdatePointsScheduledTask,
            List<ExternalTransactionDTO> externalTransactionDTOList
        )
        {
            List<string> partnerUserWhichDoesNotExistList = new();
            List<string> transactionWhichUpdateSucceededList = new();
            List<string> transactionWhichWeAlreadyUpdatedForThisPeriodList = new();
            List<string> userEmailList = externalTransactionDTOList.Select(x => x.UserEmail).ToList();

            return await _context.WithTransactionAsync(async () =>
            {
                List<PartnerUser> partnerUserList = await _context.DbSet<PartnerUser>()
                    .Include(x => x.User)
                    .Where(x => x.Partner.Id == savedBusinessSystemUpdatePointsScheduledTask.BusinessSystem.Partner.Id && userEmailList.Contains(x.User.Email))
                    .ToListAsync();

                foreach (ExternalTransactionDTO externalTransactionDTO in externalTransactionDTOList)
                {
                    if (await _context.DbSet<Transaction>().AnyAsync(x =>
                        x.BusinessSystemUpdatePointsScheduledTask.BusinessSystem.Id == savedBusinessSystemUpdatePointsScheduledTask.BusinessSystem.Id &&
                        x.Code == externalTransactionDTO.Code)
                    )
                    {
                        transactionWhichWeAlreadyUpdatedForThisPeriodList.Add($"{externalTransactionDTO.Code} ({externalTransactionDTO.UserEmail})");
                        continue;
                    }

                    PartnerUser partnerUser = partnerUserList.Where(x => x.User.Email == externalTransactionDTO.UserEmail).SingleOrDefault();

                    int pointsFromTransaction = (int)Math.Floor(externalTransactionDTO.Price.Value * savedBusinessSystemUpdatePointsScheduledTask.BusinessSystem.Partner.PointsMultiplier); // FT: Test this for negative and positive price

                    if (partnerUser == null)
                    {
                        partnerUserWhichDoesNotExistList.Add(externalTransactionDTO.UserEmail);

                        partnerUser = new PartnerUser
                        {
                            User = new UserExtended { Email = externalTransactionDTO.UserEmail },
                            Partner = savedBusinessSystemUpdatePointsScheduledTask.BusinessSystem.Partner,
                            Points = pointsFromTransaction,
                            Tier = await GetTierForThePoints(pointsFromTransaction)
                        };

                        await _context.DbSet<PartnerUser>().AddAsync(partnerUser);
                        await _context.SaveChangesAsync();
                    }

                    TransactionDTO transactionDTO = new TransactionDTO
                    {
                        Code = externalTransactionDTO.Code,
                        ProductName = externalTransactionDTO.ProductName,
                        ProductImageUrl = externalTransactionDTO.ProductImageUrl,
                        ProductCategoryName = externalTransactionDTO.ProductCategoryName,
                        ProductCategoryImageUrl = externalTransactionDTO.ProductCategoryImageUrl,
                        Price = externalTransactionDTO.Price,
                        Points = pointsFromTransaction,
                        PartnerUserId = partnerUser.Id,
                        BoughtAt = externalTransactionDTO.BoughtAt,
                        BusinessSystemUpdatePointsScheduledTaskId = savedBusinessSystemUpdatePointsScheduledTask.Id,
                    };

                    await UpdatePointsForThePartnerUser(partnerUser, pointsFromTransaction);
                    await SaveTransaction(transactionDTO, false, false);
                    await _context.SaveChangesAsync();

                    transactionWhichUpdateSucceededList.Add($"{externalTransactionDTO.Code} ({externalTransactionDTO.UserEmail})");
                }

                return new TransactionsProcessingResult
                {
                    PartnerUserWhichDoesNotExistList = partnerUserWhichDoesNotExistList,
                    TransactionWhichUpdateSucceededList = transactionWhichUpdateSucceededList,
                    TransactionWhichWeAlreadyUpdatedForThisPeriodList = transactionWhichWeAlreadyUpdatedForThisPeriodList,
                    TotalProcessedTransactionsCount = externalTransactionDTOList.Count,
                };
            });
        }

        public async Task RevertToTaskState(long taskForRevertId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemUpdateAndThrow(null);

                BusinessSystemUpdatePointsScheduledTask taskForRevert = await GetInstanceAsync<BusinessSystemUpdatePointsScheduledTask, long>(taskForRevertId, null);

                IQueryable<BusinessSystemUpdatePointsScheduledTask> tasksQuery = _context.DbSet<BusinessSystemUpdatePointsScheduledTask>()
                    .Include(x => x.Transactions)
                        .ThenInclude(x => x.PartnerUser)
                            .ThenInclude(x => x.Tier)
                    .Where(x =>
                        x.BusinessSystem.Id == taskForRevert.BusinessSystem.Id &&
                        x.Id >= taskForRevert.Id 
                    );

                List<BusinessSystemUpdatePointsScheduledTask> tasks = await tasksQuery.ToListAsync();

                foreach (BusinessSystemUpdatePointsScheduledTask task in tasks)
                {
                    foreach (Transaction transaction in task.Transactions)
                    {
                        transaction.PartnerUser.Points -= transaction.Points;
                        await UpdatePartnerUserTier(transaction.PartnerUser);
                    }
                }

                List<long> taskIds = tasks.Select(x => x.Id).ToList();
                await DeleteBusinessSystemUpdatePointsScheduledTaskList(taskIds, false);

                await _context.SaveChangesAsync();
            });
        }

        public async Task SendUpdatePointsNotificationToUsers(long taskForNotificationId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemUpdateAndThrow(null);

                BusinessSystemUpdatePointsScheduledTask task = await _context.DbSet<BusinessSystemUpdatePointsScheduledTask>()
                    .AsNoTracking()
                    .Include(x => x.Transactions)
                        .ThenInclude(x => x.PartnerUser)
                            .ThenInclude(x => x.User)
                    .Include(x => x.Transactions)
                        .ThenInclude(x => x.PartnerUser)
                            .ThenInclude(x => x.Tier)
                    .Include(x => x.Transactions)
                        .ThenInclude(x => x.PartnerUser)
                            .ThenInclude(x => x.Partner)
                    .Where(x =>
                        x.Id == taskForNotificationId
                    )
                    .SingleAsync();

                foreach (IGrouping<long, Transaction> transactionsGroup in task.Transactions.GroupBy(x => x.PartnerUser.Id))
                {
                    PartnerUser partnerUser = transactionsGroup.Where(x => x.PartnerUser.Id == transactionsGroup.Key).Select(x => x.PartnerUser).First();

                    int totalUpdatePoints = 0;

                    StringBuilder emailBody = new();

                    emailBody.Append("Obrađene kupovine : <br>");

                    foreach (Transaction transaction in transactionsGroup)
                    {
                        emailBody.Append($$"""
• Ostvarenih bodova: {{transaction.Points}}, Cena kupovine: {{transaction.Price}} RSD. <br>
""");

                        totalUpdatePoints += transaction.Points;
                    }

                    emailBody.Append($$"""
<br> Osvojeno bodova ovim ažuriranjem: {{totalUpdatePoints}}. <br>
<br> Ukupno bodova: {{partnerUser.Points}}. <br>
<br> Trenutni nivo lojalnosti: {{partnerUser.Tier.Name}} (potrebno Vam je {{partnerUser.Tier.ValidTo - partnerUser.Points}} bodova do sledećeg nivoa lojalnosti). <br>
<br> Ažuriranje izvršeno u: {{task.CreatedAt.ToString("dd.MM.yyyy. HH:mm")}}. <br>
<br> Za detaljniju statistiku posetite naš program lojalnosti na: {{SettingsProvider.Current.FrontendUrl}}/login?partner={{partnerUser.Partner.Slug}} <br>
""");

                    await _emailingService.SendEmailAsync(partnerUser.User.Email, "Uspešno ažurirani bodovi!", emailBody.ToString(), partnerUser.Partner.Email);
                }
            });
        }

        public async Task<TableResponseDTO<BusinessSystemUpdatePointsScheduledTaskDTO>> GetBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem(TableFilterDTO tableFilterDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemReadAndThrow(tableFilterDTO.AdditionalFilterIdLong);

                return await GetBusinessSystemUpdatePointsScheduledTaskTableData(
                    tableFilterDTO,
                    _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().Where(x => x.BusinessSystem.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.Id), // FT: With Id because null values of dates
                    false
                );
            });
        }

        public async Task<byte[]> ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem(TableFilterDTO tableFilterDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemReadAndThrow(tableFilterDTO.AdditionalFilterIdLong);

                byte[] fileContent = await ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel(
                    tableFilterDTO,
                    _context.DbSet<BusinessSystemUpdatePointsScheduledTask>().Where(x => x.BusinessSystem.Id == tableFilterDTO.AdditionalFilterIdLong).OrderByDescending(x => x.Id), // FT: With Id because null values of dates
                    false
                );

                return fileContent;
            });
        }

        #endregion

        #region Transaction

        protected override async Task OnBeforeTransactionIsMapped(TransactionDTO transactionDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (await _context.DbSet<Transaction>()
                    .AnyAsync(x =>
                        x.BusinessSystemUpdatePointsScheduledTask.BusinessSystem.Id == transactionDTO.BusinessSystemUpdatePointsScheduledTaskId.Value &&
                        x.Code == transactionDTO.Code)
                    )
                {
                    throw new BusinessException($"Transakcija '{transactionDTO.Code}' već postoji u sistemu.");
                }
            });
        }

        #endregion

    }

}