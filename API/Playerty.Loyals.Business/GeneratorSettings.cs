using Soft.Generator.Shared.Attributes;

namespace Playerty.Loyals.GeneratorSettings
{
    public class GeneratorSettings
    {

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\entities\generated")]
        public string NgEntitiesGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\enums\generated")]
        public string NgEnumsGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\translates\generated")]
        public string NgTranslatesGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\validation\generated")]
        public string NgValidatorsGenerator { get; set; }
    }
}