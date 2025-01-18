using Soft.Generator.Shared.Attributes;

namespace PlayertyLoyals.WebAPI.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output("true")]
        public string ControllerGenerator { get; set; }

        [Output("true")]
        public string TranslationsGenerator { get; set; }
    }
}