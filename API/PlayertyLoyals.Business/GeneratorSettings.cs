using Soft.Generator.Shared.Attributes;

namespace PlayertyLoyals.Business.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output(@"E:\Projects\PlayertyLoyals\Angular\src\app\business\entities")]
        public string NgEntitiesGenerator { get; set; }

        [Output(@"E:\Projects\PlayertyLoyals\Angular\src\app\business\enums")]
        public string NgEnumsGenerator { get; set; }
    }
}