import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorLoyals(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){


        case 'titleNotification':
            return titleNotificationValidator(formControl);
        case 'titleLatinNotification':
            return titleLatinNotificationValidator(formControl);
        case 'descriptionNotification':
            return descriptionNotificationValidator(formControl);
        case 'descriptionLatinNotification':
            return descriptionLatinNotificationValidator(formControl);

        case 'nameTier':
            return nameTierValidator(formControl);
        case 'nameLatinTier':
            return nameLatinTierValidator(formControl);
        case 'discountTier':
            return discountTierValidator(formControl);
        case 'validFromTier':
            return validFromTierValidator(formControl);
        case 'validToTier':
            return validToTierValidator(formControl);

        case 'guidTransaction':
            return guidTransactionValidator(formControl);
        case 'priceTransaction':
            return priceTransactionValidator(formControl);
        case 'pointsTransaction':
            return pointsTransactionValidator(formControl);
        case 'userIdTransaction':
            return userIdTransactionValidator(formControl);

        case 'productIdTransactionProduct':
            return productIdTransactionProductValidator(formControl);
        case 'transactionIdTransactionProduct':
            return transactionIdTransactionProductValidator(formControl);

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





        default:
            return null;
    }
}



export function titleNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 60;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const titleValid = notEmptyRule && stringLengthRule;

        return titleValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function titleLatinNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 60;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const titleLatinValid = notEmptyRule && stringLengthRule;

        return titleLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionValid = notEmptyRule && stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionLatinNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionLatinValid = notEmptyRule && stringLengthRule;

        return descriptionLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
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
        const max = 100;
        const numberMaxRangeRule = value <= max;
        const min = 0;
        const numberMinRangeRule = value >= min;

        const discountValid = notEmptyRule && numberMaxRangeRule && numberMinRangeRule;

        return discountValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMaxNumberRangeMin:The field is mandatory, must be less or equal ${max} and must be greater or equal ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function validFromTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const numberMinRangeRule = value >= min;

        const validFromValid = notEmptyRule && numberMinRangeRule;

        return validFromValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function validToTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const numberMinRangeRule = value >= min;

        const validToValid = notEmptyRule && numberMinRangeRule;

        return validToValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal ${min}.` };
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

export function userIdTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const userIdValid = notEmptyRule;

        return userIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function productIdTransactionProductValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const productIdValid = notEmptyRule;

        return productIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function transactionIdTransactionProductValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const transactionIdValid = notEmptyRule;

        return transactionIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
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







