using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.DTO
{
    public class SegmentationSaveBodyDTO
    {
        public SegmentationDTO SegmentationDTO { get; set; }
        public List<SegmentationItemDTO> SegmentationItemsDTO { get; set; }
    }
}
