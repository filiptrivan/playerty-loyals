import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorBusines(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){

        case 'nameBrand':
            return nameBrandValidator(formControl);
        case 'nameLatinBrand':
            return nameLatinBrandValidator(formControl);
        case 'codeBrand':
            return codeBrandValidator(formControl);
        case 'pointsMultiplierBrand':
            return pointsMultiplierBrandValidator(formControl);

        case 'nameTransactionStatus':
            return nameTransactionStatusValidator(formControl);
        case 'nameLatinTransactionStatus':
            return nameLatinTransactionStatusValidator(formControl);
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

        case 'guidTransaction':
            return guidTransactionValidator(formControl);
        case 'priceTransaction':
            return priceTransactionValidator(formControl);
        case 'pointsTransaction':
            return pointsTransactionValidator(formControl);

        case 'nameTier':
            return nameTierValidator(formControl);
        case 'nameLatinTier':
            return nameLatinTierValidator(formControl);
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
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function nameLatinBrandValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameLatinValid = notEmptyRule && stringLengthRule;

        return nameLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function codeBrandValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
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
        const precision = 10;
        const scale = 1;
        const ignoreTrailingZeros = false;
        const precisionScaleRule = validatePrecisionScale(value, precision, scale, ignoreTrailingZeros);

        const pointsMultiplierValid = notEmptyRule && precisionScaleRule;

        return pointsMultiplierValid ? null : { _ : $localize`:@@NotEmptyPrecisionScale:The field is mandatory and must have a total number of ${precision} digits, and the number of digits after the decimal point must not exceed ${scale}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function nameLatinTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameLatinValid = notEmptyRule && stringLengthRule;

        return nameLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function codeTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
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
        const min = 5;
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

        const min = 40;
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


export function guidTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const guidValid = notEmptyRule;

        return guidValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function priceTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const precision = 16;
        const scale = 2;
        const ignoreTrailingZeros = false;
        const precisionScaleRule = validatePrecisionScale(value, precision, scale, ignoreTrailingZeros);

        const priceValid = notEmptyRule && precisionScaleRule;

        return priceValid ? null : { _ : $localize`:@@NotEmptyPrecisionScale:The field is mandatory and must have a total number of ${precision} digits, and the number of digits after the decimal point must not exceed ${scale}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function pointsTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const pointsValid = notEmptyRule;

        return pointsValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function nameLatinTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameLatinValid = notEmptyRule && stringLengthRule;

        return nameLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
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



