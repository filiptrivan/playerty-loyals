﻿using Microsoft.AspNetCore.Mvc;
using Spider.Shared.Interfaces;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Attributes;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.DTO;
using Spider.Shared.DTO;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class PartnerUserController : PartnerUserBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;

        public PartnerUserController(
            IApplicationDbContext context, 
            LoyalsBusinessService loyalsBusinessService, 
            PartnerUserAuthenticationService partnerUserAuthenticationService, 
        )
            : base(context, loyalsBusinessService)
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
        public async Task<TableResponseDTO<AchievementDTO>> GetAchievementsForCurrentPartnerUser(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.GetAchievementsForCurrentPartnerUser(tableFilterDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<TierDTO> GetTierForCurrentPartnerUser()
        {
            return await _loyalsBusinessService.GetTierDTOForCurrentPartnerUser();
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> GetTierDropdownList()
        {
            // FT HACK: For more details go to the BusinessSystemTier entity, Tier property
            return await _loyalsBusinessService.GetTierDropdownListForPartnerUser(
                _context.DbSet<Tier>().Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode()).OrderBy(x => x.ValidFrom), 
                true,
                null
            );
        }

        [HttpGet]
        [AuthGuard]
        public async Task<GenderAndBirthDateDTO> GetPartnerUserGenderAndBirthDate(long partnerUserId)
        {
            return await _loyalsBusinessService.GetPartnerUserGenderAndBirthDateDTO(partnerUserId);
        }

    }
}
