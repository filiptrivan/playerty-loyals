using PlayertyLoyals.Business.Entities;
using Spider.Shared.Interfaces;
using Spider.Shared.Services;
using Spider.Shared.Extensions;
using PlayertyLoyals.Business.DTO;
using Microsoft.EntityFrameworkCore;

namespace PlayertyLoyals.Business.Services
{
    public class SyncService : BusinessServiceBase
    {
        private readonly IApplicationDbContext _context;
        private readonly WingsApiService _wingsApiService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly AuthorizationBusinessService _authorizationService;

        public SyncService(
            IApplicationDbContext context, 
            WingsApiService wingsApiService, 
            PartnerUserAuthenticationService partnerUserAuthenticationService,
            AuthorizationBusinessService authorizationService
        )
            : base(context, null)
        {
            _context = context;
            _wingsApiService = wingsApiService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _authorizationService = authorizationService;
        }

        public async Task SyncDiscountCategories(long businessSystemId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeBusinessSystemUpdateAndThrow(null);

                BusinessSystem businessSystem = await GetInstanceAsync<BusinessSystem, long>(businessSystemId, null);
                List<ExternalDiscountProductGroupDTO> externalDiscountProductGroupDTOList = await _wingsApiService.GetExternalDiscountProductGroupDTOList(businessSystem);

                DbSet<DiscountProductGroup> dbSet = _context.DbSet<DiscountProductGroup>();
                List<DiscountProductGroup> discountCategoryList = await _context.DbSet<DiscountProductGroup>()
                    .Where(x => x.BusinessSystem.Id == businessSystemId && x.BusinessSystem.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .ToListAsync();

                foreach (ExternalDiscountProductGroupDTO externalDiscountProductGroupDTO in externalDiscountProductGroupDTOList)
                {
                    DiscountProductGroup discountCategory = discountCategoryList.Where(x => x.Code == externalDiscountProductGroupDTO.Code && x.BusinessSystem.Id == businessSystemId).SingleOrDefault();

                    if (discountCategory == null) // Add new
                    {
                        discountCategory = new DiscountProductGroup
                        {
                            Name = externalDiscountProductGroupDTO.Name,
                            Code = externalDiscountProductGroupDTO.Code,
                        };

                        await dbSet.AddAsync(discountCategory);
                    }
                    else // Update
                    {
                        discountCategory.Name = externalDiscountProductGroupDTO.Name;
                        discountCategory.Code = externalDiscountProductGroupDTO.Code;

                        dbSet.Update(discountCategory);

                        discountCategoryList.Remove(discountCategory);
                    }

                    discountCategory.BusinessSystem = await GetInstanceAsync<BusinessSystem, long>(businessSystemId, null);
                }

                _context.DbSet<DiscountProductGroup>().RemoveRange(discountCategoryList);

                await _context.SaveChangesAsync();
            });
        }
    }
}
