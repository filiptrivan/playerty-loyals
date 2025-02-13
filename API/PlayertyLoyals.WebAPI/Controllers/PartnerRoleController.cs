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

        public PartnerRoleController(
            IApplicationDbContext context, 
            LoyalsBusinessService loyalsBusinessService, 
            PartnerUserAuthenticationService partnerUserAuthenticationService, 
            BlobContainerClient blobContainerClient
        )
            : base (context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<PartnerRoleDTO>> GetPartnerRoleTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerRoleTableData(
                tableFilterDTO, 
                _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportPartnerRoleTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerRoleTableDataToExcel(
                tableFilterDTO, 
                _context.DbSet<PartnerRole>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Uloge.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public override async Task<List<NamebookDTO<long>>> GetPartnerUsersAutocompleteListForPartnerRole(int limit, string query, int? partnerRoleId)
        {
            return await _loyalsBusinessService.GetPartnerUsersAutocompleteListForPartnerRole(
                limit,
                query,
                _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()),
                true,
                partnerRoleId
            );
        }

    }
}
