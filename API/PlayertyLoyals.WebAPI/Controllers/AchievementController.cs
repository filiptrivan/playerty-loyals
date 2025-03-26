using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Spider.Shared.Attributes;
using Spider.Shared.Interfaces;
using Spider.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.Services;
using Spider.Shared.DTO;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using Spider.Security.Services;
using PlayertyLoyals.Shared.Resources;
using Spider.Shared.Extensions;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AchievementController : AchievementBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly AuthenticationService _authenticationService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public AchievementController(
            IApplicationDbContext context, 
            LoyalsBusinessService loyalsBusinessService, 
            BlobContainerClient blobContainerClient,
            AuthenticationService authenticationService,
            PartnerUserAuthenticationService partnerUserAuthenticationService
        )
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _authenticationService = authenticationService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<AchievementDTO>> GetAchievementTableDataForCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();
            
            return await _loyalsBusinessService.GetAchievementTableData(
                tableFilterDTO,
                _context.DbSet<Achievement>().Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug).OrderByDescending(x => x.Id), 
                false
            );
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportAchievementTableDataToExcelForCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();
            string currentPartnerSlug = _partnerUserAuthenticationService.GetCurrentPartnerCode();

            byte[] fileContent = await _loyalsBusinessService.ExportAchievementTableDataToExcel(
                tableFilterDTO,
                _context.DbSet<Achievement>().Where(x => x.PartnerUser.User.Id == currentUserId && x.PartnerUser.Partner.Slug == currentPartnerSlug).OrderByDescending(x => x.Id),
                false
            );

            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"{Terms.PointsHistoryExcelExportName}.xlsx"));
        }

    }
}
