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
using Microsoft.Extensions.Caching.Memory;

namespace Playerty.Loyals.Business.Services
{
    public class PartnerUserAuthenticationService : BusinessServiceBase
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;

        public PartnerUserAuthenticationService(IApplicationDbContext context, AuthenticationService authenticationService, IHttpContextAccessor httpContextAccessor, IMemoryCache cache)
            : base(context)
        {
            _context = context;
            _authenticationService = authenticationService;
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
        }

        public string GetCurrentPartnerCode()
        {
            return _httpContextAccessor.HttpContext.Request.Headers[SettingsProvider.Current.PartnerHeadersKey];
        }

        public async Task<PartnerDTO> GetCurrentPartnerDTO()
        {
            string cacheKey = $"Partner_{GetCurrentPartnerCode()}";

            if (!_cache.TryGetValue(cacheKey, out PartnerDTO partnerDTO))
            {
                partnerDTO = await _context.WithTransactionAsync(async () =>
                {
                    string partnerCode = GetCurrentPartnerCode();
                    return await _context.DbSet<Partner>()
                        .Where(x => x.Slug == partnerCode)
                        .ProjectToType<PartnerDTO>(Mapper.PartnerProjectToConfig())
                        .SingleOrDefaultAsync();
                });

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(60));

                _cache.Set(cacheKey, partnerDTO, cacheEntryOptions);
            }

            return partnerDTO;
        }

        public async Task<PartnerUser> GetCurrentPartnerUser()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                string partnerCode = GetCurrentPartnerCode();
                string email = _authenticationService.GetCurrentUserEmail();
                return await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == partnerCode && x.Email == email).SingleOrDefaultAsync();
            });
        }

        public async Task<PartnerUserDTO> GetCurrentPartnerUserDTO()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                string partnerCode = GetCurrentPartnerCode();
                string email = _authenticationService.GetCurrentUserEmail();
                return await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == partnerCode && x.Email == email).ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig()).SingleOrDefaultAsync();
            });
        }

    }
}