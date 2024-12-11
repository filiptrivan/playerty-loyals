using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Shared.Interfaces;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using Playerty.Loyals.Services;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.DTO;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.Helpers;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;


namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerController : SoftControllerBase
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly BlobContainerClient _blobContainerClient;

        public PartnerController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, BlobContainerClient blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _blobContainerClient = blobContainerClient;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<PartnerDTO>> LoadPartnerTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadPartnerTableData(tableFilterDTO, _context.DbSet<Partner>(), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerTableDataToExcel(tableFilterDTO, _context.DbSet<Partner>(), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Partneri.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartner(int id)
        {
            await _loyalsBusinessService.DeletePartnerAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerDTO> GetPartner(int id)
        {
            return await _loyalsBusinessService.GetPartnerDTOAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<PartnerDTO>> GetPartners()
        {
            return await _loyalsBusinessService.LoadPartnerDTOList(_context.DbSet<Partner>(), false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerDTO> SavePartner(PartnerDTO partnerDTO)
        {
            return await _loyalsBusinessService.SavePartnerAndReturnDTOAsync(partnerDTO, false, false);
        }
        
        [HttpGet]
        //[AuthGuard] // FT: We should show login page of the partner to the user which is not logged in also.
        public async Task<PartnerDTO> GetCurrentPartner()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerDTO();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<CodebookDTO>> LoadPartnerWithSlugListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.LoadPartnerWithSlugListForAutocomplete(limit, query, _context.DbSet<Partner>(), false);
        }

        // FT: You can't upload and delete on every request because you can delete the old image for the user when he refreshes
        [HttpPost]
        [AuthGuard]
        public async Task<string> UploadLogoImage([FromForm] IFormFile file) // FT: It doesn't work without interface
        {
            return await _loyalsBusinessService.UploadPartnerLogoImageAsync(file); // TODO FT: Make authorization in loyals business servie with override
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<int>> GetPartnerIdsForTheCurrentUser()
        {
            return await _loyalsBusinessService.GetPartnerIdsForTheCurrentUser();
        }

    }
}
