using LightInject;
using Spider.Security.Interface;
using Spider.Shared.Excel;
using Spider.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Spider.Shared.FluentValidation;
using Spider.Shared.Emailing;
using PlayertyLoyals.Business.Services;
using PlayertyLoyals.Business.Entities;
using PlayertyLoyals.Business.BackroundJobs;

namespace PlayertyLoyals.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        public virtual void Compose(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService<UserExtended>>();
            registry.Register<Spider.Security.Services.BusinessServiceGenerated<UserExtended>>();
            registry.Register<Spider.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Spider.Security.Services.AuthorizationBusinessServiceGenerated>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // Business
            registry.Register<LoyalsBusinessService>();
            registry.Register<PlayertyLoyals.Business.Services.BusinessServiceGenerated>();
            registry.Register<PartnerUserAuthenticationService>();
            registry.Register<WingsApiService>();
            registry.Register<SyncService>();
            registry.RegisterSingleton<UpdatePointsScheduler>();
            registry.Register<PlayertyLoyals.Business.Services.AuthorizationBusinessService>();
            registry.Register<PlayertyLoyals.Business.Services.AuthorizationBusinessServiceGenerated>();
        }
    }
}
