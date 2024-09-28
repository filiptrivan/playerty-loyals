using Microsoft.AspNetCore.Http;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Soft.Generator.Security.Services;
using Soft.Generator.Shared.Extensions;
using Playerty.Loyals.Business.Entities;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.DTO;
using Mapster;
using Playerty.Loyals.Business.DataMappers;

namespace Playerty.Loyals.Business.Services
{
    public class PartnerUserAuthenticationService : BusinessServiceBase
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PartnerUserAuthenticationService(IApplicationDbContext context, AuthenticationService authenticationService, IHttpContextAccessor httpContextAccessor)
            : base(context)
        {
            _context = context;
            _authenticationService = authenticationService;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentPartnerCode()
        {
            string code = _httpContextAccessor.HttpContext.Request.Headers[SettingsProvider.Current.PartnerHeadersKey];
            return code;
        }

        public async Task<PartnerUser> GetCurrentPartnerUser()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                string partnerCode = GetCurrentPartnerCode();
                long userId = _authenticationService.GetCurrentUserId();
                return await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId).SingleOrDefaultAsync();
            });
        }

        public async Task<PartnerUserDTO> GetCurrentPartnerUserDTO()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                string partnerCode = GetCurrentPartnerCode();
                long userId = _authenticationService.GetCurrentUserId();
                return await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId).ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig()).SingleOrDefaultAsync();
            });
        }

    }
}