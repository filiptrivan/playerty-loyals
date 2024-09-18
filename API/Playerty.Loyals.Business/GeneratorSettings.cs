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

        [Output(@"E:\Projects\Playerty.Loyals\API\Playerty.Loyals.Business\DataMappers\LoyalsMapper.generated.cs")]
        public string MapperlyGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\API\Playerty.Loyals.Business\DTO\Generated\LoyalsDTOList.generated.cs")]
        public string EntitiesToDTOGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\API\Playerty.Loyals.Business\ValidationRules\LoyalsValidationRules.generated.cs")]
        public string FluentValidationGenerator { get; set; }
    }
}