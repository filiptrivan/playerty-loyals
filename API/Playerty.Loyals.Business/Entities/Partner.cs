using Nucleus.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    public class Partner : BusinessObject<int>
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string LoadPurchasesEndpoint { get; set; }
        public string LoadReversalsEndpoint { get; set; }
        public int UpdatePointsInterval { get; set; } 
        public byte[] LogoImage { get; set; } // https://stackoverflow.com/questions/5613898/storing-images-in-sql-server
        public List<UserExtended> Users { get; set; }
    }
}
