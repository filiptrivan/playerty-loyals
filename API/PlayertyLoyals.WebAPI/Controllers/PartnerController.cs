using Microsoft.AspNetCore.Mvc;
using Spider.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.DTO;
using Spider.Shared.Helpers;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using PlayertyLoyals.Shared.Resources;
using Spider.Security.Services;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerController : PartnerBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly BlobContainerClient _blobContainerClient;

        public PartnerController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, BlobContainerClient blobContainerClient)
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _blobContainerClient = blobContainerClient;
        }

        //[HttpPut]
        //[AuthGuard]
        //public async Task<PartnerDTO> SavePartner(PartnerDTO partnerDTO)
        //{
        //    return await _loyalsBusinessService.SavePartnerAndReturnDTOAsync(partnerDTO, false, false);
        //}
        
        [HttpGet]
        //[AuthGuard] // FT: We should show login page of the partner to the user which is not logged in also.
        public async Task<PartnerDTO> GetCurrentPartner()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<CodebookDTO>> GetPartnerWithSlugListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.GetPartnerWithSlugListForAutocomplete(limit, query, _context.DbSet<Partner>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<int>> GetPartnerIdsForTheCurrentUser()
        {
            return await _loyalsBusinessService.GetPartnerIdsForTheCurrentUser();
        }

    }
}
