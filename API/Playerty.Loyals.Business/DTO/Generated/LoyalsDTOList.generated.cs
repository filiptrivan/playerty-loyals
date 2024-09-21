using Soft.Generator.Shared.DTO;

namespace Playerty.Loyals.Business.DTO // FT: Don't change namespace in generator, it's mandatory for partial classes
{
    public partial class BrandDTO : BusinessObjectDTO<int>
    {
        public string Name { get; set; }
		public string Code { get; set; }
		public decimal? PointsMultiplier { get; set; }
    }
    public partial class TierDTO : BusinessObjectDTO<int>
    {
        public string Name { get; set; }
		public int? Discount { get; set; }
		public int? ValidFrom { get; set; }
		public int? ValidTo { get; set; }
    }
    public partial class TransactionDTO : BusinessObjectDTO<long>
    {
        public Guid? Guid { get; set; }
		public decimal? Price { get; set; }
		public int? Points { get; set; }
    }
    public partial class TransactionStatusDTO : ReadonlyObjectDTO<byte>
    {
        public string Name { get; set; }
		public string Code { get; set; }
    }
    public partial class UserExtendedDTO : BusinessObjectDTO<long>
    {
        public string Email { get; set; }
		public string Password { get; set; }
		public bool? HasLoggedInWithExternalProvider { get; set; }
		public int? NumberOfFailedAttemptsInARow { get; set; }
		public int? Points { get; set; }
		public string TierDisplayName { get; set; }
		public int? TierId { get; set; }
    }
}

