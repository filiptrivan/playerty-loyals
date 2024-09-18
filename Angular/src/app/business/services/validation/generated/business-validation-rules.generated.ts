import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorBusiness(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){
        case 'emailUserExtended':
            return emailUserExtendedValidator(formControl);
        case 'passwordUserExtended':
            return passwordUserExtendedValidator(formControl);
        case 'hasLoggedInWithExternalProviderUserExtended':
            return hasLoggedInWithExternalProviderUserExtendedValidator(formControl);
        case 'numberOfFailedAttemptsInARowUserExtended':
            return numberOfFailedAttemptsInARowUserExtendedValidator(formControl);

        default:
            return null;
    }
}

export function emailUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 70;
        const stringLengthRule = value?.length >= min && value?.length <= max;
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

        return emailValid ? null : { _ : $localize`:@@NotEmptyLengthEmailAddress:The field is mandatory, must have a minimum of ${min} and a maximum of ${max} characters and must be a valid email address.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function passwordUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 0;
        const max = 80;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const passwordValid = stringLengthRule;

        return passwordValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function hasLoggedInWithExternalProviderUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const hasLoggedInWithExternalProviderValid = notEmptyRule;

        return hasLoggedInWithExternalProviderValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function numberOfFailedAttemptsInARowUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const numberOfFailedAttemptsInARowValid = notEmptyRule;

        return numberOfFailedAttemptsInARowValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



