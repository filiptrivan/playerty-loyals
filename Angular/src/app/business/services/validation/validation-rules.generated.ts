import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { getValidatorBusiness } from './generated/business-validation-rules.generated';
import { getValidatorSecurity } from './generated/security-validation-rules.generated';

export function getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
    let result: SoftValidatorFn = null;

    result = getValidatorBusiness(formControl, className);
    if (result != null)
        return result;

    result = getValidatorSecurity(formControl, className);
    if (result != null)
        return result;

    return result;
}
