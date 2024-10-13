import { FormArray, FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';

export interface SoftValidatorFn extends ValidatorFn {
    hasNotEmptyRule?: boolean;
}

export class SoftFormControl<T = any> extends FormControl<T> {
    public label: string;
    public required: boolean;
    private _softValidator: SoftValidatorFn | null;

    constructor(value: any, opts: FormControlOptions=null, required:boolean=false) {
        opts = opts ?? {updateOn: 'blur'};
        super(value, opts);
        this.required = required;
     }

    public override get validator(): SoftValidatorFn | null {
        return this._softValidator;
    }

    public override set validator(validator: SoftValidatorFn | null) {
        this._softValidator = validator;
        this.setValidators(validator); 
    }
}

export class SoftFormGroup extends FormGroup {

}

export class SoftFormArray extends FormArray {
    public required: boolean;

    
}