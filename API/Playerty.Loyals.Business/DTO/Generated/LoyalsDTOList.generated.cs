using Soft.Generator.Shared.DTO;

namespace Playerty.Loyals.Business.DTO // FT: Don't change namespace in generator, it's mandatory for partial classes
{
    public partial class UserExtendedDTO : BusinessObjectDTO<long>
    {
        public string Email { get; set; }
		public string Password { get; set; }
		public bool? HasLoggedInWithExternalProvider { get; set; }
		public int? NumberOfFailedAttemptsInARow { get; set; }
		public int? Points { get; set; }
    }
}

