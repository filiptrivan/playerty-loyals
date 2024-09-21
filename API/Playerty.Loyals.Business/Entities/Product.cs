//using Soft.Generator.Shared.Attributes;
//using Soft.Generator.Shared.BaseEntities;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Playerty.Loyals.Business.Entities
//{
//    [NotMapped]
//    public class Product : ReadonlyObject<long>
//    {
//        public long FakeIdForTest {  get; set; }

//        [SoftDisplayName]
//        public string Name { get; set; }

//        public string Code { get; set; }

//        public decimal Price { get; set; }

//        public virtual Brand Brand { get; set; }

//        public virtual List<Transaction> Transactions { get; set; }
//    }
//}
