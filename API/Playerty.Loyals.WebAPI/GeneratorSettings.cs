using Soft.Generator.Shared.Attributes;

namespace Soft.Generator.Security.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\api\api.service.generated.ts")]
        public string NgControllersGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\translates\generated")]
        public string NgTranslatesGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\validation\generated")]
        public string NgValidatorsGenerator { get; set; }
    }
}