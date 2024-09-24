import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';

export function getValidatorSecurity(formControl: SoftFormControl, className: string): SoftValidatorFn {
    switch(formControl.label + className){


        case 'verificationCodeVerificationTokenRequest':
            return verificationCodeVerificationTokenRequestValidator(formControl);
        case 'emailVerificationTokenRequest':
            return emailVerificationTokenRequestValidator(formControl);

        case 'passwordUser':
            return passwordUserValidator(formControl);
        case 'emailUser':
            return emailUserValidator(formControl);
        case 'hasLoggedInWithExternalProviderUser':
            return hasLoggedInWithExternalProviderUserValidator(formControl);
        case 'numberOfFailedAttemptsInARowUser':
            return numberOfFailedAttemptsInARowUserValidator(formControl);
        case 'isVerifiedUser':
            return isVerifiedUserValidator(formControl);

        case 'namePermission':
            return namePermissionValidator(formControl);
        case 'descriptionPermission':
            return descriptionPermissionValidator(formControl);

        case 'nameRole':
            return nameRoleValidator(formControl);
        case 'descriptionRole':
            return descriptionRoleValidator(formControl);





        case 'emailRegistration':
            return emailRegistrationValidator(formControl);
        case 'passwordRegistration':
            return passwordRegistrationValidator(formControl);

        case 'emailLogin':
            return emailLoginValidator(formControl);
        case 'passwordLogin':
            return passwordLoginValidator(formControl);


        case 'emailForgotPassword':
            return emailForgotPasswordValidator(formControl);
        case 'newPasswordForgotPassword':
            return newPasswordForgotPasswordValidator(formControl);
            
        case 'titleNotification':
            return titleNotificationValidator(formControl);
        case 'titleLatinNotification':
            return titleLatinNotificationValidator(formControl);
        case 'descriptionNotification':
            return descriptionNotificationValidator(formControl);
        case 'descriptionLatinNotification':
            return descriptionLatinNotificationValidator(formControl);


        default:
            return null;
    }
}



export function verificationCodeVerificationTokenRequestValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const length = 6;
        const stringSingleLengthRule = value?.length == length;

        const verificationCodeValid = notEmptyRule && stringSingleLengthRule;

        return verificationCodeValid ? null : { _ : $localize`:@@NotEmptySingleLength:The field is mandatory and must be ${length} character long.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function emailVerificationTokenRequestValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

        return emailValid ? null : { _ : $localize`:@@NotEmptyLengthEmailAddress:The field is mandatory, must have a minimum of ${min} and a maximum of ${max} characters and must be a valid email address.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function passwordUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 6;
        const max = 20;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const passwordValid = notEmptyRule && stringLengthRule;

        return passwordValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function emailUserValidator(control: SoftFormControl): SoftValidatorFn {
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

export function hasLoggedInWithExternalProviderUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const hasLoggedInWithExternalProviderValid = notEmptyRule;

        return hasLoggedInWithExternalProviderValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function numberOfFailedAttemptsInARowUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const numberOfFailedAttemptsInARowValid = notEmptyRule;

        return numberOfFailedAttemptsInARowValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function isVerifiedUserValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';

        const isVerifiedValid = notEmptyRule;

        return isVerifiedValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function namePermissionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

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

export function descriptionPermissionValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const min = 0;
        const max = 1000;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionValid = stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}


export function nameRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

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

export function descriptionRoleValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value ?? "";

        const min = 0;
        const max = 1000;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const descriptionValid = stringLengthRule;

        return descriptionValid ? null : { _ : $localize`:@@Length:The field must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    
    return validator;
}






export function emailRegistrationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

        return emailValid ? null : { _ : $localize`:@@NotEmptyLengthEmailAddress:The field is mandatory, must have a minimum of ${min} and a maximum of ${max} characters and must be a valid email address.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function passwordRegistrationValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 6;
        const max = 20;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const passwordValid = notEmptyRule && stringLengthRule;

        return passwordValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}


export function emailLoginValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

        return emailValid ? null : { _ : $localize`:@@NotEmptyLengthEmailAddress:The field is mandatory, must have a minimum of ${min} and a maximum of ${max} characters and must be a valid email address.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function passwordLoginValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 6;
        const max = 20;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const passwordValid = notEmptyRule && stringLengthRule;

        return passwordValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}



export function emailForgotPasswordValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = value?.length >= min && value?.length <= max;
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

        return emailValid ? null : { _ : $localize`:@@NotEmptyLengthEmailAddress:The field is mandatory, must have a minimum of ${min} and a maximum of ${max} characters and must be a valid email address.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function newPasswordForgotPasswordValidator(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== '';
        const min = 6;
        const max = 20;
        const stringLengthRule = value?.length >= min && value?.length <= max;

        const newPasswordValid = notEmptyRule && stringLengthRule;

        return newPasswordValid ? null : { _ : $localize`:@@NotEmptyLength:The field is mandatory and must have a minimum of ${min} and a maximum of ${max} characters.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
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





