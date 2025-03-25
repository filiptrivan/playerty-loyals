import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { ValidatorServiceGenerated } from "./validators.generated";
import { ValidatorAbstractService, SpiderFormControl, SpiderValidatorFn } from '@playerty/spider';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService extends ValidatorAbstractService {

    constructor(
        protected override translocoService: TranslocoService,
        private validatorServiceGenerated: ValidatorServiceGenerated,
    ) {
        super(translocoService);
    }

    override setValidator = (formControl: SpiderFormControl, className: string): SpiderValidatorFn => {
        return this.validatorServiceGenerated.setValidator(formControl, className);
    }

}