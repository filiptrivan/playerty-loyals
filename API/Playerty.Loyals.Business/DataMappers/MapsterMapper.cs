using Mapster;
using Microsoft.Extensions.DependencyInjection;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DataMappers
{
    [CustomMapper]
    public static partial class Mapper
    {
        public static TypeAdapterConfig UserExtendedToDTOConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<UserExtended, UserExtendedDTO>()
                .Ignore(dest => dest.Password)
                ;

            return config;
        }

        public static TypeAdapterConfig UserExtendedProjectToConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<UserExtended, UserExtendedDTO>()
                .Ignore(dest => dest.Password)
                ;

            return config;
        }

        public static TypeAdapterConfig UserExtendedExcelProjectToConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<UserExtended, UserExtendedDTO>()
                .Ignore(dest => dest.Password)
                ;

            return config;
        }
    }
}
