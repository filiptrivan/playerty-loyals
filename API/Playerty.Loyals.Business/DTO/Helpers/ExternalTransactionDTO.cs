using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO.Helpers
{
    /// <summary>
    /// TODO FT: Maybe set all to nullable and validate so you can return good message to the consumer
    /// </summary>
    public class ExternalTransactionDTO
    {
        public string UserEmail { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; }
        public string ProductCategoryName { get; set; }
        public DateTime? BoughtAt { get; set; }
    }
}
