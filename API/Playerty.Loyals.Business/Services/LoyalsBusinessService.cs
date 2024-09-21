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
        private readonly SecurityBusinessService _securityBusinessService;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, AuthorizationService authorizationService, SecurityBusinessService securityBusinessService)
            : base(context, excelService, authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
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


        public async Task AddPointsToTheUser(string email, Guid transactionCode, List<string> productCodes)
        {
            UserExtended user = _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefault();
            // Transaction transaction = new Transaction();
            // transaction.Code = transactionCode;
            // transaction.Status = LoadStatus((long)Completed);
            //List<ProductDTO> productsDTO = productsDTO.Where(x => productCodes.Contains(x.Code)).ToList();
            //foreach (ProductDTO productDTO in productsDTO)
            //{
                // brand = LoadBrand(productDTO.BrandCode);
                // Product product = new Product
                // {
                //      Brand = brand,
                //      Name = productDTO.Name;
                //      Price = productDTO.Price;
                //      Points = (int)productDTO.Price * brand.PointsMultiplier
                // };
                // transaction.Products.Add(product);
                // user.Points += product.Points;
            //}
            // Tier tier = LoadTier(ValidFrom <= userPoints < ValidTo)
        }

        // Tabele: sve ok
        public async Task RemovePointsFromTheUser(string email, Guid transactionCode)
        {
            UserExtended user = _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefault();
            // Transaction transaction = LoadTransaction(transactionCode);
            // transaction.Status = LoadStatus((long)Archived);
            // user.Points -= (int)transaction.Points;
        }

        //// Maloprodaja
        //// Tabele: Tier (Name, Discount, Users, ValidFrom, ValidTo) + na user-u TierId;  
        //public async (string email, Guid transactionCode, int discount) GetQrCodeData()
        //{
        //    string email = _authenticationService.GetCurrentUserEmail();
        //    UserExtended user = _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefault();
        //    int discount = user.Tier.Discount;
        //    Guid transactionCode = new Guid();
        //    return (email, transactionCode, discount);
        //}

        //// Internet: Ne treba ni da mi dokazuje i upisuje kod, samo moraju da poboljsaju autentifikaciju
        //// Tabele: sve ok
        //public async (Guid transactionCode, int discount) GetDiscountForCurrentUser(string email)
        //{
        //    UserExtended user = _context.DbSet<UserExtended>().Where(x => x.Email == email).SingleOrDefault();
        //    int discount = user.Tier.Discount;
        //    Guid transactionCode = new Guid();
        //    return (transactionCode, discount);
        //}

        #endregion

    }

    public class ProductDTO
    {
        public string Code { get; set; }
        public string Brand { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}

