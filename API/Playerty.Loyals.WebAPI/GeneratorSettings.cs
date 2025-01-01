using Soft.Generator.Shared.Attributes;

namespace Playerty.Loyals.WebAPI.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\api\api.service.generated.ts")]
        public string NgControllersGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\translates")]
        public string NgTranslatesGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\validators")]
        public string NgValidatorsGenerator { get; set; }

        [Output("true")]
        public bool ControllerGenerator { get; set; }
    }
}