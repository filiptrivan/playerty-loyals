using Playerty.Loyals.Business.Entities;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using Soft.Generator.Shared.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class ProductDTO
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public decimal Price { get; set; }

        public BrandDTO Brand { get; set; }
    }
}
