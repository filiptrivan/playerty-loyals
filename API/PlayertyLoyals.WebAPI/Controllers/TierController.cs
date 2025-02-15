using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Spider.Security.Interfaces;
using Spider.Security.Services;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Helpers;
using Spider.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class TierController : TierBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public TierController(
            IApplicationDbContext context,
            LoyalsBusinessService loyalsBusinessService,
            BlobContainerClient blobContainerClient,
            PartnerUserAuthenticationService partnerUserAuthenticationService
        )
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierSaveBodyDTO> GetTierSaveBodyDTO()
        {
            return await _loyalsBusinessService.GetTierSaveBodyDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<TierDTO>> GetTierListForDisplay()
        {
            return await _loyalsBusinessService.GetTierListForDisplay();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTierForCurrentPartnerUser()
        {
            return await _loyalsBusinessService.GetTierDTOForCurrentPartnerUser();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTierForPartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetTierDTOForPartnerUser(partnerUserId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetBusinessSystemDropdownListForBusinessSystemTier()
        {
            return await _loyalsBusinessService.GetBusinessSystemDropdownListForBusinessSystemTier(
                _context.DbSet<BusinessSystem>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
        }

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<BusinessSystemTierDTO>> GetBusinessSystemTierDTOListForTierList(List<long> tierIds)
        //{
        //    return await _loyalsBusinessService.GetBusinessSystemTierDTOListForTierList(tierIds);
        //}

        //[HttpPost]
        //[AuthGuard]
        //public async Task<List<DiscountProductGroupDTO>> GetDiscountProductGroupDTOListForCurrentPartner(List<long> businessSystemTierIds)
        //{
        //    return await _loyalsBusinessService.GetDiscountProductGroupDTOListForCurrentPartner(businessSystemTierIds);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> GetUserListForTier(int roleId)
        //{
        //    return await _loyalsBusinessService.GetUserExtendedNamebookListForTier<TUser>(roleId);
        //}
    }
}
