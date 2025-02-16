using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayertyLoyals.Business.Enums
{
    public static partial class BusinessPermissionCodes
    {
        /// <summary>
        /// FT HACK: Made for partner permission
        /// </summary>
        public static string ReadCurrentPartner { get; } = "ReadCurrentPartner";

        /// <summary>
        /// FT HACK: Made for partner permission
        /// </summary>
        public static string UpdateCurrentPartner { get; } = "UpdateCurrentPartner";
    }
}
