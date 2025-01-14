using Soft.Generator.Security.Entities;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.UI;
using PlayertyLoyals.Business.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlayertyLoyals.Business.Entities
{
    public class PartnerNotification : Notification
    {
        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Partner.PartnerNotifications))]
        public virtual Partner Partner { get; set; }

        #region UIColumn
        [UIColumn(nameof(PartnerUserDTO.UserDisplayName))]
        [UIColumn(nameof(PartnerUserDTO.Points))]
        [UIColumn(nameof(PartnerUserDTO.TierDisplayName))]
        [UIColumn(nameof(PartnerUserDTO.CheckedSegmentationItemsCommaSeparated), "Segmentation")]
        [UIColumn(nameof(PartnerUserDTO.CreatedAt))]
        #endregion
        [SimpleManyToManyTableLazyLoad]
        public virtual List<PartnerUser> PartnerUsers { get; } = new(); // M2M
    }
}
