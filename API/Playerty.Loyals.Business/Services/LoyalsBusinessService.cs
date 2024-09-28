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

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthorizationService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService _securityBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, AuthorizationService authorizationService, SecurityBusinessService securityBusinessService, AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base(context, excelService, authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        #region User

        public async Task DeleteUserExtendedAsync(long userId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(Business.Enums.PermissionCodes.DeleteUserExtended);
                await DeleteEntity<UserExtended, long>(userId);
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
                return await SaveUserExtendedAndReturnDTOAsync(userExtendedSaveBodyDTO.UserExtendedDTO); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI
            });
        }

        protected override void OnBeforeUserExtendedIsMapped(UserExtendedDTO dto)
        {
            //dto.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(dto.Password); // FT: We don't need this because we will read hashed password from the database
        }

        #region Scheduled tasks

        public async Task LoadTransactionsAndAddPointsToUsers()
        {
            //_context
        }

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
        
        
        public async Task<OnlineShopDTO> GetDiscountForTheUser(string email)
        {
            int discount = 0;

            await _context.WithTransactionAsync(async () =>
            {
                PartnerUser partnerUser = await _context.DbSet<PartnerUser>().Where(x => x.User.Email == email).SingleOrDefaultAsync();
                discount = partnerUser.Tier.Discount;
            });

            Guid transactionCode = new Guid();

            return new OnlineShopDTO
            {
                TransactionCode = transactionCode,
                Discount = discount
            };
        }

        public List<ProductDTO> LoadProductsAsync()
        {
            List<ProductDTO> products = new List<ProductDTO>
            {
                new ProductDTO { Id = 1, Name = "Bosch Hilti", Brand = new BrandDTO { PointsMultiplier = 1.5M, Name = "Bosch" }, Price = 30000, Code = "B-H-2024" },
                new ProductDTO { Id = 2, Name = "Makita Drill", Brand = new BrandDTO { PointsMultiplier = 1.2M, Name = "Makita" }, Price = 25000, Code = "M-D-2024" },
                new ProductDTO { Id = 3, Name = "DeWalt Saw", Brand = new BrandDTO { PointsMultiplier = 1.8M, Name = "DeWalt" }, Price = 35000, Code = "D-S-2024" },
                new ProductDTO { Id = 4, Name = "Stanley Hammer", Brand = new BrandDTO { PointsMultiplier = 1.1M, Name = "Stanley" }, Price = 5000, Code = "S-H-2024" },
                new ProductDTO { Id = 5, Name = "Bosch Grinder", Brand = new BrandDTO { PointsMultiplier = 1.5M, Name = "Bosch" }, Price = 15000, Code = "B-G-2024" },
                new ProductDTO { Id = 6, Name = "Milwaukee Impact Driver", Brand = new BrandDTO { PointsMultiplier = 1.6M, Name = "Milwaukee" }, Price = 32000, Code = "M-I-2024" },
                new ProductDTO { Id = 7, Name = "Black+Decker Jigsaw", Brand = new BrandDTO { PointsMultiplier = 1.3M, Name = "Black+Decker" }, Price = 12000, Code = "B-J-2024" },
                new ProductDTO { Id = 8, Name = "Hilti Laser Level", Brand = new BrandDTO { PointsMultiplier = 1.7M, Name = "Hilti" }, Price = 40000, Code = "H-L-2024" },
                new ProductDTO { Id = 9, Name = "Ryobi Circular Saw", Brand = new BrandDTO { PointsMultiplier = 1.4M, Name = "Ryobi" }, Price = 18000, Code = "R-C-2024" },
                new ProductDTO { Id = 10, Name = "Festool Sander", Brand = new BrandDTO { PointsMultiplier = 2.0M, Name = "Festool" }, Price = 28000, Code = "F-S-2024" }
            };

            return products;
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

        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                PartnerUser currentPartnerUser = await _partnerUserAuthenticationService.GetCurrentPartnerUser();

                if (currentPartnerUser == null)
                    return new List<string>();

                return currentPartnerUser.Roles
                    .SelectMany(x => x.Permissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToList();
            });
        }

        #region Helpers


        public async Task<Tier> GetTierForThePoints(int points)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                Tier greatestTier = await GetTheGreatestTier();
                if(greatestTier == null)
                {
                    return null;
                }
                else if (greatestTier.ValidTo <= points)
                {
                    return greatestTier;
                }
                else
                {
                    Tier tier = await _context.DbSet<Tier>().Where(x => points >= x.ValidFrom && points <= x.ValidTo).SingleOrDefaultAsync();
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

        #endregion

        #endregion

        #region Tier

        public async Task<TierDTO> SaveTier(TierDTO tierDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (tierDTO.ValidTo <= tierDTO.ValidFrom)
                    throw new BusinessException("You can not add tier which upper bound is greater than lower bound.");

                Tier greatestTier = await GetTheGreatestTier();
                if(greatestTier != null && greatestTier.ValidTo != tierDTO.ValidFrom)
                    throw new BusinessException("Tier must be saved sequentialy (Eg. Tier 1: 1p - 10p, Tier 2: 10p - 20p, Tier 3: 20p - 30p).");

                return await SaveTierAndReturnDTOAsync(tierDTO);
            });
        }

        #endregion

    }

}

