using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using PlayertyLoyals.Business.DTO;
using Azure.Storage.Blobs;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerRoleController : PartnerRoleBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly BlobContainerClient _blobContainerClient;

        public PartnerRoleController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, BlobContainerClient blobContainerClient)
            : base (context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
            _blobContainerClient = blobContainerClient;
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<PartnerRoleDTO>> GetPartnerRoleTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerRoleTableData(tableFilterDTO, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportPartnerRoleTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerRoleTableDataToExcel(tableFilterDTO, _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Uloge.xlsx"));
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<long>>> GetPartnerUserNamebookListForPartnerRole(int partnerRoleId)
        //{
        //    return await _loyalsBusinessService.GetPartnerUsersNamebookListForPartnerRole(partnerRoleId, false);
        //}

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<NamebookDTO<int>>> GetPartnerPermissionNamebookListForPartnerRole(int partnerRoleId)
        //{
        //    return await _loyalsBusinessService.GetPartnerPermissionsNamebookListForPartnerRole(partnerRoleId, false);
        //}

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetPartnerPermissionListForDropdown()
        {
            return await _loyalsBusinessService.GetPartnerPermissionListForDropdown(_context.DbSet<PartnerPermission>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public override async Task<List<NamebookDTO<int>>> GetPartnerRoleListForDropdown()
        {
            return await _loyalsBusinessService.GetPartnerRoleListForDropdown(_context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

    }
}
