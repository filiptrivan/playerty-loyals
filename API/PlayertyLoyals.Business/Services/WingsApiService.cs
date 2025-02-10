using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.DTO;
using PlayertyLoyals.Business.Entities;
using Spider.Shared.Extensions;
using Spider.Shared.Interfaces;
using Spider.Shared.Exceptions;
using PlayertyLoyals.Business.ValidationRules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;

namespace PlayertyLoyals.Business.Services
{
    public class WingsApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public WingsApiService(HttpClient httpClient, IApplicationDbContext context, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _httpClient = httpClient;
            _context = context;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        public async Task<List<ExternalTransactionDTO>> GetExternalTransactionDTOList(string transactionsEndpoint, DateTime dateFrom, DateTime dateTo)
        {
            string url = $"{transactionsEndpoint}/?dateFrom={dateFrom:o}&dateTo={dateTo:o}";

            HttpResponseMessage response = null;

            try
            {
                response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                HandleExternalApiException(ex);
            }

            List<ExternalTransactionDTO> externalTransactionDTOList = await response.Content.ReadFromJsonAsync<List<ExternalTransactionDTO>>();

            List<string> validationErrorMessages = new();

            foreach (ExternalTransactionDTO externalTransactionDTO in externalTransactionDTOList)
            {
                ExternalTransactionDTOValidationRules validationRules = new ExternalTransactionDTOValidationRules();
                ValidationResult validationResult = validationRules.Validate(externalTransactionDTO);

                foreach (ValidationFailure validationFailure in validationResult.Errors)
                {
                    if (validationErrorMessages.Contains(validationFailure.ErrorMessage) == false)
                        validationErrorMessages.Add(validationFailure.ErrorMessage);
                }
            }

            if (validationErrorMessages.Count > 0)
                throw new BusinessException($"Došlo je do grešaka prilikom validacije podataka za obradu transakcija:<br/>    {string.Join("<br/>    ", validationErrorMessages)}");

            return externalTransactionDTOList;
        }

        /// <summary>
        /// Get discount category list of the current partner.
        /// </summary>
        public async Task<List<ExternalDiscountProductGroupDTO>> GetExternalDiscountProductGroupDTOList(BusinessSystem businessSystem)
        {
            string url = businessSystem.GetDiscountProductGroupsEndpoint;

            HttpResponseMessage response = null;

            try
            {
                response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                HandleExternalApiException(ex);
            }

            List<ExternalDiscountProductGroupDTO> externalDiscountProductGroupDTOList = await response.Content.ReadFromJsonAsync<List<ExternalDiscountProductGroupDTO>>();

            if (externalDiscountProductGroupDTOList.Count != externalDiscountProductGroupDTOList.DistinctBy(x => x.Code).Count())
                throw new BusinessException("Partner mora da prosledi jedinstvene kodove za kategorije.");

            List<string> validationErrorMessages = new();

            foreach (ExternalDiscountProductGroupDTO externalDiscountProductGroupDTO in externalDiscountProductGroupDTOList)
            {
                ExternalDiscountProductGroupDTOValidationRules validationRules = new ExternalDiscountProductGroupDTOValidationRules();
                ValidationResult validationResult = validationRules.Validate(externalDiscountProductGroupDTO);

                foreach (ValidationFailure validationFailure in validationResult.Errors)
                {
                    if (validationErrorMessages.Contains(validationFailure.ErrorMessage) == false)
                        validationErrorMessages.Add(validationFailure.ErrorMessage);
                }
            }

            if (validationErrorMessages.Count > 0)
                throw new BusinessException($"Došlo je do grešaka prilikom validacije podataka za preuzimanje kategorija:    {string.Join("    ", validationErrorMessages)}");

            return externalDiscountProductGroupDTOList;
        }

        public void HandleExternalApiException(Exception ex)
        {
            if (ex is HttpRequestException)
            {
                throw new BusinessException("Došlo je do greške prilikom HTTP zahteva. Proverite URL i mrežnu konekciju.");
            }
            else if (ex is TaskCanceledException timeoutEx && !timeoutEx.CancellationToken.IsCancellationRequested)
            {
                throw new BusinessException("Zahtev je istekao. Proverite mrežnu konekciju servera.");
            }
            else if (ex is TaskCanceledException canceledEx && canceledEx.CancellationToken.IsCancellationRequested)
            {
                throw new BusinessException("Zahtev je otkazan. Proverite da li je zahtev ručno prekinut ili pokušajte ponovo.");
            }
            else if (ex is InvalidOperationException)
            {
                throw new BusinessException("Došlo je do greške u konfiguraciji klijenta ili zahteva. Obratite se podršci.");
            }
            else if (ex is OperationCanceledException)
            {
                throw new BusinessException("Operacija je prekinuta. Pokušajte ponovo.");
            }
            else
            {
                throw new BusinessException("Došlo je do neočekivane greške. Obratite se podršci.");
            }
        }

        public async Task<List<ProductDTO>> GetRecommendedProductListForCurrentPartnerUserAsync()
        {
            //HttpClient client = new HttpClient();
            //client.BaseAddress =
            //string endpoint = $"/buyings?from={lastRunTime:yyyy-MM-ddTHH:mm:ssZ}";

            //try
            //{

            //}
            //catch (Exception ex)
            //{
            //}

            return null;
        }

        public List<ProductDTO> GetProductListForRecommendationAsync()
        {
            List<ProductDTO> products = new List<ProductDTO>
            {
                new ProductDTO { Id = 1, Name = "Bosch Hilti", Category = "Bosch", Price = 30000, Code = "B-H-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Pouzdan i snažan alat za teške primene, savršen za građevinske i demontažne radove." },
                new ProductDTO { Id = 2, Name = "Makita Bušilica", Category = "Makita", Price = 25000, Code = "M-D-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Kompaktna i svestrana bušilica, idealna za profesionalce i entuzijaste za DIY." },
                new ProductDTO { Id = 3, Name = "DeWalt Testera", Category = "DeWalt", Price = 35000, Code = "D-S-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Visoko performansna testera dizajnirana za precizno sečenje u drvnom radu i građevini." },
                new ProductDTO { Id = 4, Name = "Stanley Čekić", Category = "Stanley", Price = 5000, Code = "S-H-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Izdržljiv i dobro izbalansiran čekić, pogodan za širok spektar zadataka." },
                new ProductDTO { Id = 5, Name = "Bosch Brusilica", Category = "Bosch", Price = 15000, Code = "B-G-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Kompaktna, ali moćna brusilica, savršena za obradu metala i pripremu površina." },
                new ProductDTO { Id = 6, Name = "Milwaukee Udarna Bušilica", Category = "Milwaukee", Price = 32000, Code = "M-I-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Teška udarna bušilica, dizajnirana za najteže poslove pričvršćivanja." },
                new ProductDTO { Id = 7, Name = "Black+Decker Električna Testera", Category = "Black & Decker", Price = 12000, Code = "B-J-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Svestrana električna testera, idealna za precizno sečenje različitih materijala." },
                new ProductDTO { Id = 8, Name = "Hilti Laserska Libela", Category = "Hilti", Price = 40000, Code = "H-L-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Veoma precizna laserska libela, savršena za nivelisanje i poravnavanje u građevinskim projektima." },
                new ProductDTO { Id = 9, Name = "Ryobi Okrugla Testera", Category = "Ryobi", Price = 18000, Code = "R-C-2024", LinkToWebsite = "https://www.prodavnicaalata.rs", Description = "Lagana okrugla testera, odlična za brza i čista sečenja u različitim materijalima." },
                //new ProductDTO { Id = 10, Name = "Festool Sander", Brand = "Festool", Price = 28000, Code = "F-S-2024", LinkToWebsite = "abc", Description = "A premium sander, designed for smooth finishes on woodworking projects." },
            };

            return products;
        }
    }
}
