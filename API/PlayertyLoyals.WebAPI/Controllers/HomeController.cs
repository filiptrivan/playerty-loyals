using Microsoft.AspNetCore.Mvc;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.Enums;
using PlayertyLoyals.Business.Services;
using Spiderly.Security.Interfaces;
using Spiderly.Security.Services;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Helpers;
using Spiderly.Shared.Interfaces;

namespace PlayertyLoyals.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class HomeController : SpiderBaseController
    {
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly LoyalsBusinessService _loyalsBusinessService;
        private readonly WingsApiService _wingsApiService;

        public HomeController(IJwtAuthManager jwtAuthManagerService, IApplicationDbContext context, AuthenticationService authenticationService,
            LoyalsBusinessService loyalsBusinessService, WingsApiService wingsApiService)
            : base()
        {
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _loyalsBusinessService = loyalsBusinessService;
            _wingsApiService = wingsApiService;

            //Menu = new List<MenuDTO>
            //{
            //    new MenuDTO
            //    {
            //        Label = "Home",
            //        Items = new List<MenuDTO>
            //        {
            //            new MenuDTO
            //            {
            //                Label = "Dashboard",
            //                Icon = "pi pi-fw pi-home",
            //                Url = "/",
            //            }
            //        }
            //    },
            //    new MenuDTO
            //    {
            //        Label = "Pages",
            //        Icon = "pi pi-fw pi-briefcase",
            //        Items = new List<MenuDTO>
            //        {
            //            new MenuDTO
            //            {
            //                Label = "Tiers",
            //                Icon = "pi pi-fw pi-sitemap",
            //                Url = "/tiers",
            //            },
            //            new MenuDTO
            //            {
            //                Label = "Notifications",
            //                Icon = "pi pi-fw pi-bell",
            //                Url = "/notifications",
            //            },
            //            new MenuDTO
            //            {
            //                Label = "Points",
            //                Icon = "pi pi-fw pi-heart",
            //                Url = "/points"
            //            },
            //            new MenuDTO
            //            {
            //                Label = "Administration",
            //                Icon = "pi pi-fw pi-cog",
            //                Items = new List<MenuDTO>
            //                {
            //                    new MenuDTO
            //                    {
            //                        Label = "Users",
            //                        Icon = "pi pi-fw pi-user",
            //                        Url = "/administration/users",
            //                        Permissions = new List<Enum> { PermissionCodes.ReadUserExtended }
            //                    },
            //                    new MenuDTO
            //                    {
            //                        Label = "Roles",
            //                        Icon = "pi pi-fw pi-id-card",
            //                        Url = "/administration/roles",
            //                        Permissions = new List<Enum> { Spiderly.Security.Enums.PermissionCodes.ReadRole }
            //                    },
            //                    new MenuDTO
            //                    {
            //                        Label = "Tiers",
            //                        Icon = "pi pi-fw pi-sitemap",
            //                        Url = "/administration/tiers",
            //                        Permissions = new List<Enum> { PermissionCodes.ReadTier }
            //                    },
            //                    new MenuDTO
            //                    {
            //                        Label = "Notifications",
            //                        Icon = "pi pi-fw pi-bell",
            //                        Url = "/administration/notifications",
            //                        Permissions = new List<Enum> { Spiderly.Security.Enums.PermissionCodes.ReadNotification }
            //                    },
            //                }
            //            },
            //            new MenuDTO
            //            {
            //                Label = "Not Found",
            //                Icon = "pi pi-fw pi-exclamation-circle",
            //                Url = "/not-found"
            //            }
            //        }
            //    }
            //};
        }

        //public async Task<MenuDTO> GetMenuForTheCurrentUser()
        //{
        //    List<MenuDTO> menu = new List<MenuDTO>();
        //    Load
        //}

        [HttpGet]
        [AuthGuard]
        public async Task<List<ProductDTO>> GetProductListForRecommendation()
        {
            return _wingsApiService.GetProductListForRecommendationAsync();
        }

    }
}
