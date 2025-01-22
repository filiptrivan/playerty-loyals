﻿using Microsoft.EntityFrameworkCore;
using Spider.Security.Interface;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Entities
{
    [UIDoNotGenerate]
    [Index(nameof(Code), IsUnique = true)]
    public class PartnerPermission : ReadonlyObject<int>
    {
        [DisplayName]
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Code { get; set; }

        public virtual List<PartnerRole> PartnerRoles { get; } = new(); // M2M
    }
}
