import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { Injectable } from '@angular/core';
import { SpiderFormArray, SpiderFormControl, SpiderFormGroup } from '../components/spider-form-control/spider-form-control';
import { BaseEntity } from '../entities/base-entity';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService {
  constructor(
    private validatorService: ValidatorService
  ) {}

  initFormGroup<T>(formGroup: SpiderFormGroup<T>, parentFormGroup: SpiderFormGroup, modelConstructor: any, propertyNameInSaveBody: string, updateOnChangeControls?: (keyof T)[]): void {
    if (modelConstructor == null)
      return null;

    if (formGroup == null)
      console.error('FT: You need to instantiate the form group.')

    this.createFormGroup(formGroup, modelConstructor, null, updateOnChangeControls);
    parentFormGroup.addControl(propertyNameInSaveBody, formGroup);
  }

  createFormGroup<T>(formGroup: SpiderFormGroup<T>, modelConstructor: T & BaseEntity, disableLambda?: (formControlName: string, model: any) => boolean, updateOnChangeControls?: (keyof any)[]): void {
    if (formGroup == null)
      console.error('FT: You need to instantiate the form group.')

    Object.keys(modelConstructor).forEach((formControlName) => {
      let formControl: SpiderFormControl;
      
      const formControlValue = modelConstructor[formControlName];
      
      if (updateOnChangeControls?.includes(formControlName) ||
        (formControlName.endsWith('Id') && formControlName.length > 2)
      )
        formControl = new SpiderFormControl(formControlValue, { updateOn: 'change' });
      else
        formControl = new SpiderFormControl(formControlValue, { updateOn: 'blur' });

      formControl.label = formControlName;
      
      formGroup.addControl(formControlName, formControl);

      this.setValidator(formControl, modelConstructor);
      
      if(disableLambda && disableLambda(formControlName, modelConstructor)){
        formControl.disable();
      }
    });
  }

  setValidator<T>(formControl: SpiderFormControl, modelConstructor: T & BaseEntity) {
    if (formControl == null) return null;

    this.validatorService.setValidator(formControl, modelConstructor.typeName);
  }

  getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
    return formArray.controls as SpiderFormGroup<T>[]
  }

  addNewFormGroupToFormArray<T>(formArray: SpiderFormArray, modelConstructor: T & BaseEntity, index: number, disableLambda?: (formControlName: string, model: any) => boolean) {
    let helperFormGroup: SpiderFormGroup = new SpiderFormGroup({});
    this.createFormGroup(helperFormGroup, modelConstructor, disableLambda);
    
    if (index == null) {
      formArray.push(helperFormGroup);
    }else{
      formArray.insert(index, helperFormGroup);
    }
  }

  // FT HACK: Using modelConstructor because generics can't instantiate in TS (because JS)
  initFormArray<T>(parentFormGroup: SpiderFormGroup, modelList: (T & BaseEntity)[], modelConstructor: T & BaseEntity, formArraySaveBodyName: string, formArrayTranslationKey: string, required: boolean = false, disableLambda?: (formControlName: string, model: any) => boolean){
    if (modelList == null)
      return null;

    let formArray = new SpiderFormArray<T>([]);
    formArray.required = required;
    formArray.modelConstructor = modelConstructor;
    formArray.translationKey = formArrayTranslationKey;

    modelList.forEach(model => {
      Object.assign(modelConstructor, model);
      let helperFormGroup: SpiderFormGroup = new SpiderFormGroup({});
      this.createFormGroup(helperFormGroup, formArray.modelConstructor, disableLambda)
      formArray.push(helperFormGroup);
    });

    parentFormGroup.addControl(formArraySaveBodyName, formArray);

    return formArray;
  }

}
