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

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthorizationService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService _securityBusinessService;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, AuthorizationService authorizationService, SecurityBusinessService securityBusinessService, AuthenticationService authenticationService)
            : base(context, excelService, authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
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

                await _securityBusinessService.UpdateRoleListForUser<UserExtended>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRoleIds);

                userExtendedSaveBodyDTO.UserExtendedDTO.Password = user.Password;
                return await SaveUserExtendedAndReturnDTOAsync(userExtendedSaveBodyDTO.UserExtendedDTO); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI
            });
        }

        protected override void OnBeforeUserExtendedIsMapped(UserExtendedDTO dto)
        {
            //dto.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(dto.Password); // FT: We don't need this because we will read hashed password from the database
        }


        public async Task AddPointsToTheUser(string email, Guid transactionCode, List<ProductDTO> productsDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();

                Transaction transaction = new Transaction();
                transaction.Guid = transactionCode;
                transaction.Statuses.Add(await LoadInstanceAsync<TransactionStatus, byte>((byte)TransactionStatusCodes.Completed));

                foreach (ProductDTO productDTO in productsDTO)
                {
                    TransactionProduct transactionProduct = new TransactionProduct 
                    {
                        ProductId = productDTO.Id,
                        Transaction = transaction,
                    };
                    _context.DbSet<TransactionProduct>().Add(transactionProduct);
                    user.Points += (int)productDTO.Price * (int)productDTO.Brand.PointsMultiplier; // TODO FT: Always round on the upper decimal
                }

                Tier tier = await GetTierForThePoints(user.Points);
                user.Tier = tier;

                await _context.SaveChangesAsync();
            });
        }

        // Tabele: sve ok
        public async Task RemovePointsFromTheUser(string email, Guid transactionCode)
        {
            await _context.WithTransactionAsync(async () =>
            {
                UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();
                Transaction transaction = await _context.DbSet<Transaction>().Where(x => x.Guid == transactionCode).SingleOrDefaultAsync();
                transaction.Statuses.Add(await LoadInstanceAsync<TransactionStatus, byte>((byte)TransactionStatusCodes.Cancelled));
                user.Points -= (int)transaction.Points;
            });
        }

        //// Maloprodaja
        public async Task<QrCodeDTO> GetQrCodeDataForTheCurrentUser()
        {
            string email = _authenticationService.GetCurrentUserEmail();
            int discount = 0;

            await _context.WithTransactionAsync(async () =>
            {
                UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();
                discount = user.Tier.Discount;
            });

            Guid transactionCode = new Guid();

            return new QrCodeDTO 
            {
                Email = email,
                TransactionCode = transactionCode,
                Discount = discount
            };
        }

        //// Internet: Ne treba ni da mi dokazuje i upisuje kod, samo moraju da poboljsaju autentifikaciju
        public async Task<OnlineShopDTO> GetDiscountForTheUser(string email)
        {
            int discount = 0;

            await _context.WithTransactionAsync(async () =>
            {
                UserExtended user = await _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefaultAsync();
                discount = user.Tier.Discount;
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

        #region Helpers


        public async Task<Tier> GetTierForThePoints(int points)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                Tier tierWithTheMaximumPoints = await _context.DbSet<Tier>().OrderByDescending(x => x.ValidTo).FirstOrDefaultAsync();
                if (tierWithTheMaximumPoints.ValidTo <= points)
                {
                    return tierWithTheMaximumPoints;
                }
                else
                {
                    Tier tier = await _context.DbSet<Tier>().Where(x => points >= x.ValidFrom && points <= x.ValidTo).SingleOrDefaultAsync();
                    return tier;
                }
            });
        }

        #endregion

        #endregion

    }

}

