using Mapster;
using Microsoft.Extensions.DependencyInjection;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DataMappers
{
    public static partial class MapsterMapper
    {
        public static void RegisterMapsterConfiguration(this IServiceCollection services)
        {
            AdditionalMappingConfiguration(services);

            TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());
        }
    }
}
