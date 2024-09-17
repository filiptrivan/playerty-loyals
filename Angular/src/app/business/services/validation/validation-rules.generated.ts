import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { getValidatorSecurity } from './generated/security-validation-rules.generated';

export function getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
    let result: SoftValidatorFn = null;

    result = getValidatorSecurity(formControl, className);
    if (result != null)
        return result;

    return result;
}
