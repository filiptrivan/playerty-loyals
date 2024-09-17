import { FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';

export interface SoftValidatorFn extends ValidatorFn {
    hasNotEmptyRule?: boolean;
}

export class SoftFormControl<T = any> extends FormControl<T> {
    public label: string;
    public required: boolean;
    private _softValidator: SoftValidatorFn | null;

    constructor(formControl: FormControl, opts: FormControlOptions=null, required:boolean=false) {
        opts = opts ?? {updateOn: 'blur'};
        super(formControl, opts);
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
