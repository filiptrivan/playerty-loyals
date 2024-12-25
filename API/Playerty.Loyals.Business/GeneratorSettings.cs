using Soft.Generator.Shared.Attributes;

namespace Playerty.Loyals.Business.GeneratorSettings
{
    public class GeneratorSettings
    {
        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\entities")]
        public string NgEntitiesGenerator { get; set; }

        [Output(@"E:\Projects\Playerty.Loyals\Angular\src\app\business\enums")]
        public string NgEnumsGenerator { get; set; }
    }
}