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

namespace Playerty.Loyals.Services
{
    public class LoyalsBusinessService : BusinessBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;

        public LoyalsBusinessService(IApplicationDbContext context, ExcelService excelService)
            : base(context, excelService)
        {
            _context = context;
        }

        public async Task<List<NamebookDTO<int>>> LoadRoleListForUserExtended(long userId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<UserExtended>()
                    .Where(user => user.Id == userId)
                    .SelectMany(user => user.Roles)
                    .Select(role => new NamebookDTO<int>
                    {
                        Id = role.Id,
                        DisplayName = role.Name,
                    })
                    .ToListAsync();
            });
        }

        public async Task<List<NamebookDTO<long>>> LoadUserExtendedListForRole(long roleId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<UserExtended>()
                    .Where(x => x.Roles.Any(x => x.Id == roleId))
                    .Select(x => new NamebookDTO<long>
                    {
                        Id = x.Id,
                        DisplayName = x.Email,
                    })
                    .ToListAsync();
            });
        }
        
    }
}
