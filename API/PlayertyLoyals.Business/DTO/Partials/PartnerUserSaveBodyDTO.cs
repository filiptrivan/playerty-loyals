using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public partial class PartnerUserSaveBodyDTO
    {
        public List<long> SelectedSegmentationItemsIds { get; set; }

        public DateTime? BirthDate { get; set; }
        public int? GenderId { get; set; }
    }
}
