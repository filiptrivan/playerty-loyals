using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Services;
using Soft.Generator.Shared.Extensions;
using Playerty.Loyals.Business.DTO;
using Microsoft.EntityFrameworkCore;

namespace Playerty.Loyals.Business.Services
{
    public class SyncService : BusinessServiceBase
    {
        private readonly IApplicationDbContext _context;
        private readonly WingsApiService _wingsApiService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public SyncService(IApplicationDbContext context, WingsApiService wingsApiService, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base(context, null)
        {
            _context = context;
            _wingsApiService = wingsApiService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        public async Task SyncDiscountCategories(long storeId)
        {
            // TODO FT: We need to validate if the current user is authorized to get the data
            await _context.WithTransactionAsync(async () =>
            {
                Store store = await LoadInstanceAsync<Store, long>(storeId, null);
                List<ExternalDiscountCategoryDTO> externalDiscountCategoryDTOList = await _wingsApiService.GetExternalDiscountCategoryDTOList(store);

                DbSet<DiscountCategory> dbSet = _context.DbSet<DiscountCategory>();
                List<DiscountCategory> discountCategoryList = await _context.DbSet<DiscountCategory>()
                    .Where(x => x.Store.Id == storeId && x.Store.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .ToListAsync();

                foreach (ExternalDiscountCategoryDTO externalDiscountCategoryDTO in externalDiscountCategoryDTOList)
                {
                    DiscountCategory discountCategory = discountCategoryList.Where(x => x.Code == externalDiscountCategoryDTO.Code && x.Store.Id == storeId).SingleOrDefault();

                    if (discountCategory == null) // Add new
                    {
                        discountCategory = new DiscountCategory
                        {
                            Name = externalDiscountCategoryDTO.Name,
                            Code = externalDiscountCategoryDTO.Code,
                        };

                        await dbSet.AddAsync(discountCategory);
                    }
                    else // Update
                    {
                        discountCategory.Name = externalDiscountCategoryDTO.Name;
                        discountCategory.Code = externalDiscountCategoryDTO.Code;

                        dbSet.Update(discountCategory);

                        discountCategoryList.Remove(discountCategory);
                    }

                    discountCategory.Store = await LoadInstanceAsync<Store, long>(storeId, null);
                }

                _context.DbSet<DiscountCategory>().RemoveRange(discountCategoryList);

                await _context.SaveChangesAsync();
            });
        }
    }
}
