using Microsoft.EntityFrameworkCore;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [SoftDisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        // FT HACK: Password is not required in database because of external provider login, but the DTO property Password is
        [StringLength(80, MinimumLength = 40)]
        public string Password { get; set; }

        [Required]
        public bool HasLoggedInWithExternalProvider { get; set; }

        [Required]
        public int NumberOfFailedAttemptsInARow { get; set; }

        public DateTime? BirthDate { get; set; }

        /// <summary>
        /// [SET NULL] https://www.learnentityframeworkcore.com/conventions/one-to-many-relationship
        /// </summary>
        public virtual Gender Gender { get; set; }

        public virtual List<Role> Roles { get; set; }

        public virtual List<Notification> Notifications { get; set; }

        public virtual List<PartnerUser> PartnerUsers { get; set; }
    }
}
