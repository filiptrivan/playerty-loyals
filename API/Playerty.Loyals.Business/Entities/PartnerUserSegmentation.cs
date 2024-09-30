using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    /// <summary>
    /// List of segmentations for every partner user
    /// </summary>
    public class PartnerUserSegmentation : BusinessObject<long>
    {
        /// <summary>
        /// First time when it becomes true, it will stay forever
        /// </summary>
        public bool IsFilledFirstTime { get; set; }

        public virtual PartnerUser PartnerUser { get; set; }

        public virtual Segmentation Segmentation { get; set; }
    }
}
