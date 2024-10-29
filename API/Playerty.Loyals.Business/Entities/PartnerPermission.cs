﻿using Microsoft.EntityFrameworkCore;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    [Index(nameof(Code), IsUnique = true)]
    public class PartnerPermission : ReadonlyObject<int>
    {
        [SoftDisplayName]
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }

        [StringLength(400, MinimumLength = 1)]
        public string Description { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Code { get; set; }

        public virtual List<PartnerRole> PartnerRoles { get; set; }
    }
}
