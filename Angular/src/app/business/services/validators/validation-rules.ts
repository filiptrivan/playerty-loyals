import { ValidationErrors } from "@angular/forms";
import { SoftFormArray, SoftFormControl, SoftValidatorFn } from "src/app/core/components/soft-form-control/soft-form-control";
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { ValidatorServiceGenerated } from "./validation-rules.generated";

@Injectable({
    providedIn: 'root',
})
export class ValidatorService extends ValidatorServiceGenerated {

    constructor(
        protected override translocoService: TranslocoService,
    ) {
        super(translocoService)
    }

    isArrayEmpty(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        return validator;
    }

    notEmpty(control: SoftFormControl): void {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity();
    }
    
    isFormArrayEmpty(control: SoftFormArray): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        return validator;
    }

}