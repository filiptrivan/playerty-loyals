using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.DTO;
using Playerty.Loyals.Business.DTO.Helpers;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Shared.Interfaces;
using Soft.Generator.Shared.SoftExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Services
{
    public class WingsApiService
    {
        private readonly HttpClient _client;
        private readonly IApplicationDbContext _context;
        private readonly PartnerUserAuthenticationService _partnerUserAuthenticationService;

        public WingsApiService(IApplicationDbContext context, PartnerUserAuthenticationService partnerUserAuthenticationService)
        {
            _context = context;
            _partnerUserAuthenticationService = partnerUserAuthenticationService;
        }

        public async Task<List<ExternalTransactionDTO>> GetTransactionList(string transactionsEndpoint, DateTime dateFrom, DateTime dateTo)
        {
            if (transactionsEndpoint == "creative-brackets")
            {
                return new List<ExternalTransactionDTO>
                {
                    new ExternalTransactionDTO { Price = 200.00M, ProductCategoryName = "SG Tools", ProductName = "Dijamant", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                    new ExternalTransactionDTO { Price = 400.00M, ProductCategoryName = "Bosch", ProductName = "Hilti", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                    new ExternalTransactionDTO { Price = -200.00M, ProductCategoryName = "SG Tools", ProductName = "Dijamant", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                };
            }
            else // wings
            {
                return new List<ExternalTransactionDTO>
                {
                    new ExternalTransactionDTO { Price = 500.00M, ProductCategoryName = "Makita", ProductName = "Usisivac", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                    new ExternalTransactionDTO { Price = 1000.00M, ProductCategoryName = "Dewalt", ProductName = "Cekic", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                    new ExternalTransactionDTO { Price = -500.00M, ProductCategoryName = "Makita", ProductName = "Usisivac", UserEmail = "filiptrivan5@gmail.com", BoughtAt = DateTime.Now.AddHours(-2) },
                };
            }
        }

        //public async Task<List<Purchace>> LoadNewPurchacesSinceAsync()
        //{
        //    HttpClient client = new HttpClient();
        //    client.BaseAddress = 
        //    string endpoint = $"/buyings?from={lastRunTime:yyyy-MM-ddTHH:mm:ssZ}";

        //    try
        //    {
        //        // Send request to Wings API to get buyings after the last run time
        //        HttpResponseMessage response = await _client.GetAsync(endpoint);

        //        if (response.IsSuccessStatusCode)
        //        {
        //            string data = await response.Content.ReadAsStringAsync();
        //            Console.WriteLine("New Buyings Data: " + data);

        //            // Process and load buyings (e.g., Deserialize the data)
        //            // var buyings = JsonConvert.DeserializeObject<List<Buying>>(data);
        //            // ProcessBuyings(buyings);
        //        }
        //        else
        //        {
        //            Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Exception caught: {ex.Message}");
        //    }
        //}

        public async Task<List<ProductDTO>> GetRecommendedProductsForTheCurrentPartnerUserAsync()
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


        public List<ProductDTO> GetProductsForTheRecommendationAsync()
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

        /// <summary>
        /// Get discount category list of the current partner.
        /// </summary>
        public async Task<List<DiscountCategoryDTO>> GetDiscountCategoryDTOList()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                var storeTupleList = await _context.DbSet<Store>()
                    .AsNoTracking()
                    .Where(x => x.Partner.Slug == _partnerUserAuthenticationService.GetCurrentPartnerCode())
                    .Select(x => new
                    {
                        Id = x.Id,
                        GetDiscountCategoriesEndpoint = x.GetDiscountCategoriesEndpoint,
                    })
                    .ToListAsync();

                List<DiscountCategoryDTO> discountCategoryDTOList = new List<DiscountCategoryDTO>();

                int count = 0;

                foreach (var store in storeTupleList)
                {
                    List<DiscountCategoryDTO> discountCategoryHelperDTOList = null;

                    if (count == 0)
                    {
                        discountCategoryHelperDTOList = new List<DiscountCategoryDTO>  // change with: api(store.GetDiscountCategoriesEndpoint)...
                        {
                            new DiscountCategoryDTO { Name = "Bosch", Code = "B-H-2024" },
                            new DiscountCategoryDTO { Name = "Makita", Code = "M-D-2024" },
                            new DiscountCategoryDTO { Name = "DeWalt", Code = "D-S-2024" },
                            new DiscountCategoryDTO { Name = "Stanley", Code = "S-H-2024" },
                            new DiscountCategoryDTO { Name = "Bosch", Code = "B-G-2024" },
                            new DiscountCategoryDTO { Name = "Milwaukee", Code = "M-I-2024" },
                            new DiscountCategoryDTO { Name = "Black+Decker", Code = "B-J-2024" },
                            new DiscountCategoryDTO { Name = "Hilti", Code = "H-L-2024" },
                            new DiscountCategoryDTO { Name = "Ryobi", Code = "R-C-2024" },
                        };
                    }
                    else if (count == 1)
                    {
                        discountCategoryHelperDTOList = new List<DiscountCategoryDTO>  // change with: api(store.GetDiscountCategoriesEndpoint)...
                        {
                            new DiscountCategoryDTO { Name = "Nike", Code = "N-I-2024" },
                            new DiscountCategoryDTO { Name = "Addidas", Code = "A-J-2024" },
                            new DiscountCategoryDTO { Name = "Puma", Code = "P-L-2024" },
                            new DiscountCategoryDTO { Name = "Umbro", Code = "U-C-2024" },
                        };
                    }
                    else
                    {
                        break;
                    }

                    if (discountCategoryHelperDTOList.Count != discountCategoryHelperDTOList.DistinctBy(x => x.Code).Count())
                        throw new BusinessException("Partner mora da prosledi jedinstvene kodove za kategorije.");

                    foreach (DiscountCategoryDTO discountCategoryHelperDTO in discountCategoryHelperDTOList)
                        discountCategoryHelperDTO.StoreId = store.Id;

                    discountCategoryDTOList.AddRange(discountCategoryHelperDTOList);

                    count++;
                }

                return discountCategoryDTOList;
            });

        }
    }
}
