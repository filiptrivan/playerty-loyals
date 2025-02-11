using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Spider.Security.DTO;
using Spider.Security.Entities;
using Spider.Security.Services;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Helpers;
using Spider.Shared.Interfaces;
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
        public async Task<List<NamebookDTO<int>>> GetPartnerPermissionDropdownList()
        {
            return await _loyalsBusinessService.GetPartnerPermissionDropdownList(_context.DbSet<PartnerPermission>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public override async Task<List<NamebookDTO<int>>> GetPartnerRoleDropdownList()
        {
            return await _loyalsBusinessService.GetPartnerRoleDropdownList(_context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

    }
}
