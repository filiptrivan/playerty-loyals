using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Security.Interface;
using Soft.Generator.Security.Services;
using Soft.Generator.Security.SecurityControllers;
using Soft.Generator.Shared.Interfaces;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using Playerty.Loyals.Services;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.DTO;
using Playerty.Loyals.Business.Services;
using Microsoft.EntityFrameworkCore;
using Soft.Generator.Shared.Terms;
using Soft.Generator.Security.DTO;
using Soft.Generator.Shared.Extensions;
using Azure.Core;

namespace Playerty.Loyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AuthController : BaseSecurityController<UserExtended>
    {
        private readonly ILogger<AuthController> _logger;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;


        public AuthController(ILogger<AuthController> logger, SecurityBusinessService<UserExtended> securityBusinessService, IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, PartnerUserAuthenticationService partnerUserAuthenticationService)
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        public async Task<AuthResultDTO> Register(VerificationTokenRequestDTO request)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.Register(request);
                await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
                return authResultDTO;
            });
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary
        [HttpPost]
        public async Task<AuthResultDTO> Login(VerificationTokenRequestDTO request)
        {
            AuthResultDTO authResultDTO = _securityBusinessService.Login(request);
            await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
            return authResultDTO;
        }

        /// <summary>
        /// FT: Putting the method here because we need to make new partner user if he doesn't exist
        /// </summary>
        [HttpPost]
        public async Task<AuthResultDTO> LoginExternal(ExternalProviderDTO externalProviderDTO) // TODO FT: Add enum for which external provider you should login user
        {
            return await _context.WithTransactionAsync(async () =>
            {
                AuthResultDTO authResultDTO = await _securityBusinessService.LoginExternal(externalProviderDTO, SettingsProvider.Current.GoogleClientId);
                await _loyalsBusinessService.AddPartnerUserAfterAuthResult(authResultDTO);
                return authResultDTO;
            });
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<UserExtendedDTO>> LoadUserTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadUserExtendedTableData(tableFilterDTO, _context.DbSet<UserExtended>().OrderBy(x => x.Id)); // FT: Ordering by because of notifications
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportUserTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportUserExtendedTableDataToExcel(tableFilterDTO, _context.DbSet<UserExtended>().OrderBy(x => x.Id));
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"{SharedTerms.UserExcel}.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteUser(long id)
        {
            await _loyalsBusinessService.DeleteUserExtendedAsync(id); // FT: Not authorizing more than basic because when the user wants to delete himself we will make separated method for that and will use currentUserId
        }

        [HttpGet]
        [AuthGuard]
        public async Task<UserExtendedDTO> GetUser(long id)
        {
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(id); // FT: Not authorizing more than basic because when user wants to see his profile he will go to the PartnerUser details
        }

        [HttpPut]
        [AuthGuard]
        public async Task<UserExtendedDTO> SaveUserExtended(UserExtendedSaveBodyDTO dto)
        {
            return await _loyalsBusinessService.SaveUserExtendedAndReturnDTOExtendedAsync(dto); // FT: Not authorizing more than basic because when user wants to save his profile he will go to the PartnerUser details
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserListForAutocomplete(int limit, string query)
        {
            return await _loyalsBusinessService.LoadUserExtendedListForAutocomplete(limit, query, _context.DbSet<UserExtended>());
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserListForDropdown()
        {
            return await _loyalsBusinessService.LoadUserExtendedListForDropdown(_context.DbSet<UserExtended>());
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentUserPermissionCodes(); // FT: Not authorizing because we are reading this from the jwt token
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<int>>> LoadGenderNamebookListForDropdown()
        {
            return await _loyalsBusinessService.LoadGenderListForDropdown(_context.DbSet<Gender>(), false);
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _loyalsBusinessService.SendNotificationEmail(notificationId, notificationVersion);
        }

        #region Notification

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<NotificationDTO>> LoadNotificationTableData(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LoadNotificationTableData(tableFilterDTO, _context.DbSet<Notification>().Where(a => EF.Property<string>(a, "Discriminator") == nameof(Notification))); // TODO FT: Make one more table, don't do this
        }

        [HttpPost]
        [AuthGuard]
        public async Task<IActionResult> ExportNotificationTableDataToExcel(TableFilterDTO tableFilterDTO)
        {
            byte[] fileContent = await _loyalsBusinessService.ExportNotificationTableDataToExcel(tableFilterDTO, _context.DbSet<Notification>().Where(a => EF.Property<string>(a, "Discriminator") == nameof(Notification))); // TODO FT: Make one more table, don't do this
            return File(fileContent, SettingsProvider.Current.ExcelContentType, Uri.EscapeDataString($"{SharedTerms.NotificationExcel}.xlsx"));
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotification(long id)
        {
            await _loyalsBusinessService.DeleteEntityAsync<Notification, long>(id);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<NotificationDTO> GetNotification(long id)
        {
            return await _loyalsBusinessService.GetNotificationDTOAsync(id);
        }

        [HttpPut]
        [AuthGuard]
        public async Task<NotificationDTO> SaveNotification(NotificationSaveBodyDTO notificationSaveBodyDTO)
        {
            return await _loyalsBusinessService.SaveNotificationAndReturnDTOExtendedAsync(notificationSaveBodyDTO);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<LazyLoadSelectedIdsResultDTO<long>> LazyLoadSelectedUserExtendedIdsForNotification(TableFilterDTO tableFilterDTO)
        {
            return await _loyalsBusinessService.LazyLoadSelectedUserExtendedIdsForNotification(tableFilterDTO, _context.DbSet<UserExtended>()
                .OrderBy(x => x.Id));
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<NamebookDTO<long>>> LoadUserExtendedNamebookListForNotification(long notificationId)
        {
            return await _loyalsBusinessService.LoadUserExtendedNamebookListForNotification(notificationId);
        }

        //[HttpPost]
        //[AuthGuard]
        //public async Task<TableResponseDTO<NotificationDTO>> LoadNotificationListForTheCurrentUser(TableFilterDTO tableFilterDTO)
        //{
        //    return await _loyalsBusinessService.LoadNotificationListForTheCurrentUser(tableFilterDTO);
        //}

        // TODO FT: This should exist in other systems
        //[HttpGet]
        //[AuthGuard]
        //public async Task<int> GetUnreadNotificationCountForTheCurrentUser()
        //{
        //    return await _loyalsBusinessService.GetUnreGetUnreadNotificationCountForTheCurrentUser();
        //}

        #endregion

    }
}
