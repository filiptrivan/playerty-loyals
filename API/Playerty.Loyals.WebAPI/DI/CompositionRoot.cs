using LightInject;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Security.Services;
using System.Resources;
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
        private void ComposeUnified(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService<UserExtended>>();
            registry.Register<SecurityBusinessServiceGenerated<UserExtended>>();
            registry.Register<Playerty.Loyals.Business.Services.AuthorizationBusinessService>();
            registry.Register<Playerty.Loyals.Business.Services.AuthorizationBusinessServiceGenerated>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessServiceGenerated>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // PL
            registry.Register<LoyalsBusinessService>();
            registry.Register<BusinessBusinessServiceGenerated>();
            registry.Register<PartnerUserAuthenticationService>();
            registry.Register<WingsApiService>();
            registry.RegisterSingleton<UpdatePointsScheduler>();
        }

        /// <summary>
        /// Place here all common services for solution. 
        /// </summary>
        /// <param name="registry"></param>
        public virtual void Compose(IServiceRegistry registry)
        {
            ComposeUnified(registry);
        }
    }
}
