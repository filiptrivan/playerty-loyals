import {
  ChangeDetectorRef,
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SoftFormArray, SoftFormControl, SoftFormGroup } from '../soft-form-control/soft-form-control';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SoftMessageService } from '../../services/soft-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { getParentUrl } from '../../services/helper-functions';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseEntity } from '../../entities/base-entity';
import { Observable } from 'rxjs';
import { SoftTab } from '../soft-panels/panel-header/panel-header.component';
import { SoftGlobal } from '../../soft-global';

@Component({
  selector: 'base-form',
  template: '',
  styles: [],
})
export class BaseFormCopy implements OnInit { 
  formGroup: FormGroup = new FormGroup({});
  formArrayControlNamesFromHtml: string[] = [];
  saveBody: any;
  modelId: number;
  detailsTitle: string;
  invalidForm: boolean = false; // FT: We are using this only if we manualy add some form field on the UI, like multiautocomplete, autocomplete etc...
  saveObservableMethod: (saveBody: any) => Observable<any>;

  private modelDiffer: KeyValueDiffer<string, any>;

  constructor(
    protected differs: KeyValueDiffers, 
    protected http: HttpClient, 
    protected messageService: SoftMessageService, 
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router, 
    protected route: ActivatedRoute,
    protected translocoService: TranslocoService,
    protected translateClassNamesService: TranslateClassNamesService,
    protected validatorService: ValidatorService,
  ) {
  }

  ngOnInit(){
  }

  //#region Model

  initFormGroup(modelConstructor: any, propertyNameInSaveBody: string) {
    if (modelConstructor == null)
      return null;

    const formGroupToInsert: FormGroup = this.createFormGroup(modelConstructor);
    this.formGroup.addControl(propertyNameInSaveBody, formGroupToInsert);
    
    return formGroupToInsert;
    // this.modelDiffer = this.differs.find(this.model).create();
  }

  // subscribeFormToModelChanges(formGroup: FormGroup, model: T) {
  //   // both directions
  //   Object.keys(formGroup.controls).forEach((key) => {
  //     formGroup.controls[key].setValue(model[key]);
  //   });
  // }

  // modelChanged(changes: KeyValueChanges<string, any>) {
  //   // https://stackoverflow.com/questions/46330070/angular-4-how-to-watch-an-object-for-changes
  //   this.subscribeFormToModelChanges(this.formGroup, this.model);
  // }

  // ngDoCheck(): void {
  //   const changes = this.modelDiffer?.diff(this.model);
  //   if (changes) {
  //     this.modelChanged(changes);
  //   }
  // }

  setValidator(formControl: SoftFormControl, modelConstructor: any) {
    if (formControl == null) return null;
    
    formControl.validator = this.validatorService.getValidator(formControl, modelConstructor.typeName);

    if (formControl?.validator?.hasNotEmptyRule)
      formControl.required = true;
  }

  // ngAfterViewChecked(): void {
  //   this.changeDetectorRef.detectChanges();
  // }

  // FT: If we put onChange to true, we are validating control on change not on blur.
  // FT: If we assign model, we are taking validators for the other class
  control<T extends BaseEntity>(formControlName: string & keyof T, formGroup: SoftFormGroup<T>, customValidation: boolean = false, disable: boolean = false) {
    if (formGroup == null)
      return null; // FT: When we initialized form group again this will happen

    if(formGroup.controlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      formGroup.controlNamesFromHtml.push(formControlName);

    let formControl: SoftFormControl = formGroup.controls[formControlName] as SoftFormControl;

    if (formControl == null){
      console.error(`The property ${formControlName} in the model ${formGroup.getRawValue().typeName} doesn't exist`);
      return null;
    }

    if(customValidation == false)
      this.setValidator(formControl, formGroup.getRawValue());
    
    if(disable == true)
      formControl.disable();
    
    this.onAfterControlInitialization(formControlName);
  
    return formControl;
  }

  onAfterControlInitialization(formControlName: string) { }

  onSave(reroute: boolean = true){
    this.onBeforeSave();

    this.saveBody = this.saveBody ?? this.formGroup.getRawValue();

    let isValid: boolean = this.isFormGroupValid();
    let isFormArrayValid: boolean = this.areFormArraysValid();

    if(isValid && isFormArrayValid){
      // const saveMethodName = this.saveMethodName ?? `Save${this.controllerName}`;
      
      // this.http.put<any>(environment.apiUrl + `/${this.controllerName}/${saveMethodName}`, this.saveBody, environment.httpOptions).subscribe(res => {
      this.saveObservableMethod(this.saveBody).subscribe(res => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

        Object.keys(res).forEach((key) => {
          const formControl = this.formGroup.get(key);
          
          if (formControl) {
            if (formControl instanceof SoftFormArray) {
              const formArray = formControl as SoftFormArray;
              if (res[key].length !== 0) {
                formArray.clear();
              }
              else{
                // FT: This is okay because when we have M2M association with additional fields, we will not give back the list because we are not checking version on the server.
                // console.error(`You returned empty array for control: ${formArray.translationKey}.`);
              }

              res[key].forEach((model: any) => {
                if (typeof model === 'object' && model !== null) {
                  Object.assign(formArray.modelConstructor, model);
                  formArray.push(this.createFormGroup(formArray.modelConstructor));
                } else {
                  console.error('Can not add primitive form control inside form array.');
                }
              });

            } else {
              formControl.patchValue(res[key]);
            }
          }else{
            // FT: It's okay to do this.
            // console.error('You returned something that is not in the save DTO.');
          }
        });

        if (reroute)
          this.rerouteOnTheNewEntity((res as any).rerouteId); // You always need to have id, because of id == 0 and version change
        
        this.onAfterSave();
      });
      
      this.onAfterSaveRequest();
    }else{
      this.showInvalidFieldsMessage();
    }
  }

  rerouteOnTheNewEntity(rerouteId: number | string): void {
    if(rerouteId == null){
      // console.error('You do not have rerouteId in your DTO.')
      const currentUrl = this.router.url;
      const parentUrl: string = getParentUrl(currentUrl);
      this.router.navigateByUrl(parentUrl);
      return;
    }
      
    const segments = this.router.url.split('/');
    segments[segments.length - 1] = rerouteId.toString();

    const newUrl = segments.join('/');
    this.router.navigateByUrl(newUrl);
  }

  onBeforeSave(){}
  onAfterSave(){}
  onAfterSaveRequest(){}

  isFormGroupValid(): boolean {
    if(this.formGroup.controls == null)
      return true;

    let invalid: boolean = false;

    Object.keys(this.formGroup.controls).forEach(key => {
      const formGroup = this.formGroup.controls[key] as FormGroup;

      if (formGroup instanceof SoftFormGroup){
        Object.keys(formGroup.controls).forEach(key => {
          const formControl = formGroup.controls[key] as SoftFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work

          if (formGroup.controlNamesFromHtml.includes(formControl.label) && formControl.invalid) {
            formControl.markAsDirty();
            invalid = true;
          }
        });
      }

    });

    if (invalid) {
      return false;
    }

    return true;
  }

  showInvalidFieldsMessage(){
    this.messageService.warningMessage(
      this.translocoService.translate('YouHaveSomeInvalidFieldsDescription'),
      this.translocoService.translate('YouHaveSomeInvalidFieldsTitle'), 
    );
  }

  // FT: If you want to call single method
  checkFormGroupValidity(){
    if (this.formGroup.invalid || this.invalidForm) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.controls[key].markAsDirty(); // this.formGroup.markAsDirty(); // FT: For some reason this doesnt work
      });

      this.showInvalidFieldsMessage();

      return false;
    }
    
    return true;
  }

  //#endregion

  //#region Model List

  // FT HACK: Using modelConstructor because generics can't instantiate in TS (because JS)
  initFormArray(modelList: any[], modelConstructor: any, formArraySaveBodyName: string, formArrayTranslationKey: string, required: boolean = false, disableLambda?: (formControlName: string, model: any) => boolean){
    if (modelList == null)
      return null;

    let formArray: SoftFormArray = new SoftFormArray([]);
    formArray.required = required;
    formArray.modelConstructor = modelConstructor;
    formArray.translationKey = formArrayTranslationKey;

    modelList.forEach(model => {
      Object.assign(modelConstructor, model);
      formArray.push(this.createFormGroup(modelConstructor, disableLambda));
    });

    this.formGroup.addControl(formArraySaveBodyName, formArray);

    return formArray;
  }

  createFormGroup(modelConstructor: any, disableLambda?: (formControlName: string, model: any) => boolean): FormGroup {
    let formGroup: SoftFormGroup<any> = new SoftFormGroup({});

    Object.keys(modelConstructor).forEach((formControlName) => {
      let formControl: SoftFormControl;

      const formControlValue = modelConstructor[formControlName];

      const propertyType = typeof formControlValue;

      if (propertyType == typeof Date || 
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
  
  // FT: Need to use this from html because can't do "as SoftFormControl" there
  getFormArrayControlByIndex<T>(formControlName: keyof T & string, formArraySaveBodyName: string, index: number, filter?: (formGroups: SoftFormGroup<T>[]) => SoftFormGroup<T>[]): SoftFormControl {
    if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      this.formArrayControlNamesFromHtml.push(formControlName);

    let formArray: SoftFormArray<T[]> = this.formGroup.controls[formArraySaveBodyName] as SoftFormArray;

    let filteredFormGroups: SoftFormGroup<T>[];

    if (filter) {
      filteredFormGroups = filter(formArray.controls as SoftFormGroup<T>[]);
    }
    else{
      return (formArray.controls[index] as SoftFormGroup<T>).controls[formControlName] as SoftFormControl;
    }

    return filteredFormGroups[index]?.controls[formControlName] as SoftFormControl; // FT: Don't change this. It's always possible that change detection occurs before something.
  }

  getFormArrayControls<T>(formControlName: keyof T & string, formArraySaveBodyName: string, filter?: (formGroups: SoftFormGroup<T>[]) => SoftFormGroup<T>[]): SoftFormControl[] {
    if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      this.formArrayControlNamesFromHtml.push(formControlName);

    let formArray: SoftFormArray<T[]> = this.formGroup.controls[formArraySaveBodyName] as SoftFormArray;

    let filteredFormGroups: SoftFormGroup<T>[];

    if (filter) {
      filteredFormGroups = filter(formArray.controls as SoftFormGroup<T>[]);
    }
    else{
      return (formArray.controls as SoftFormGroup<T>[]).map(x => x.controls[formControlName] as SoftFormControl);
    }

    return filteredFormGroups.map(x => x.controls[formControlName] as SoftFormControl);
  }

  // FT: Need to use this from html because can't do "as SoftFormControl" there
  // FT: Don't uncomment this, if you realy don't need.
  // getFormArrayControlById(formControlName: string, formArraySaveBodyName: string, id: number): SoftFormControl{
  //   if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
  //     this.formArrayControlNamesFromHtml.push(formControlName);

  //   return ((this.formGroup.controls[formArraySaveBodyName] as SoftFormArray)?.controls?.filter(x => x.getRawValue().id == id)[0] as FormGroup)?.controls[formControlName] as SoftFormControl;
  // }

  // getFormArrayGroup(index: number): FormGroup{
  //   return this.formArray.controls[index] as FormGroup
  // }

  getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
    return formArray.controls as SoftFormGroup<T>[]
  }

  addNewFormControlToTheFormArray(formArray: SoftFormArray, modelConstructor: any, index: number, disableLambda?: (formControlName: string, model: any) => boolean) {
    if (index == null) {
      formArray.push(this.createFormGroup(modelConstructor, disableLambda));
    }else{
      formArray.insert(index, this.createFormGroup(modelConstructor, disableLambda));
    }
  }

  removeFormControlFromTheFormArray(formArray: SoftFormArray, index: number) {
    if(index == null)
      throw new Error('Can not pass null index.');

    formArray.removeAt(index);
  }

  removeFormControlsFromTheFormArray(formArray: SoftFormArray, indexes: number[]) {
    // Sort indexes in descending order to avoid index shifts when removing controls
    const sortedIndexes = indexes.sort((a, b) => b - a);

    sortedIndexes.forEach(index => {
      if (index >= 0 && index < formArray.length) {
        formArray.removeAt(index);
      }
    });
  }

  areFormArraysValid(): boolean {
    if(this.formGroup.controls == null)
      return true;

    let invalid: boolean = false;

    Object.keys(this.formGroup.controls).forEach(key => {
      const formArray = this.formGroup.controls[key] as SoftFormArray;
      if (formArray instanceof SoftFormArray){
        (formArray.controls as FormGroup[]).forEach(formGroup => {
          Object.keys(formGroup.controls).forEach(key => {
            const formControl = formGroup.controls[key] as SoftFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesn't work

            if (this.formArrayControlNamesFromHtml.includes(formControl.label) && formControl.invalid) {
              formControl.markAsDirty();
              invalid = true;
            }
          });
        });

        if (formArray.required == true && formArray.length == 0) {
          invalid = true;
          this.messageService.warningMessage(this.translocoService.translate('ListCanNotBeEmpty', {value: this.translateClassNamesService.translate(formArray.translationKey)}))
        }
      }
    });

    if (invalid || this.invalidForm) {
      return false;
    }

    return true;
  }

  // checkFormArrayValidity(): boolean {
  //   // if(this.formArray == null)
  //     return true;

  //   let invalid: boolean = false;

  //   // (this.formArray.controls as FormGroup[]).forEach(formGroup => {
  //   //   Object.keys(formGroup.controls).forEach(key => {
  //   //     let formControl = formGroup.controls[key] as SoftFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work
  //   //     formControl.markAsDirty();
  //   //     if (formControl.invalid && this.formArrayControlNamesFromHtml.includes(formControl.label)) {
  //   //       invalid = true;
  //   //     }
  //   //   });
  //   // });

  //   if (invalid || this.invalidForm) {
  //     this.messageService.warningMessage(
  //       $localize`:@@YouHaveSomeInvalidFieldsDescription:Some of the fields on the form are not valid, please check which ones and try again.`,
  //       $localize`:@@YouHaveSomeInvalidFieldsTitle:You have some invalid fields`, 
  //     );

  //     return false;
  //   }

  //   return true;
  // }

  onBeforeSaveList(){}
  onAfterSaveList(){}
  onAfterSaveListRequest(){}

  // FT: Sending LastMenuIconIndexClicked class because of reference type
  getCrudMenuForOrderedData(formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean = false){
    let crudMenuForOrderedData: MenuItem[] = [
        {label: this.translocoService.translate('Remove'), icon: 'pi pi-minus', command: () => {
          this.onBeforeRemove(formArray, modelConstructor, lastMenuIconIndexClicked.index);
          if (adjustFormArrayManually === false) {
            this.removeFormControlFromTheFormArray(formArray, lastMenuIconIndexClicked.index);
          }
        }},
        {label: this.translocoService.translate('AddAbove'), icon: 'pi pi-arrow-up', command: () => {
          this.onBeforeAddAbove(formArray, modelConstructor, lastMenuIconIndexClicked.index);
          if (adjustFormArrayManually === false) {
            this.addNewFormControlToTheFormArray(formArray, modelConstructor, lastMenuIconIndexClicked.index);
          }
        }},
        {label: this.translocoService.translate('AddBelow'), icon: 'pi pi-arrow-down', command: () => {
          this.onBeforeAddBelow(formArray, modelConstructor, lastMenuIconIndexClicked.index);
          if (adjustFormArrayManually === false) {
            this.addNewFormControlToTheFormArray(formArray, modelConstructor, lastMenuIconIndexClicked.index + 1);
          }
        }},
    ];

    return crudMenuForOrderedData;
  }

  onBeforeRemove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number) {}

  onBeforeAddAbove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number) {}

  onBeforeAddBelow(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number) {}

  //#endregion

  //#region Helpers
  selectedTab(tabs: SoftTab[]): number {
    const tab = SoftGlobal.singleOrDefault(tabs, x => x.isSelected);

    if (tab) {
      return tab.value;
    }
    else{
      return null;
    }
  }
  //#endregion

}

export class LastMenuIconIndexClicked extends BaseEntity
{
    index?: number;

    constructor(
    {
        index,
    }:{
        index?: number;
    } = {}
    ) {
        super('LastMenuIconIndexClicked'); 

        this.index = index;
    }
}
