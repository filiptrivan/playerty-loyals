using Mapster;
using Microsoft.Extensions.DependencyInjection;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DataMappers
{
    public static partial class MapsterMapper
    {
        public static void AdditionalMappingConfiguration(this IServiceCollection services)
        {
            TypeAdapterConfig<UserExtended, UserExtendedDTO>
                .NewConfig()
                .Ignore(x => x.Password);
        }
    }
}
