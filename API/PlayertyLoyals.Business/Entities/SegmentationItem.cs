using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    public class SegmentationItem : BusinessObject<long>
    {
        // FT: Check in the code that for the same segmentation there is no same segmentation item names, or should we do it? Maybe let the user do what he wants.
        [SoftDisplayName]
        [StringLength(100, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        [Required]
        public int OrderNumber { get; set; }

        [ManyToOneRequired(nameof(Segmentation.SegmentationItems))] // FT: The segmentation item can't exist without segmentation
        public virtual Segmentation Segmentation { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new();
    }
}
