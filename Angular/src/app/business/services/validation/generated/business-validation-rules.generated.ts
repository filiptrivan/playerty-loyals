import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorBusiness(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){
        case 'nameGender':
            return nameGenderValidator(formControl);

        case 'nameSegmentationItem':
            return nameSegmentationItemValidator(formControl);
        case 'orderNumberSegmentationItem':
            return orderNumberSegmentationItemValidator(formControl);
        case 'segmentationIdSegmentationItem':
            return segmentationIdSegmentationItemValidator(formControl);



        case 'productIdTransactionProduct':
            return productIdTransactionProductValidator(formControl);
        case 'transactionIdTransactionProduct':
            return transactionIdTransactionProductValidator(formControl);


        case 'emailUserExtended':
            return emailUserExtendedValidator(formControl);
        case 'passwordUserExtended':
            return passwordUserExtendedValidator(formControl);
        case 'hasLoggedInWithExternalProviderUserExtended':
            return hasLoggedInWithExternalProviderUserExtendedValidator(formControl);
        case 'numberOfFailedAttemptsInARowUserExtended':
            return numberOfFailedAttemptsInARowUserExtendedValidator(formControl);

        case 'nameTransactionStatus':
            return nameTransactionStatusValidator(formControl);
        case 'codeTransactionStatus':
            return codeTransactionStatusValidator(formControl);


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


        case 'titleNotification':
            return titleNotificationValidator(formControl);
        case 'descriptionNotification':
            return descriptionNotificationValidator(formControl);
        case 'emailBodyNotification':
            return emailBodyNotificationValidator(formControl);


        case 'pointsPartnerUser':
            return pointsPartnerUserValidator(formControl);
        case 'hasFilledGenderForTheFirstTimePartnerUser':
            return hasFilledGenderForTheFirstTimePartnerUserValidator(formControl);
        case 'hasFilledBirthDateForTheFirstTimePartnerUser':
            return hasFilledBirthDateForTheFirstTimePartnerUserValidator(formControl);


        case 'partnerIdPartnerNotification':
            return partnerIdPartnerNotificationValidator(formControl);
        case 'titlePartnerNotification':
            return titlePartnerNotificationValidator(formControl);
        case 'descriptionPartnerNotification':
            return descriptionPartnerNotificationValidator(formControl);
        case 'emailBodyPartnerNotification':
            return emailBodyPartnerNotificationValidator(formControl);




        case 'nameSegmentation':
            return nameSegmentationValidator(formControl);
        case 'descriptionSegmentation':
            return descriptionSegmentationValidator(formControl);
        case 'pointsForTheFirstTimeFillSegmentation':
            return pointsForTheFirstTimeFillSegmentationValidator(formControl);
        case 'partnerIdSegmentation':
            return partnerIdSegmentationValidator(formControl);

        case 'namePartner':
            return namePartnerValidator(formControl);
        case 'slugPartner':
            return slugPartnerValidator(formControl);
        case 'updatePointsIntervalPartner':
            return updatePointsIntervalPartnerValidator(formControl);
        case 'logoImagePartner':
            return logoImagePartnerValidator(formControl);
        case 'primaryColorPartner':
            return primaryColorPartnerValidator(formControl);
        case 'pointsForTheFirstTimeGenderFillPartner':
            return pointsForTheFirstTimeGenderFillPartnerValidator(formControl);
        case 'pointsForTheFirstTimeBirthDateFillPartner':
            return pointsForTheFirstTimeBirthDateFillPartnerValidator(formControl);
        case 'loadPurchasesEndpointPartner':
            return loadPurchasesEndpointPartnerValidator(formControl);
        case 'loadReversalsEndpointPartner':
            return loadReversalsEndpointPartnerValidator(formControl);
        case 'createUserEndpointPartner':
            return createUserEndpointPartnerValidator(formControl);
        case 'updateUserGroupEndpointPartner':
            return updateUserGroupEndpointPartnerValidator(formControl);
        case 'productsRecommendationEndpointPartner':
            return productsRecommendationEndpointPartnerValidator(formControl);



        case 'nameTier':
            return nameTierValidator(formControl);
        case 'descriptionTier':
            return descriptionTierValidator(formControl);
        case 'validFromTier':
            return validFromTierValidator(formControl);
        case 'validToTier':
            return validToTierValidator(formControl);

        default:
            return null;
    }
}

export function nameGenderValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function orderNumberSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const orderNumberValid = notEmptyRule;

        return orderNumberValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function segmentationIdSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const segmentationIdValid = notEmptyRule;

        return segmentationIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}




export function productIdTransactionProductValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const productIdValid = notEmptyRule;

        return productIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function transactionIdTransactionProductValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const transactionIdValid = notEmptyRule;

        return transactionIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



export function emailUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
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

        const min = 40;
        const max = 80;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const passwordValid = stringLengthRule;

        return passwordValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function hasLoggedInWithExternalProviderUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const hasLoggedInWithExternalProviderValid = notEmptyRule;

        return hasLoggedInWithExternalProviderValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function numberOfFailedAttemptsInARowUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const numberOfFailedAttemptsInARowValid = notEmptyRule;

        return numberOfFailedAttemptsInARowValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function nameTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function codeTransactionStatusValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const codeValid = notEmptyRule && stringLengthRule;

        return codeValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



export function guidTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const guidValid = notEmptyRule;

        return guidValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function priceTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const precision = 16;
        const scale = 2;
        const ignoreTrailingZeros = false;
        const precisionScaleRule = validatePrecisionScale(value, precision, scale, ignoreTrailingZeros) || (typeof value === 'undefined' || value === null || value === '');

        const priceValid = notEmptyRule && precisionScaleRule;

        return priceValid ? null : { _ : $localize`:@@NotEmptyPrecisionScale:The field is mandatory and must have a total number of ${precision} digits, and the number of digits after the decimal point must not exceed ${scale}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function pointsTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const pointsValid = notEmptyRule;

        return pointsValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function userIdTransactionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const userIdValid = notEmptyRule;

        return userIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



export function partnerIdPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const partnerIdValid = notEmptyRule;

        return partnerIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function namePartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const length = 100;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringSingleLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptySingleLength:The field is mandatory and must be ${length} character long.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const length = 400;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

        const descriptionValid = stringSingleLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@SingleLength:The field must be ${length} character long.` };
    };
    
    return validator;
}



export function titleNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const titleValid = notEmptyRule && stringLengthRule;

        return titleValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const descriptionValid = notEmptyRule && stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function emailBodyNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const emailBodyValid = stringLengthRule;

        return emailBodyValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}



export function pointsPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const pointsValid = notEmptyRule;

        return pointsValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function hasFilledGenderForTheFirstTimePartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const hasFilledGenderForTheFirstTimeValid = notEmptyRule;

        return hasFilledGenderForTheFirstTimeValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function hasFilledBirthDateForTheFirstTimePartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const hasFilledBirthDateForTheFirstTimeValid = notEmptyRule;

        return hasFilledBirthDateForTheFirstTimeValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



export function partnerIdPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const partnerIdValid = notEmptyRule;

        return partnerIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function titlePartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const titleValid = notEmptyRule && stringLengthRule;

        return titleValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const descriptionValid = notEmptyRule && stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function emailBodyPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const emailBodyValid = stringLengthRule;

        return emailBodyValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}





export function nameSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const descriptionValid = stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function pointsForTheFirstTimeFillSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const pointsForTheFirstTimeFillValid = notEmptyRule && numberMinRangeRule;

        return pointsForTheFirstTimeFillValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal to ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function partnerIdSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

        const partnerIdValid = notEmptyRule;

        return partnerIdValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function namePartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function slugPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const slugValid = notEmptyRule && stringLengthRule;

        return slugValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function updatePointsIntervalPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const updatePointsIntervalValid = numberMinRangeRule;

        return updatePointsIntervalValid ? null : { _ : $localize`:@@NumberRangeMin:The field must be greater or equal to ${min}.` };
    };
    
    return validator;
}

export function logoImagePartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1024;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const logoImageValid = stringLengthRule;

        return logoImageValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function primaryColorPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const length = 7;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

        const primaryColorValid = stringSingleLengthRule;

        return primaryColorValid ? null : { _ : $localize`:@@SingleLength:The field must be ${length} character long.` };
    };
    
    return validator;
}

export function pointsForTheFirstTimeGenderFillPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const pointsForTheFirstTimeGenderFillValid = notEmptyRule && numberMinRangeRule;

        return pointsForTheFirstTimeGenderFillValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal to ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function pointsForTheFirstTimeBirthDateFillPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const pointsForTheFirstTimeBirthDateFillValid = notEmptyRule && numberMinRangeRule;

        return pointsForTheFirstTimeBirthDateFillValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal to ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function loadPurchasesEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const loadPurchasesEndpointValid = stringLengthRule;

        return loadPurchasesEndpointValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function loadReversalsEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const loadReversalsEndpointValid = stringLengthRule;

        return loadReversalsEndpointValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function createUserEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const createUserEndpointValid = stringLengthRule;

        return createUserEndpointValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function updateUserGroupEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const updateUserGroupEndpointValid = stringLengthRule;

        return updateUserGroupEndpointValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}

export function productsRecommendationEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const productsRecommendationEndpointValid = stringLengthRule;

        return productsRecommendationEndpointValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}




export function nameTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const nameValid = notEmptyRule && stringLengthRule;

        return nameValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function descriptionTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

        const descriptionValid = notEmptyRule && stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function validFromTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const validFromValid = notEmptyRule && numberMinRangeRule;

        return validFromValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal to ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function validToTierValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

        const validToValid = notEmptyRule && numberMinRangeRule;

        return validToValid ? null : { _ : $localize`:@@NotEmptyNumberRangeMin:The field is mandatory and must be greater or equal to ${min}.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



