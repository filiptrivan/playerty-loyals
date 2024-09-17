import {
    Component, Input,
  } from '@angular/core';
import { getTranslatedLabel } from 'src/app/business/services/translates/translated-labels.generated';
import { SoftFormControl } from '../components/soft-form-control/soft-form-control';
  
  @Component({
    selector: 'base-control',
    template: '',
    styles: [],
  })
  export class BaseControl {
    @Input() control: SoftFormControl; // FT: if you name it formControl: https://stackoverflow.com/a/54755671/21209982
    @Input() disabled: boolean = false;
    @Input() label: string = null; // NgModel/Want custom translation
    @Input() controlValid: boolean = true; // NgModel

    validationErrorMessage: string;
    
    ngOnInit(){
        if(this.disabled == true)
            this.control.disable();
        if(this.control?.validator?.hasNotEmptyRule == true) // FT HACK: Be carefull with this name, if you change it in generator you need to change it here also
            this.control.required = true;
    }

    getTranslatedLabel(): string{
        if(this.label == null)
          return getTranslatedLabel(this.control?.label);
        else
          return this.label;
    }

    getValidationErrrorMessages(){
        if(this.control?.errors && this.control?.dirty){
            // FT: it should always be one error message for single form control, 
            // also i don't need to reassign it to null because it will be shown only when control.valid == false
            this.validationErrorMessage = this.control.errors['_'];
        }
        
        return this.validationErrorMessage;
    }
  }