import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorLoyals(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){
        case 'emailUserExtended':
            return emailUserExtendedValidator(formControl);
        case 'passwordUserExtended':
            return passwordUserExtendedValidator(formControl);
        case 'hasLoggedInWithExternalProviderUserExtended':
            return hasLoggedInWithExternalProviderUserExtendedValidator(formControl);
        case 'numberOfFailedAttemptsInARowUserExtended':
            return numberOfFailedAttemptsInARowUserExtendedValidator(formControl);


        case 'namePartner':
            return namePartnerValidator(formControl);
        case 'slugPartner':
            return slugPartnerValidator(formControl);


        case 'titlePartnerNotification':
            return titlePartnerNotificationValidator(formControl);
        case 'titleLatinPartnerNotification':
            return titleLatinPartnerNotificationValidator(formControl);
        case 'descriptionPartnerNotification':
            return descriptionPartnerNotificationValidator(formControl);
        case 'descriptionLatinPartnerNotification':
            return descriptionLatinPartnerNotificationValidator(formControl);

        case 'pointsPartnerUser':
            return pointsPartnerUserValidator(formControl);

        case 'nameTransactionStatus':
            return nameTransactionStatusValidator(formControl);
        case 'nameLatinTransactionStatus':
            return nameLatinTransactionStatusValidator(formControl);
        case 'codeTransactionStatus':
            return codeTransactionStatusValidator(formControl);





        case 'nameGender':
            return nameGenderValidator(formControl);
        case 'nameLatinGender':
            return nameLatinGenderValidator(formControl);


        case 'nameSegmentation':
            return nameSegmentationValidator(formControl);

        case 'nameTier':
            return nameTierValidator(formControl);
        case 'nameLatinTier':
            return nameLatinTierValidator(formControl);
        case 'validFromTier':
            return validFromTierValidator(formControl);
        case 'validToTier':
            return validToTierValidator(formControl);

        case 'productIdTransactionProduct':
            return productIdTransactionProductValidator(formControl);
        case 'transactionIdTransactionProduct':
            return transactionIdTransactionProductValidator(formControl);

        case 'nameSegmentationItem':
            return nameSegmentationItemValidator(formControl);


        case 'guidTransaction':
            return guidTransactionValidator(formControl);
        case 'priceTransaction':
            return priceTransactionValidator(formControl);
        case 'pointsTransaction':
            return pointsTransactionValidator(formControl);
        case 'userIdTransaction':
            return userIdTransactionValidator(formControl);

        case 'partnerIdPartnerRole':
            return partnerIdPartnerRoleValidator(formControl);
        case 'namePartnerRole':
            return namePartnerRoleValidator(formControl);
        case 'descriptionPartnerRole':
            return descriptionPartnerRoleValidator(formControl);


        default:
            return null;
    }
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



export function namePartnerValidator(control: SoftFormControl): SoftValidatorFn {
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

export function slugPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 1;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const slugValid = stringLengthRule;

        return slugValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}



export function titlePartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const titleValid = notEmptyRule && stringLengthRule;

        return titleValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function titleLatinPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const titleLatinValid = notEmptyRule && stringLengthRule;

        return titleLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 400;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionValid = notEmptyRule && stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionLatinPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 400;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionLatinValid = notEmptyRule && stringLengthRule;

        return descriptionLatinValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function pointsPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const pointsValid = notEmptyRule;

        return pointsValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
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






export function nameGenderValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 1;
        const max = 70;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function nameLatinGenderValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 1;
        const max = 70;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameLatinValid = stringLengthRule;

        return nameLatinValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}



export function nameSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 1;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
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


export function nameSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 1;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
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


export function partnerIdPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const partnerIdValid = notEmptyRule;

        return partnerIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function namePartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 0;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 0;
        const max = 400;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionValid = stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}




