using FluentValidation;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.SoftFluentValidation;

namespace Playerty.Loyals.Business.ValidationRules
{
    public class BrandDTOValidationRules : AbstractValidator<BrandDTO>
    {
        public BrandDTOValidationRules()
        {
            RuleFor(x => x.Name).Length(1, 255).NotEmpty();
			RuleFor(x => x.Code).Length(1, 255).NotEmpty();
			RuleFor(x => x.PointsMultiplier).PrecisionScale(10, 1, false).NotEmpty();
        }
    }
    public class TierDTOValidationRules : AbstractValidator<TierDTO>
    {
        public TierDTOValidationRules()
        {
            RuleFor(x => x.Name).Length(1, 255).NotEmpty();
			RuleFor(x => x.Discount).LessThanOrEqualTo(100).NotEmpty();
        }
    }
    public class TransactionDTOValidationRules : AbstractValidator<TransactionDTO>
    {
        public TransactionDTOValidationRules()
        {
            RuleFor(x => x.Guid).NotEmpty();
			RuleFor(x => x.Price).PrecisionScale(16, 2, false).NotEmpty();
			RuleFor(x => x.Points).NotEmpty();
        }
    }
    public class TransactionStatusDTOValidationRules : AbstractValidator<TransactionStatusDTO>
    {
        public TransactionStatusDTOValidationRules()
        {
            RuleFor(x => x.Name).Length(1, 255).NotEmpty();
			RuleFor(x => x.Code).Length(1, 255).NotEmpty();
        }
    }
    public class UserExtendedDTOValidationRules : AbstractValidator<UserExtendedDTO>
    {
        public UserExtendedDTOValidationRules()
        {
            RuleFor(x => x.Email).EmailAddress().Length(5, 70).NotEmpty();
			RuleFor(x => x.Password).Length(40, 80);
			RuleFor(x => x.HasLoggedInWithExternalProvider).NotEmpty();
			RuleFor(x => x.NumberOfFailedAttemptsInARow).NotEmpty();
			RuleFor(x => x.Points).NotEmpty();
			RuleFor(x => x.TierId).NotEmpty();
        }
    }
    public class UserExtendedSaveBodyDTOValidationRules : AbstractValidator<UserExtendedSaveBodyDTO>
    {
        public UserExtendedSaveBodyDTOValidationRules()
        {
            
        }
    }
}

