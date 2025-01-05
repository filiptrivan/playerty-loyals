using Soft.Generator.Shared.Attributes;

namespace PlayertyLoyals.WebAPI.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output(@"E:\Projects\PlayertyLoyals\Angular\src\app\business\services\api\api.service.generated.ts")]
        public string NgControllersGenerator { get; set; }

        [Output(@"E:\Projects\PlayertyLoyals\Angular\src\app\business\services\translates")]
        public string NgTranslatesGenerator { get; set; }

        [Output(@"E:\Projects\PlayertyLoyals\Angular\src\app\business\services\validators")]
        public string NgValidatorsGenerator { get; set; }

        [Output("true")]
        public string ControllerGenerator { get; set; }

        [Output("true")]
        public string TranslationsGenerator { get; set; }
    }
}