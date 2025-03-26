using Microsoft.EntityFrameworkCore;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    [ProjectToDTO(".Map(dest => dest.TransactionPrice, src => src.Transaction.Price)")]
    public class Achievement : BusinessObject<long>
    {
        [Required]
        public int Points { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [ManyToOneRequired]
        [WithMany(nameof(PartnerUser.Achievements))]
        public virtual PartnerUser PartnerUser { get; set; }

        [CascadeDelete]
        [WithMany(nameof(Transaction.Achievements))]
        public virtual Transaction Transaction { get; set; }
    }
}
