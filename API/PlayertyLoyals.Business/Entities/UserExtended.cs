﻿using Microsoft.EntityFrameworkCore;
using Spider.Security.Entities;
using Spider.Security.Interfaces;
using Spider.Shared.Attributes;
using Spider.Shared.Attributes.EF;
using Spider.Shared.Attributes.EF.UI;
using Spider.Shared.BaseEntities;
using Spider.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [UIDoNotGenerate]
        [UIControlWidth("col-12")]
        [DisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        public bool? HasLoggedInWithExternalProvider { get; set; }

        public bool? IsDisabled { get; set; }

        public DateTime? BirthDate { get; set; }

        //public bool? AccessedTheSystem { get; set; }

        /// <summary>
        /// [SET NULL] https://www.learnentityframeworkcore.com/conventions/one-to-many-relationship
        /// </summary>
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        [SetNull]
        [WithMany(nameof(Gender.Users))]
        public virtual Gender Gender { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; } = new();

        [ExcludeServiceMethodsFromGeneration]
        public virtual List<Role> Roles { get; } = new(); // M2M

        public virtual List<Notification> Notifications { get; } = new(); // M2M
    }
}
