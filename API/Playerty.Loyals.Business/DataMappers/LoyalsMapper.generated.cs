using Riok.Mapperly.Abstractions;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Entities;

namespace Playerty.Loyals.Business.DataMappers
{
    [Mapper]
    public static partial class Mapper
    {

        #region UserExtended

        public static partial UserExtended Map(UserExtendedDTO dto);

        

        

                
        public static partial IQueryable<UserExtendedDTO> ProjectTo(this IQueryable<UserExtended> poco);

                
        public static partial IQueryable<UserExtendedDTO> ExcelProjectTo(this IQueryable<UserExtended> poco);

        public static partial void MergeMap(UserExtendedDTO dto, UserExtended poco);

        #endregion

    }
}

