//using Mapster;
//using Microsoft.Extensions.DependencyInjection;
//using Playerty.Loyals.Business.DTO;
//using Playerty.Loyals.Business.Entities;
//using Soft.Generator.Security.DTO;
//using Soft.Generator.Security.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Reflection;
//using System.Text;
//using System.Threading.Tasks;

//namespace Playerty.Loyals.Business.DataMappers
//{
//    public static partial class Mapper
//    {
//        public static TypeAdapterConfig ToDTOConfig()
//        {
//            TypeAdapterConfig config = new TypeAdapterConfig();

//            config
//                .NewConfig<UserExtended, UserExtendedDTO>()
//                .Map(dest => dest.TierDisplayName, src => src.Tier.Name);

//            return config;
//        }

//        public static TypeAdapterConfig ExcelProjectToConfig()
//        {
//            TypeAdapterConfig config = new TypeAdapterConfig();

//            config
//                .NewConfig<UserExtended, UserExtendedDTO>()
//                .Ignore(x => x.Password);

//            return config;
//        }

//    }
//}
