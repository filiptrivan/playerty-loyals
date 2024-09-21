import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorLoyals(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){
        case 'nameBrand':
            return nameBrandValidator(formControl);
        case 'codeBrand':
            return codeBrandValidator(formControl);
        case 'pointsMultiplierBrand':
            return pointsMultiplierBrandValidator(formControl);

        case 'nameTransactionStatus':
            return nameTransactionStatusValidator(formControl);
        case 'codeTransactionStatus':
            return codeTransactionStatusValidator(formControl);

        case 'emailUserExtended':
            return emailUserExtendedValidator(formControl);
        case 'passwordUserExtended':
            return passwordUserExtendedValidator(formControl);
        case 'hasLoggedInWithExternalProviderUserExtended':
            return hasLoggedInWithExternalProviderUserExtendedValidator(formControl);
        case 'numberOfFailedAttemptsInARowUserExtended':
            return numberOfFailedAttemptsInARowUserExtendedValidator(formControl);
        case 'pointsUserExtended':
            return pointsUserExtendedValidator(formControl);
        case 'tierIdUserExtended':
            return tierIdUserExtendedValidator(formControl);

        case 'nameTier':
            return nameTierValidator(formControl);
        case 'discountTier':
            return discountTierValidator(formControl);


        default:
            return null;
    }
}

export function nameBrandValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function codeBrandValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const codeValid = notEmptyRule && stringLengthRule;

        return codeValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function pointsMultiplierBrandValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const pointsMultiplierValid = notEmptyRule;

        return pointsMultiplierValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function codeTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const codeValid = notEmptyRule && stringLengthRule;

        return codeValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function emailUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

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
        const value = control.value ?? "";

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
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const hasLoggedInWithExternalProviderValid = notEmptyRule;

        return hasLoggedInWithExternalProviderValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function numberOfFailedAttemptsInARowUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const numberOfFailedAttemptsInARowValid = notEmptyRule;

        return numberOfFailedAttemptsInARowValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function pointsUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const pointsValid = notEmptyRule;

        return pointsValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function tierIdUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const tierIdValid = notEmptyRule;

        return tierIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function discountTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const discountValid = notEmptyRule;

        return discountValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}




