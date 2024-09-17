import { ValidationErrors } from "@angular/forms";
import { SoftFormControl, SoftValidatorFn } from "src/app/core/components/soft-form-control/soft-form-control";

export function isArrayEmpty(control: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;

        const arrayValid = notEmptyRule;

        return arrayValid ? null : { _ : $localize`:@@NotEmpty:The field is mandatory.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}

export function confirmationPassword(confirmationPasswordControl: SoftFormControl, passwordControl: SoftFormControl): SoftValidatorFn {
    const validator: SoftValidatorFn = (): ValidationErrors | null => {
        const confirmationPassword = confirmationPasswordControl.value;
        const password = passwordControl.value;

        const notEmptyRule = typeof confirmationPassword !== 'undefined' && confirmationPassword !== null && confirmationPassword.length !== 0;

        const areEqualRule = confirmationPassword === password;

        const arrayValid = notEmptyRule && areEqualRule;

        return arrayValid ? null : { _ : $localize`:@@NotEmptyIsTheSameAsPassword:The field is mandatory and must have the same value as password.` };
    };
    validator.hasNotEmptyRule = true;
    return validator;
}