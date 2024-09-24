using FluentValidation;
using Playerty.Loyals.Business.DTO;
using Soft.Generator.Shared.SoftFluentValidation;

namespace Playerty.Loyals.Business.ValidationRules
{
    public class TierDTOValidationRules : AbstractValidator<TierDTO>
    {
        public TierDTOValidationRules()
        {
            RuleFor(x => x.Name).Length(1, 255).NotEmpty();
			RuleFor(x => x.NameLatin).Length(1, 255).NotEmpty();
			RuleFor(x => x.Discount).GreaterThanOrEqualTo(0).LessThanOrEqualTo(100).NotEmpty();
			RuleFor(x => x.ValidFrom).GreaterThanOrEqualTo(0).NotEmpty();
			RuleFor(x => x.ValidTo).GreaterThanOrEqualTo(0).NotEmpty();
        }
    }
    public class TransactionDTOValidationRules : AbstractValidator<TransactionDTO>
    {
        public TransactionDTOValidationRules()
        {
            RuleFor(x => x.Guid).NotEmpty();
			RuleFor(x => x.Price).PrecisionScale(16, 2, false).NotEmpty();
			RuleFor(x => x.Points).NotEmpty();
			RuleFor(x => x.UserId).NotEmpty();
        }
    }
    public class TransactionProductDTOValidationRules : AbstractValidator<TransactionProductDTO>
    {
        public TransactionProductDTOValidationRules()
        {
            RuleFor(x => x.ProductId).NotEmpty();
			RuleFor(x => x.TransactionId).NotEmpty();
        }
    }
    public class TransactionStatusDTOValidationRules : AbstractValidator<TransactionStatusDTO>
    {
        public TransactionStatusDTOValidationRules()
        {
            RuleFor(x => x.Name).Length(1, 255).NotEmpty();
			RuleFor(x => x.NameLatin).Length(1, 255).NotEmpty();
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
        }
    }
    public class BrandDTOValidationRules : AbstractValidator<BrandDTO>
    {
        public BrandDTOValidationRules()
        {
            
        }
    }
    public class OnlineShopDTOValidationRules : AbstractValidator<OnlineShopDTO>
    {
        public OnlineShopDTOValidationRules()
        {
            
        }
    }
    public class ProductDTOValidationRules : AbstractValidator<ProductDTO>
    {
        public ProductDTOValidationRules()
        {
            
        }
    }
    public class QrCodeDTOValidationRules : AbstractValidator<QrCodeDTO>
    {
        public QrCodeDTOValidationRules()
        {
            
        }
    }
    public class UserExtendedSaveBodyDTOValidationRules : AbstractValidator<UserExtendedSaveBodyDTO>
    {
        public UserExtendedSaveBodyDTOValidationRules()
        {
            
        }
    }
}

