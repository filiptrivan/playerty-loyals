using FluentValidation;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.SoftFluentValidation;

namespace Playerty.Loyals.Business.ValidationRules
{
    public class UserExtendedDTOValidationRules : AbstractValidator<UserExtendedDTO>
    {
        public UserExtendedDTOValidationRules()
        {
            RuleFor(x => x.Email).EmailAddress().Length(0, 70).NotEmpty();
			RuleFor(x => x.Password).Length(0, 80);
			RuleFor(x => x.HasLoggedInWithExternalProvider).NotEmpty();
			RuleFor(x => x.NumberOfFailedAttemptsInARow).NotEmpty();
        }
    }
}

