using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Infrastructure.Data;
using Soft.Generator.Security.SecurityControllers;
using Soft.Generator.Shared.Interfaces;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using Playerty.Loyals.Services;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.DTO;
using Playerty.Loyals.Business.Enums;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.Helpers;
using Mapster;
using Playerty.Loyals.Business.DataMappers;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using Azure.Storage.Blobs;
using Soft.Generator.Shared.SoftExceptions;
using System.ComponentModel;
using Azure.Storage.Blobs.Models;
using Azure;
using System.Management;


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
        public async Task<TableResponseDTO<PartnerDTO>> LoadPartnerListForTable(TableFilterDTO dto)
        {
            return await _loyalsBusinessService.LoadPartnerListForTable(dto, _context.DbSet<Partner>(), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportPartnerListToExcel(TableFilterDTO dto)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerListToExcel(dto, _context.DbSet<Partner>(), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Partners.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeletePartner(int id)
        {
            await _loyalsBusinessService.DeleteEntityAsync<Partner, int>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerDTO> GetPartner(int id)
        {
            var dto = await _loyalsBusinessService.GetPartnerDTOAsync(id, false);
            if (!string.IsNullOrEmpty(dto.LogoImage))
            {
                var blobClient = _blobContainerClient.GetBlobClient(dto.LogoImage);

                if (await blobClient.ExistsAsync())
                {
                    var blobDownloadInfo = await blobClient.DownloadContentAsync();

                    var imageData = blobDownloadInfo.Value.Content.ToArray();
                    string base64 = Convert.ToBase64String(imageData);
                    dto.LogoImageData = $"filename={dto.LogoImage};base64,{base64}";
                }
            }
            return dto;
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

        // ne mozes da uploadujes i brises na svaki request zato sto mozes korisniku da obrises staru sliku kada rifresuje
        [HttpPost]
        [AuthGuard]
        public async Task<string> UploadLogoImage([FromForm] IFormFile file) // FT: It doesn't work without interface
        {
            using Stream stream = file.OpenReadStream();
            
            //int id = GetObjectIdFromFileName<int>(file.FileName);
            // TODO FT: Authorize access for this id...

            //string fileName = await UploadFileAsync(file.FileName, nameof(Partner), nameof(Partner.LogoImage), id.ToString(), stream);

            //return fileName;
            return "";
        }

    }
}
