using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SegmentationController : SoftBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public SegmentationController(IApplicationDbContext context, LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<SegmentationDTO>> GetSegmentationTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetSegmentationTableData(tableFilterDTO, _context.DbSet<Segmentation>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportSegmentationTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportSegmentationTableDataToExcel(tableFilterDTO, _context.DbSet<Segmentation>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"Segmentacije.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteSegmentation(int id)
        {
            await _loyalsBusinessService.DeleteSegmentationAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<SegmentationDTO> GetSegmentation(int id)
        {
            return await _loyalsBusinessService.GetSegmentationDTOAsync(id, false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<SegmentationItemDTO>> GetSegmentationItemsForTheSegmentation(int segmentationId)
        {
            return await _loyalsBusinessService.GetSegmentationItemsForTheSegmentation(segmentationId);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<SegmentationSaveBodyDTO> SaveSegmentation(SegmentationSaveBodyDTO segmentationSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveSegmentationAndReturnSaveBodyDTOAsync(segmentationSaveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<SegmentationDTO>> GetSegmentationListForTheCurrentPartner()
        {
            return await _loyalsBusinessService.GetSegmentationListForTheCurrentPartner();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<SegmentationItemDTO>> GetSegmentationItemListForTheCurrentPartner()
        {
            return await _loyalsBusinessService.GetSegmentationItemListForTheCurrentPartner();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> GetSegmentationItemListForDropdown()
        {
            return await _loyalsBusinessService.GetSegmentationItemListForDropdown(_context.DbSet<SegmentationItem>().Where(x => x.Segmentation.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()), false);
        }

    }
}
