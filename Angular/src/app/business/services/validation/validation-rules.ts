import { ValidationErrors } from "@angular/forms";
import { SoftFormArray, SoftFormControl, SoftValidatorFn } from "src/app/core/components/soft-form-control/soft-form-control";
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { ValidatorBusinessService } from "./generated/business-validation-rules.generated";
import { ValidatorServiceGenerated } from "./validation-rules.generated";
import { ValidatorSecurityService } from "./generated/security-validation-rules.generated";

@Injectable({
    providedIn: 'root',
})
export class ValidatorService extends ValidatorServiceGenerated {

    constructor(
        protected override validatorBusinessService: ValidatorBusinessService,
        protected override validatorSecurityService: ValidatorSecurityService,
        private translocoService: TranslocoService,
    ) {
        super(validatorBusinessService, validatorSecurityService)
    }

    isArrayEmpty(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }
    
    isFormArrayEmpty(control: SoftFormArray): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }
    
    // confirmationPassword(confirmationPasswordControl: SoftFormControl, passwordControl: SoftFormControl): SoftValidatorFn {
    //     const validator: SoftValidatorFn = (): ValidationErrors | null => {
    //         const confirmationPassword = confirmationPasswordControl.value;
    //         const password = passwordControl.value;
    
    //         const notEmptyRule = typeof confirmationPassword !== 'undefined' && confirmationPassword !== null && confirmationPassword.length !== 0;
    
    //         const areEqualRule = confirmationPassword === password;
    
    //         const arrayValid = notEmptyRule && areEqualRule;
    
    //         return arrayValid ? null : { _ : $localize`:@@NotEmptyIsTheSameAsPassword:The field is mandatory and must have the same value as password.` };
    //     };
    //     validator.hasNotEmptyRule = true;
    //     return validator;
    // }

}