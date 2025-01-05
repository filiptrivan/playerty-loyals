using Microsoft.EntityFrameworkCore;
using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.Attributes.EF;
using Soft.Generator.Shared.Attributes.EF.Translation;
using Soft.Generator.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace PlayertyLoyals.Business.Entities
{
    [TranslateSingularSrLatnRS("Korisnik")]
    [Index(nameof(Email), IsUnique = true)]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [TranslateSingularSrLatnRS("Email")]
        [SoftDisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        public bool? HasLoggedInWithExternalProvider { get; set; }

        [TranslateSingularSrLatnRS("Obrisano")]
        public bool? IsDisabled { get; set; }

        [TranslateSingularSrLatnRS("Datum rođenja")]
        public DateTime? BirthDate { get; set; }

        /// <summary>
        /// [SET NULL] https://www.learnentityframeworkcore.com/conventions/one-to-many-relationship
        /// </summary>
        [SetNull(nameof(Gender.Users))]
        public virtual Gender Gender { get; set; }

        public virtual List<Role> Roles { get; } = new();

        public virtual List<Notification> Notifications { get; } = new();

        public virtual List<PartnerUser> PartnerUsers { get; } = new();
    }
}
