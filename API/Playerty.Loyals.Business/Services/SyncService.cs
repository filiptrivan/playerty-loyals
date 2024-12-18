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

        public async Task SyncDiscountCategories(long businessSystemId)
        {
            // TODO FT: We need to validate if the current user is authorized to get the data
            await _context.WithTransactionAsync(async () =>
            {
                BusinessSystem businessSystem = await LoadInstanceAsync<BusinessSystem, long>(businessSystemId, null);
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

                    discountCategory.BusinessSystem = await LoadInstanceAsync<BusinessSystem, long>(businessSystemId, null);
                }

                _context.DbSet<DiscountProductGroup>().RemoveRange(discountCategoryList);

                await _context.SaveChangesAsync();
            });
        }
    }
}
