using Spider.Shared.Attributes;

namespace PlayertyLoyals.Infrastructure.GeneratorSettings
{
    public class GeneratorSettings
    {

        [Output("true")]
        public bool DbContextGenerator { get; set; }
    }
}