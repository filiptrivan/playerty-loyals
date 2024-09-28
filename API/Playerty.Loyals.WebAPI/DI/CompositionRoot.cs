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

namespace Playerty.Loyals.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        private void ComposeUnified(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService>();
            registry.Register<SecurityBusinessServiceGenerated>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // PL
            registry.Register<LoyalsBusinessService>();
            registry.Register<BusinessBusinessServiceGenerated>();
            registry.Register<PartnerUserAuthenticationService>();
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
