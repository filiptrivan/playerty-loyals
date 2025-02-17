using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SegmentationController : SegmentationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public SegmentationController(
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
        public async override Task<TableResponseDTO<SegmentationDTO>> GetSegmentationTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetSegmentationTableData(
                tableFilterDTO, 
                _context.DbSet<Segmentation>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
        }

        [HttpPost]
        [AuthGuard]
        public async override Task<IActionResult> ExportSegmentationTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportSegmentationTableDataToExcel(
                tableFilterDTO, 
                _context.DbSet<Segmentation>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), 
                true
            );
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Segmentacije.xlsx"));
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<SegmentationDTO>> GetSegmentationListForTheCurrentPartner()
        {
            return await _loyalsBusinessService.GetSegmentationListForTheCurrentPartner();
        }

        //[HttpGet]
        //[AuthGuard]
        //public async Task<List<SegmentationItemDTO>> GetSegmentationItemListForTheCurrentPartner()
        //{
        //    return await _loyalsBusinessService.GetSegmentationItemListForTheCurrentPartner();
        //}

    }
}
