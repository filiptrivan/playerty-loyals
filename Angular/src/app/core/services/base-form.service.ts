import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SoftFormArray, SoftFormControl, SoftFormGroup } from '../components/soft-form-control/soft-form-control';
import { FormGroup } from '@angular/forms';
import { BaseEntity } from '../entities/base-entity';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService {
  constructor(
    private validatorService: ValidatorService
  ) {}

  initFormGroup<T>(formGroup: SoftFormGroup<T>, parentFormGroup: SoftFormGroup, modelConstructor: any, propertyNameInSaveBody: string, updateOnChangeControls?: (keyof T)[]): void {
    if (modelConstructor == null)
      return null;

    if (formGroup == null)
      console.error('FT: You need to instantiate the form group.')

    this.createFormGroup(formGroup, modelConstructor, null, updateOnChangeControls);
    parentFormGroup.addControl(propertyNameInSaveBody, formGroup);
  }

  createFormGroup<T>(formGroup: SoftFormGroup<T>, modelConstructor: T & BaseEntity, disableLambda?: (formControlName: string, model: any) => boolean, updateOnChangeControls?: (keyof any)[]): void {
    if (formGroup == null)
      console.error('FT: You need to instantiate the form group.')

    Object.keys(modelConstructor).forEach((formControlName) => {
      let formControl: SoftFormControl;

      const formControlValue = modelConstructor[formControlName];
      
      if (updateOnChangeControls?.includes(formControlName) ||
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
    });
  }

  setValidator<T>(formControl: SoftFormControl, modelConstructor: T & BaseEntity) {
    if (formControl == null) return null;

    this.validatorService.setValidator(formControl, modelConstructor.typeName);
  }

  getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
    return formArray.controls as SoftFormGroup<T>[]
  }

  addNewFormGroupToFormArray(formArray: SoftFormArray, modelConstructor: any, index: number, disableLambda?: (formControlName: string, model: any) => boolean) {
    if (index == null) {
      formArray.push(this.createFormGroup(modelConstructor, disableLambda));
    }else{
      formArray.insert(index, this.createFormGroup(modelConstructor, disableLambda));
    }
  }

  // FT HACK: Using modelConstructor because generics can't instantiate in TS (because JS)
  initFormArray(parentFormGroup: SoftFormGroup, modelList: any[], modelConstructor: any, formArraySaveBodyName: string, formArrayTranslationKey: string, required: boolean = false, disableLambda?: (formControlName: string, model: any) => boolean){
    if (modelList == null)
      return null;

    let formArray: SoftFormArray = new SoftFormArray([]);
    formArray.required = required;
    formArray.modelConstructor = modelConstructor;
    formArray.translationKey = formArrayTranslationKey;

    modelList.forEach(model => {
      Object.assign(modelConstructor, model);
      let helperFormGroup: SoftFormGroup = new SoftFormGroup({});
      this.createFormGroup(helperFormGroup, formArray.modelConstructor, disableLambda)
      formArray.push(helperFormGroup);
    });

    parentFormGroup.addControl(formArraySaveBodyName, formArray);

    return formArray;
  }

}
