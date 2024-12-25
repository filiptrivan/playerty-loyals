using Soft.Generator.Shared.Attributes;

namespace Playerty.Loyals.Infrastructure.GeneratorSettings
{
    public class GeneratorSettings
    {

        [Output("true")]
        public bool DbContextGenerator { get; set; }
    }
}