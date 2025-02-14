using Microsoft.AspNetCore.Http;
using Spider.Shared.Interfaces;
using Spider.Shared.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
using Castle.Components.DictionaryAdapter.Xml;
using Castle.DynamicProxy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System.CodeDom.Compiler;
using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Security.Policy;

namespace PlayertyLoyals.Business.Services
{
    public class PartnerUserAuthenticationService : BusinessServiceBase
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;
        private readonly BlobContainerClient _blobContainerClient;

        public PartnerUserAuthenticationService(IApplicationDbContext context, AuthenticationService authenticationService, IHttpContextAccessor httpContextAccessor, IMemoryCache cache, BlobContainerClient blobContainerClient)
            : base(context, blobContainerClient)
        {
            _context = context;
            _authenticationService = authenticationService;
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
            _blobContainerClient = blobContainerClient;
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
            // TODO FT: Test how will sql break if i get partner code (slug) from the headers which doesn't exist in the database
            //string cacheKey = $"Partner_{GetCurrentPartnerCode()}";

            // FT: Don't cache anymore because the color could change more frequent, TODO FT: Make better aproach, maybe to cache, but on every save delete from cache

            //if (!_cache.TryGetValue(cacheKey, out PartnerDTO partnerDTO))
            //{
            PartnerDTO partnerDTO = null;
            string partnerCode = GetCurrentPartnerCode();

            await _context.WithTransactionAsync(async () =>
            {
                partnerDTO = await _context.DbSet<Partner>()
                    .AsNoTracking()
                    .Where(x => x.Slug == partnerCode)
                    .ProjectToType<PartnerDTO>(Mapper.PartnerProjectToConfig())
                    .SingleOrDefaultAsync();
            });

            if (partnerDTO != null && !string.IsNullOrEmpty(partnerDTO.LogoImage))
            {
                try
                {
                    BlobClient blobClient = _blobContainerClient.GetBlobClient(partnerDTO.LogoImage);

                    Azure.Response<BlobDownloadResult> blobDownloadInfo = await blobClient.DownloadContentAsync();

                    byte[] byteArray = blobDownloadInfo.Value.Content.ToArray();

                    string base64 = Convert.ToBase64String(byteArray);

                    partnerDTO.LogoImageData = $"filename={partnerDTO.LogoImage};base64,{base64}";
                }
                catch
                {
                    // TODO FT: Log
                }
            }

            //    var cacheEntryOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(60));

            //    _cache.Set(cacheKey, partnerDTO, cacheEntryOptions);
            //}

            return partnerDTO;
        }

        public async Task<Partner> GetCurrentPartner()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<Partner>().Where(x => x.Slug == GetCurrentPartnerCode()).SingleOrDefaultAsync();
            });
        }

        public async Task<PartnerUser> GetCurrentPartnerUser()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>().Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId).SingleOrDefaultAsync();
            });
        }
        public async Task<TierDTO> GetTierDTOForCurrentPartnerUser()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();
            return await _context.WithTransactionAsync(async () =>
            {
                Tier tier = await _context.DbSet<PartnerUser>()
                    .AsNoTracking() // The navigation 'Tier.Partner' cannot be loaded because one or more of the key or foreign key properties are shadow properties and the entity is not being tracked. Relationships using shadow values can only be loaded for tracked entities.
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .Select(x => x.Tier)
                    .SingleOrDefaultAsync();

                if (tier == null)
                    return null;

                return tier.Adapt<TierDTO>(Mapper.TierToDTOConfig());
            });
        }

        public async Task<List<string>> GetCurrentPartnerUserPermissionCodes()
        {
            string partnerCode = GetCurrentPartnerCode();
            long userId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                return await _context.DbSet<PartnerUser>()
                    .Where(x => x.Partner.Slug == partnerCode && x.User.Id == userId)
                    .SelectMany(x => x.PartnerRoles)
                    .SelectMany(x => x.PartnerPermissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToListAsync();
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