using Microsoft.AspNetCore.Http;
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

    }
}
