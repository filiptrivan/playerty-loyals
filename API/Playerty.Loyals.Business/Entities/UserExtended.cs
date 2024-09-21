using Soft.Generator.Security.Entities;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Attributes;
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
    public class UserExtended : BusinessObject<long>, IUser
    {
        [SoftDisplayName]
        [CustomValidator("EmailAddress()")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        [Required]
        public int Points { get; set; }

        public virtual Tier Tier { get; set; } // FT: It's not required because when the user just made the account and the administrator didn't make any tiers, he can't be any

        public virtual List<Role> Roles { get; set; }
    }
}
