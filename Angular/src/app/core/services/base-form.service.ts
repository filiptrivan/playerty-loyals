import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SoftFormControl, SoftFormGroup } from '../components/soft-form-control/soft-form-control';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService {
  constructor(
    private validatorService: ValidatorService
  ) {}

  initFormGroup<T = any>(parentFormGroup: SoftFormGroup, modelConstructor: any, propertyNameInSaveBody: string, updateOnChangeControls?: (keyof T)[]) {
    if (modelConstructor == null)
      return null;

    const formGroupToInsert: SoftFormGroup = this.createFormGroup(modelConstructor, null, updateOnChangeControls);
    parentFormGroup.addControl(propertyNameInSaveBody, formGroupToInsert);
    
    return formGroupToInsert;
    // this.modelDiffer = this.differs.find(this.model).create();
  }

  createFormGroup(modelConstructor: any, disableLambda?: (formControlName: string, model: any) => boolean, updateOnChangeControls?: (keyof any)[]): SoftFormGroup {
    let formGroup: SoftFormGroup<any> = new SoftFormGroup({});

    Object.keys(modelConstructor).forEach((formControlName) => {
      let formControl: SoftFormControl;

      const formControlValue = modelConstructor[formControlName];

      const propertyType = typeof formControlValue;

      if (propertyType == typeof Date ||
        updateOnChangeControls?.includes(formControlName) ||
        (formControlName.endsWith('Id') && formControlName.length > 2)
      )
        formControl = new SoftFormControl(formControlValue, { updateOn: 'change' });
      else
        formControl = new SoftFormControl(formControlValue, { updateOn: 'blur' });

      formControl.label = formControlName;
      
      formGroup.addControl(formControlName, formControl);

      this.setValidator(formControl, modelConstructor);
      
      if(disableLambda && disableLambda(formControlName, modelConstructor)){
        formControl.disable();
      }
      
      // formGroup.controls[formControlName].valueChanges.subscribe(value => {
      //   modelConstructor[formControlName] = value;
      // })
    });
    
    // this.onAfterArrayControlInitialization(formControlName);

    return formGroup;
  }

  setValidator(formControl: SoftFormControl, modelConstructor: any) {
    if (formControl == null) return null;
    
    formControl.validator = this.validatorService.getValidator(formControl, modelConstructor.typeName);

    if (formControl?.validator?.hasNotEmptyRule)
      formControl.required = true;
  }

}
