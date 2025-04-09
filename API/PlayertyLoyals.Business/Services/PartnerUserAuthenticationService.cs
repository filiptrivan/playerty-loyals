using Microsoft.AspNetCore.Http;
using Spider.Shared.Interfaces;
using Spider.Shared.Services;
using Spider.Security.Services;
using Spider.Shared.Extensions;
using PlayertyLoyals.Business.Entities;
using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.DTO;
using Mapster;
using PlayertyLoyals.Business.DataMappers;
using Microsoft.Extensions.Caching.Memory;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Spider.Shared.Exceptions;
using Serilog;
using Spider.Shared.Helpers;

namespace PlayertyLoyals.Business.Services
{
    public class PartnerUserAuthenticationService : BusinessServiceBase
    {
        private readonly ILogger _logger;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;
        private readonly IFileManager _fileManager;

        public PartnerUserAuthenticationService(
            ILogger logger,
            IApplicationDbContext context,
            AuthenticationService authenticationService,
            IHttpContextAccessor httpContextAccessor,
            IMemoryCache cache,
            IFileManager fileManager
        )
            : base(context)
        {
            _logger = logger;
            _context = context;
            _authenticationService = authenticationService;
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
            _fileManager = fileManager;
        }

        public string GetCurrentPartnerCode()
        {
            return _httpContextAccessor.HttpContext.Request.Headers[SettingsProvider.Current.PartnerHeadersKey];
        }

        public async Task<int> GetCurrentPartnerId()
        {
            // TODO FT: Test how will sql break if i get partner code (slug) from the headers which doesn't exist in the database
            string cacheKey = $"Partner_{GetCurrentPartnerCode()}_Id";

            if (!_cache.TryGetValue(cacheKey, out int partnerId))
            {
                await _context.WithTransactionAsync(async () =>
                {
                    string partnerCode = GetCurrentPartnerCode();
                    partnerId = await _context.DbSet<Partner>()
                        .AsNoTracking()
                        .Where(x => x.Slug == partnerCode)
                        .Select(x => x.Id)
                        .SingleAsync();
                });

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(43200)); // FT: One month, i think it's okay to do this because even if someone hack us and provide the deleted slug of the partner which is in the memory the code will break at some point because there is nothing in the database

                _cache.Set(cacheKey, partnerId, cacheEntryOptions);
            }

            return partnerId;
        }

        public async Task<PartnerDTO> GetCurrentPartnerDTO()
        {
            string partnerCode = GetCurrentPartnerCode();

            if (partnerCode == null)
                return null;

            string cacheKeyDTO = $"Partner_{partnerCode}";
            string cacheKeyRowVersion = $"Partner_RowVersion_{partnerCode}";

            if (_cache.TryGetValue(cacheKeyDTO, out PartnerDTO partnerDTO) == false) // Doesn't exist in the cache
            {
                await _context.WithTransactionAsync(async () =>
                {
                    partnerDTO = await SetPartnerDTOToCache(partnerDTO, null, cacheKeyDTO, cacheKeyRowVersion);
                });
            }
            else // Exists in the cache
            {
                byte[] cachedRowVersion = _cache.Get<byte[]>(cacheKeyRowVersion); // FT: If DTO exists row version should exist

                await _context.WithTransactionAsync(async () =>
                {
                    byte[] dbRowVersion = await GetCurrentPartnerRowVersion();

                    if (cachedRowVersion.SequenceEqual(dbRowVersion) == false)
                        partnerDTO = await SetPartnerDTOToCache(partnerDTO, dbRowVersion, cacheKeyDTO, cacheKeyRowVersion);
                });
            }

            return partnerDTO;
        }

        private async Task<PartnerDTO> SetPartnerDTOToCache(PartnerDTO partnerDTO, byte[] rowVersion, string cacheKeyDTO, string cacheKeyRowVersion)
        {
            string partnerCode = GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                partnerDTO = await _context.DbSet<Partner>()
                    .AsNoTracking()
                    .Where(x => x.Slug == partnerCode)
                    .ProjectToType<PartnerDTO>(Mapper.PartnerProjectToConfig())
                    .SingleOrDefaultAsync(); // FT: Can be null if partner changed slug

                if (partnerDTO != null && rowVersion == null)
                    rowVersion = await GetCurrentPartnerRowVersion();
            });

            if (partnerDTO != null && !string.IsNullOrEmpty(partnerDTO.LogoImage))
            {
                try
                {
                    partnerDTO.LogoImageData = await _fileManager.GetFileDataAsync(partnerDTO.LogoImage);
                }
                catch (Exception ex)
                {
                    _logger.ForContext<PartnerUserAuthenticationService>().Error(
                        ex,
                        "Currently authenticated user: {userEmail} (id: {userId}); Couldn't load partners ({partnerId}) logo image;",
                        _authenticationService.GetCurrentUserEmail(), _authenticationService.GetCurrentUserId(), partnerCode
                    );
                }
            }

            if (partnerDTO == null)
                return null;

            MemoryCacheEntryOptions cacheEntryOptions = new();
            _cache.Set(cacheKeyDTO, partnerDTO, cacheEntryOptions);
            _cache.Set(cacheKeyRowVersion, rowVersion, cacheEntryOptions);

            return partnerDTO;
        }

        private async Task<byte[]> GetCurrentPartnerRowVersion()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Partner>()
                    .AsNoTracking()
                    .Where(x => x.Slug == GetCurrentPartnerCode())
                    .Select(x => x.CacheVersion)
                    .SingleAsync();
            });
        }

        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            if (partnerCode == null)
                return new List<string>();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .SelectMany(x => x.PartnerRoles)
                    .SelectMany(x => x.PartnerPermissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToListAsync();
            });
        }

        public async Task<int> GetPointsForCurrentPartnerUser()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .Select(x => x.Points)
                    .SingleAsync();
            });
        }

        public async Task<long> GetCurrentPartnerUserId()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                long partnerUserId = await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .Select(x => x.Id)
                    .SingleOrDefaultAsync();

                if (partnerUserId == 0)
                {
                    // TODO FT: Log more explanatory message with ids
                    throw new BusinessException("Profil za partnera traženog korisnika nije pronađen, možda je obrisan u međuvremenu.");
                }

                return partnerUserId;
            });
        }

        public async Task<PartnerUserDTO> GetCurrentPartnerUserDTO()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .ProjectToType<PartnerUserDTO>(Mapper.PartnerUserProjectToConfig())
                    .SingleOrDefaultAsync();
            });
        }

    }
}