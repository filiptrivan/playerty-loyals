import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { Injectable } from "@angular/core";
import { ValidatorBusinessService } from './generated/business-validation-rules.generated';
import { ValidatorSecurityService } from './generated/security-validation-rules.generated';

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
        protected validatorBusinessService: ValidatorBusinessService,
        protected validatorSecurityService: ValidatorSecurityService
    ) {
    }

    getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
        let result: SoftValidatorFn = null;

        result = this.validatorBusinessService.getValidator(formControl, className);
        if (result != null)
            return result;

        result = this.validatorSecurityService.getValidator(formControl, className);
        if (result != null)
            return result;

        return result;
    }
}
