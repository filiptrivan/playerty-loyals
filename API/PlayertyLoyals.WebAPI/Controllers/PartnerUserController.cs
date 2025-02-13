using Microsoft.AspNetCore.Mvc;
using Spider.Security.Interfaces;
using Spider.Security.Services;
using Spider.Infrastructure;
using Spider.Security.SecurityControllers;
using Spider.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.DTO;
using PlayertyLoyals.Business.Enums;
using Spider.Shared.Helpers;
using Spider.Shared.Extensions;
using Azure.Storage.Blobs;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerUserController : PartnerUserBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public PartnerUserController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService, BlobContainerClient blobContainerClient)
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<PartnerUserDTO> GetCurrentPartnerUser()
        {
            return await _partnerUserAuthenticationService.GetCurrentPartnerUserDTO();
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<PartnerUserDTO>> GetPartnerUserTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetPartnerUserTableData(
                tableFilterDTO, 
                _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
        }

        [HttpPost]
        [AuthGuard]
        public override async Task<IActionResult> ExportPartnerUserTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportPartnerUserTableDataToExcel(
                tableFilterDTO, 
                _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()),
                true
            );
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Korisnici.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<long>> GetCheckedSegmentationItemIdsForThePartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetCheckedSegmentationItemIdsForThePartnerUser(partnerUserId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<int>> GetAlreadyFilledSegmentationIdsForThePartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetAlreadyFilledSegmentationIdsForThePartnerUser(partnerUserId);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<PartnerUserDTO> GetPartnerUserForTheUser(long id)
        {
            return await _loyalsBusinessService.GetPartnerUserForTheUser(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task AddPartnerUserForTheCurrentUser(int partnerId)
        {
            await _loyalsBusinessService.AddPartnerUserForTheCurrentUser(partnerId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<TransactionDTO>> GetTransactionListForTheCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetTransactionListForTheCurrentPartnerUser(tableFilterDTO);
        }

        [HttpGet]
        [AuthGuard]
        public override async Task<List<NamebookDTO<int>>> GetTierDropdownListForPartnerUser(long partnerUserId)
        {
            return await _loyalsBusinessService.GetTierDropdownListForPartnerUser(
                partnerUserId,
                _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), 
                false
            );
        }

    }
}
