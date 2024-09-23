using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;
using Riok.Mapperly.Abstractions;
using Soft.Generator.Security.DTO;
using Soft.Generator.Security.Interface;

namespace Playerty.Loyals.Business.DataMappers
{
    public static partial class Mapper
    {
        //I don't need to ignore Id and Version here because when it's protected set it ignores without me specifying it
        //also you can specify Lists and reference types inside DTO but need to be very careful because of infinite loops
        //public static partial TUser Map<TUser>(UserDTO dto) where TUser : User, IUser, new();

        #region User

        // FT: Adding it manually because of MapperIgnoreTarget

        [MapperIgnoreTarget("Password")]
        [MapProperty("Tier.Name", "TierDisplayName")]
        public static partial UserExtendedDTO Map(UserExtended poco);

        [MapperIgnoreTarget("Password")]
        [MapProperty("Tier.Name", "TierDisplayName")]
        public static partial UserExtendedDTO ExcelMap(UserExtended poco);

        [MapperIgnoreTarget("Password")]
        [MapProperty("Tier.Name", "TierDisplayName")]
        public static partial IQueryable<UserExtendedDTO> ProjectTo(this IQueryable<UserExtended> poco);

        [MapperIgnoreTarget("Password")]
        [MapProperty("Tier.Name", "TierDisplayName")]
        public static partial IQueryable<UserExtendedDTO> ExcelProjectTo(this IQueryable<UserExtended> poco);

        #endregion

    }
}
