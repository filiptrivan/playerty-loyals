using Microsoft.AspNetCore.Http;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.Interfaces;
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

        public WingsApiService(IApplicationDbContext context) 
        {
            _context = context;
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
                new ProductDTO { Id = 1, Name = "Bosch Hilti", Category = "Bosch", Price = 30000, Code = "B-H-2024", LinkToWebsite = "abc", Description = "A reliable and powerful tool for heavy-duty applications, perfect for construction and demolition." },
                new ProductDTO { Id = 2, Name = "Makita Drill", Category = "Makita", Price = 25000, Code = "M-D-2024", LinkToWebsite = "abc", Description = "A compact and versatile drill, ideal for both professionals and DIY enthusiasts." },
                new ProductDTO { Id = 3, Name = "DeWalt Saw", Category = "DeWalt", Price = 35000, Code = "D-S-2024", LinkToWebsite = "abc", Description = "A high-performance saw designed for precision cutting in woodworking and construction." },
                new ProductDTO { Id = 4, Name = "Stanley Hammer", Category = "Stanley", Price = 5000, Code = "S-H-2024", LinkToWebsite = "abc", Description = "A durable and well-balanced hammer, suitable for a wide range of tasks." },
                new ProductDTO { Id = 5, Name = "Bosch Grinder", Category = "Bosch", Price = 15000, Code = "B-G-2024", LinkToWebsite = "abc", Description = "A compact yet powerful grinder, perfect for metalworking and surface preparation." },
                new ProductDTO { Id = 6, Name = "Milwaukee Impact Driver", Category = "Milwaukee", Price = 32000, Code = "M-I-2024", LinkToWebsite = "abc", Description = "A heavy-duty impact driver, built to handle the toughest fastening jobs." },
                new ProductDTO { Id = 7, Name = "Black+Decker Jigsaw", Category = "Black & Decker", Price = 12000, Code = "B-J-2024", LinkToWebsite = "abc", Description = "A versatile jigsaw, ideal for cutting various materials with precision." },
                new ProductDTO { Id = 8, Name = "Hilti Laser Level", Category = "Hilti", Price = 40000, Code = "H-L-2024", LinkToWebsite = "abc", Description = "A highly accurate laser level, perfect for leveling and aligning in construction projects." },
                new ProductDTO { Id = 9, Name = "Ryobi Circular Saw", Category = "Ryobi", Price = 18000, Code = "R-C-2024", LinkToWebsite = "abc", Description = "A lightweight circular saw, great for quick and clean cuts in a variety of materials." },
                //new ProductDTO { Id = 10, Name = "Festool Sander", Brand = "Festool", Price = 28000, Code = "F-S-2024", LinkToWebsite = "abc", Description = "A premium sander, designed for smooth finishes on woodworking projects." },
            };

            return products;
        }
    }
}
