using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Playerty.Loyals.Business.Services;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Security.Entities;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.Services;
using Playerty.Loyals.Enums;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.Enums;
using Soft.Generator.Shared.SoftExceptions;

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthorizationService _authorizationService;
        private readonly SecurityBusinessService _securityBusinessService;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService, AuthorizationService authorizationService, SecurityBusinessService securityBusinessService)
            : base(context, excelService, authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
        }

        #region User

        public async Task DeleteUserExtendedAsync(long userId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(Business.Enums.PermissionCodes.DeleteUserExtended);
                await DeleteEntity<UserExtended, long>(userId);
            });
        }

        public async Task<UserExtendedDTO> SaveUserExtendedAndReturnDTOExtendedAsync(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Password != null)
                    throw new HackerException("You can not change password from here.");

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id == 0)
                    throw new HackerException("You can add new user.");

                UserExtended user = await LoadInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != user.Email)
                    throw new HackerException("You can not change email from here.");

                await _securityBusinessService.UpdateRoleListForUser<UserExtended>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRoleIds);

                userExtendedSaveBodyDTO.UserExtendedDTO.Password = user.Password;
                return await SaveUserExtendedAndReturnDTOAsync(userExtendedSaveBodyDTO.UserExtendedDTO); // FT: Here we can let Save after update many to many association because we are sure that we will never send 0 from the UI
            });
        }

        protected override void OnBeforeUserExtendedIsMapped(UserExtendedDTO dto)
        {
            //dto.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(dto.Password); // FT: We don't need this because we will read hashed password from the database
        }

        #endregion

    }
}
