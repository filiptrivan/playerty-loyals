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
            return await _loyalsBusinessService.GetPartnerDTOAsync(id, false);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<PartnerDTO> SavePartner(PartnerDTO partnerDTO)
        {
            await DeleteNonActiveBlobs(partnerDTO.LogoImageBlobName, nameof(Partner), nameof(Partner.LogoImageBlobName), partnerDTO.Id.ToString());
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

            ObjectTypeForFileNameValidateAndThrow(file.FileName, nameof(Partner), nameof(Partner.LogoImageBlobName));
            
            int id = GetObjectIdFromFileName<int>(file.FileName);
            // TODO FT: Authorize access for this id...

            string fileName = $"{nameof(Partner)}-{nameof(Partner.LogoImageBlobName)}-{id}-{Guid.NewGuid()}"; // TODO FT: Delete class name and prop name if you don't need it

            await UploadFileAsync(fileName, nameof(Partner), nameof(Partner.LogoImageBlobName), id.ToString(), stream);

            return fileName;
        }

        private async Task UploadFileAsync(string blobName, string objectType, string objectProperty, string objectId, Stream content)
        {
            BlobClient blobClient = _blobContainerClient.GetBlobClient(blobName);

            await blobClient.UploadAsync(content);

            Dictionary<string, string> tags = new Dictionary<string, string>
            {
                { "objectType", $"{objectType}" },
                { "objectProperty", $"{objectProperty}" },
                { "objectId", $"{objectId}" },
            };

            await blobClient.SetTagsAsync(tags); // https://stackoverflow.com/questions/52769758/azure-blob-storage-authorization-permission-mismatch-error-for-get-request-wit 
        }

        private static void ObjectTypeForFileNameValidateAndThrow(string fileName, string typeName, string propertyName)
        {
            List<string> parts = fileName.Split('-').ToList();

            if (parts.Count != 3) // FT: It could be only 3 because when firstly uploading the file, there is no guid part
                throw new HackerException($"Invalid file name format ({fileName}).");

            string typePart = parts[0];
            string propertyPart = parts[1];

            if(typePart != typeName || propertyPart != propertyName)
                throw new HackerException($"Invalid file name ({fileName}).");
        }

        // uzimam id iz imena kog je poslao jer ne mogu drugacije da ga posaljem
        private static ID GetObjectIdFromFileName<ID>(string fileName) where ID : struct
        {
            List<string> parts = fileName.Split('-').ToList();

            if (parts.Count != 3) // FT: It could be only 3 because when firstly uploading the file, there is no guid part
                throw new HackerException($"Invalid file name format ({fileName}).");

            string idPart = parts[2];

            // Try to convert the string part to the specified struct type
            if (TypeDescriptor.GetConverter(typeof(ID)).IsValid(idPart))
                return (ID)TypeDescriptor.GetConverter(typeof(ID)).ConvertFromString(idPart);

            throw new InvalidCastException($"Cannot convert '{idPart}' to {typeof(ID)}.");
        }

        // FT: Before this in save method the authorization is being done, so we don't need to do it here also
        private async Task DeleteNonActiveBlobs(string activeBlobName, string objectType, string objectProperty, string objectId)
        {
            AsyncPageable<TaggedBlobItem> blobs = _blobContainerClient.FindBlobsByTagsAsync($"\"objectType\"='{objectType}' AND \"objectProperty\"='{objectProperty}' AND \"objectId\"='{objectId}'");

            await foreach (TaggedBlobItem blob in blobs)
            {
                if (blob.BlobName != activeBlobName)
                    await _blobContainerClient.DeleteBlobAsync(blob.BlobName, Azure.Storage.Blobs.Models.DeleteSnapshotsOption.IncludeSnapshots);
            }
        }
    }
}
