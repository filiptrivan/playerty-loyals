using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    public class SegmentationItem : BusinessObject<long>
    {
        // FT: Check in the code that for the same segmentation there is no same segmentation item names, or should we do it? Maybe let the user do what he wants.
        [UIControlWidth("col-12")]
        [DisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [UIDoNotGenerate]
        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired] // FT: The segmentation item can't exist without segmentation
        [WithMany(nameof(Segmentation.SegmentationItems))]
        public virtual Segmentation Segmentation { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new(); // M2M
    }
}
