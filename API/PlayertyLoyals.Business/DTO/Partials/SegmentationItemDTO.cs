﻿using Spider.Shared.Attributes.EF.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.DTO
{
    public partial class SegmentationItemDTO
    {
        [UIDoNotGenerate]
        /// <summary>
        /// FT: Using only on the client
        /// </summary>
        public bool? Checked { get; set; }
    }
}
