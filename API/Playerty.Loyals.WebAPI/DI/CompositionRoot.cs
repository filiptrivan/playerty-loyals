using LightInject;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Shared.SoftFluentValidation;
using Soft.Generator.Shared.Emailing;
using Playerty.Loyals.Services;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.BackroundJobs;

namespace Playerty.Loyals.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        public virtual void Compose(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.BusinessServiceGenerated<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessServiceGenerated>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // Business
            registry.Register<LoyalsBusinessService>();
            registry.Register<Playerty.Loyals.Business.Services.BusinessServiceGenerated>();
            registry.Register<PartnerUserAuthenticationService>();
            registry.Register<WingsApiService>();
            registry.Register<SyncService>();
            registry.RegisterSingleton<UpdatePointsScheduler>();
            registry.Register<Playerty.Loyals.Business.Services.AuthorizationBusinessService>();
            registry.Register<Playerty.Loyals.Business.Services.AuthorizationBusinessServiceGenerated>();
        }
    }
}
