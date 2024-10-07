import {
  ChangeDetectorRef,
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BaseEntity } from '../../entities/base-entity';
import { SoftFormControl } from '../soft-form-control/soft-form-control';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SoftMessageService } from '../../services/soft-message.service';
import { getTranslatedClassName } from 'src/app/business/services/translates/translated-class-names.generated';
import { getValidator } from 'src/app/business/services/validation/validation-rules.generated';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'base-form',
  template: '',
  styles: [],
})
export class BaseFormCopy implements OnInit { 
  formGroup: FormGroup = new FormGroup({});
  formArray: FormArray;
  formArrayControlNamesFromHtml: string[] = [];
  modelList: any[];
  saveBody: any;
  modelId: number;
  detailsTitle: string;
  invalidForm: boolean = false; // FT: We are using this only if we manualy add some form field on the UI, like multiautocomplete, autocomplete etc...
  controllerName: string;
  saveMethodName: string;

  private modelDiffer: KeyValueDiffer<string, any>;

  constructor(
    protected differs: KeyValueDiffers, 
    protected http: HttpClient, 
    protected messageService: SoftMessageService, 
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router, 
    protected route: ActivatedRoute
    ) {
  }

  ngOnInit(){
  }

  //#region Model

  initFormGroup(modelList: any[]) {
    // this.model = Object.assign(this.model ? this.model : {}, model);

    // this.detailsTitle = getTranslatedClassName(this.model.typeName);

    // this.formGroup = new FormGroup({});
    
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

  setValidator(formControl: SoftFormControl, model: any) {
    if (formControl == null) return null;

    formControl.validator = getValidator(formControl, model.typeName);
  
    if (formControl?.validator?.hasNotEmptyRule)
      formControl.required = true;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  // FT: If we put onChange to true, we are validating control on change not on blur.
  // FT: If we assign model, we are taking validators for the other class
  control(formControlName: string, model: any, updateOnChange: boolean = false, customValidation: boolean = false, disable: boolean = false) {
    let formGroup: FormGroup = this.formGroup.controls[model.typeName] as FormGroup;
    
    let shouldAddNewFormGroup: boolean = false;

    if (formGroup == null) {
      formGroup = new FormGroup({});
      shouldAddNewFormGroup = true;
    }

    let formControl: SoftFormControl = formGroup.controls[formControlName] as SoftFormControl;

    if (formControl == null) {
      if (updateOnChange)
        formControl = new SoftFormControl(model[formControlName], { updateOn: 'change' });
      else
        formControl = new SoftFormControl(model[formControlName], { updateOn: 'blur' });

      if (formControl == null){
        console.error(`The property ${formControlName} in the model ${model.typeName} doesn't exist`);
        return null;
      }

      if (formControlName.endsWith('Id') && formControlName.length > 2) {
        formControl.label = formControlName.substring(0, formControlName.length - 2);
      } else if (formControlName.endsWith('DisplayName')) {
        formControl.label = formControlName.replace('DisplayName', '');
      } else {
        formControl.label = formControlName;
      }

      formGroup.addControl(formControlName, formControl);

      if(customValidation == false)
        this.setValidator(formControl, model);
      
      if(disable == true)
        formControl.disable();
      
      formGroup.controls[formControlName].valueChanges.subscribe(value => {
        model[formControlName] = value;
      })
      // formControl.valueChanges.subscribe(value => {
      //   model[formControlName] = value;
      // })
      
      this.onAfterControlInitialization(formControlName);
    }

    if (shouldAddNewFormGroup) {
      this.formGroup.addControl(model.typeName, formGroup);
    }
  
    return formControl;
  }

  onAfterControlInitialization(formControlName: string) { }

  onSave(){
    this.onBeforeSave();

    this.saveBody = this.saveBody ?? this.formGroup.value;

    let isValid: boolean = this.isFormGroupValid();
    let isFormArrayValid: boolean = this.isFormArrayValid();

    if(isValid && isFormArrayValid){
      this.http.put<any>(environment.apiUrl + `/${this.controllerName}/${this.saveMethodName}`, this.saveBody, environment.httpOptions).subscribe(res => {
        this.messageService.successMessage("You have successfully saved.");

        if(res && (res as any).id)
          this.rerouteOnTheNewEntity((res as any).id);
        
        // FT: Only overriden ngOnInit is called if it exists
        this.ngOnInit(); // TODO FT: Even if working with other objects, try to assign everything with Object.assign. Like this we are having more requests then we need.

        this.onAfterSave();
      });
      
      this.onAfterSaveRequest();
    }else{
      this.showInvalidFieldsMessage();
    }
  }

  rerouteOnTheNewEntity(newId: number): void {
    if(newId == null) return;

    const segments = this.router.url.split('/');
    segments[segments.length - 1] = newId.toString();

    const newUrl = segments.join('/');
    this.router.navigateByUrl(newUrl);
  }

  onBeforeSave(){}
  onAfterSave(){}
  onAfterSaveRequest(){}

  isFormGroupValid(): boolean {
    if (this.formGroup.invalid || this.invalidForm) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.controls[key].markAsDirty(); // this.formGroup.markAsDirty(); // FT: For some reason this doesnt work
      });

      return false;
    }

    return true;
  }

  showInvalidFieldsMessage(){
    this.messageService.warningMessage(
      $localize`:@@YouHaveSomeInvalidFieldsDescription:Some of the fields on the form are not valid, please check which ones and try again.`,
      $localize`:@@YouHaveSomeInvalidFieldsTitle:You have some invalid fields`, 
    );
  }

  // FT: If you want to call single method
  checkFormGroupValidity(){
    if (this.formGroup.invalid || this.invalidForm) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.controls[key].markAsDirty(); // this.formGroup.markAsDirty(); // FT: For some reason this doesnt work
      });

      this.messageService.warningMessage(
        $localize`:@@YouHaveSomeInvalidFieldsDescription:Some of the fields on the form are not valid, please check which ones and try again.`,
        $localize`:@@YouHaveSomeInvalidFieldsTitle:You have some invalid fields`, 
      );

      return false;
    }
    
    return true;
  }

  //#endregion

  //#region Model List

  initFormArray(modelList: any[], modelConstructor: any){ // FT HACK: Because generics can't instantiate in TS (because JS)
    this.formArray = new FormArray([]);
    
    if (modelList == null)
      return;

    modelList.forEach(model => {
      Object.assign(modelConstructor, model)
      this.formArray.push(this.createFormGroup(modelConstructor));
    });
  }

  createFormGroup(model: any): FormGroup {
    let formGroup: FormGroup = new FormGroup({});

    Object.keys(model).forEach((key) => {
      formGroup = this.arrayFormGroup(key, formGroup, model);
    });

    return formGroup;
  }

  arrayFormGroup(formControlName: string, formGroup: FormGroup, model: any, updateOnChange: boolean = false, customValidation: boolean = false, disable: boolean = false) {
    let formControl: SoftFormControl = formGroup.controls[formControlName] as SoftFormControl;

    if (formControl == null) {
      if (updateOnChange)
        formControl = new SoftFormControl(model[formControlName], { updateOn: 'change' });
      else
        formControl = new SoftFormControl(model[formControlName], { updateOn: 'blur' });

      if (formControl == null)
        return null;

      if (formControlName.endsWith('Id') && formControlName.length > 2) {
        formControl.label = formControlName.substring(0, formControlName.length - 2);
      } else if (formControlName.endsWith('DisplayName')) {
        formControl.label = formControlName.replace('DisplayName', '');
      } else {
        formControl.label = formControlName;
      }

      formGroup.addControl(formControlName, formControl);

      if(customValidation == false)
        this.setValidator(formControl, model);
      
      if(disable == true)
        formControl.disable();
      
      formGroup.controls[formControlName].valueChanges.subscribe(value => {
        model[formControlName] = value;
      })
      
      // this.onAfterArrayControlInitialization(formControlName);
    }

    return formGroup;
  }

  // FT: Need to use this from html because can't do "as SoftFormControl" there
  getFormArrayControl(formControlName: string, index: number): SoftFormControl{
    if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      this.formArrayControlNamesFromHtml.push(formControlName);
    return (this.formArray.controls[index] as FormGroup).controls[formControlName] as SoftFormControl;
  }

  getFormArrayGroup(index: number): FormGroup{
    return this.formArray.controls[index] as FormGroup
  }

  getFormArrayGroups(): FormGroup[]{
    return this.formArray.controls as FormGroup[]
  }

  addNewFormControlToTheFormArray(model:any, index: number) {
    if (index == null) {
      this.formArray.push(this.createFormGroup(model));
    }else{
      this.formArray.insert(index, this.createFormGroup(model));
    }
  }

  removeFormControlFromTheFormArray(index: number) {
    this.formArray.removeAt(index);
  }

  onSaveList(modelConstructor: any){
    this.onBeforeSaveList();
    
    let isValid: boolean = this.checkFormArrayValidity();

    if(isValid){
      this.http.put<any[]>(environment.apiUrl + `/${this.controllerName}/${this.saveMethodName}List`, this.formArray.value, environment.httpOptions).subscribe((res: any[]) => {
        this.formArray = null;
        this.initFormArray(res, modelConstructor);

        this.messageService.successMessage("You have successfully saved.");

        // FT: Only overriden ngOnInit is called if it exists
        // this.ngOnInit(); // Maybe add it, i didn't need for now...

        this.onAfterSaveList();
      });
      
      this.onAfterSaveListRequest();
    }
  }

  isFormArrayValid(): boolean {
    if(this.formArray == null)
      return true;

    let invalid: boolean = false;

    (this.formArray.controls as FormGroup[]).forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(key => {
        let formControl = formGroup.controls[key] as SoftFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work
        formControl.markAsDirty();
        if (formControl.invalid && this.formArrayControlNamesFromHtml.includes(formControl.label)) {
          invalid = true;
        }
      });
    });

    if (invalid || this.invalidForm) {
      return false;
    }

    return true;
  }

  checkFormArrayValidity(): boolean {
    if(this.formArray == null)
      return true;

    let invalid: boolean = false;

    (this.formArray.controls as FormGroup[]).forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(key => {
        let formControl = formGroup.controls[key] as SoftFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work
        formControl.markAsDirty();
        if (formControl.invalid && this.formArrayControlNamesFromHtml.includes(formControl.label)) {
          invalid = true;
        }
      });
    });

    if (invalid || this.invalidForm) {
      this.messageService.warningMessage(
        $localize`:@@YouHaveSomeInvalidFieldsDescription:Some of the fields on the form are not valid, please check which ones and try again.`,
        $localize`:@@YouHaveSomeInvalidFieldsTitle:You have some invalid fields`, 
      );

      return false;
    }

    return true;
  }

  onBeforeSaveList(){}
  onAfterSaveList(){}
  onAfterSaveListRequest(){}

  lastMenuIconIndexClicked: number;

  getCrudMenuForOrderedData(instantiatedModel: any){
    let crudMenuForOrderedData: MenuItem[] = [
        {label: $localize`:@@Remove:Remove`, icon: 'pi pi-minus', command: () => {
            this.removeFormControlFromTheFormArray(this.lastMenuIconIndexClicked);
        }},
        {label: $localize`:@@AddAbove:Add above`, icon: 'pi pi-arrow-up', command: () => {
            this.addNewFormControlToTheFormArray(instantiatedModel, this.lastMenuIconIndexClicked);
        }},
        {label: $localize`:@@AddBelow:Add below`, icon: 'pi pi-arrow-down', command: () => {
            this.addNewFormControlToTheFormArray(instantiatedModel, this.lastMenuIconIndexClicked + 1);
        }},
    ];

    return crudMenuForOrderedData;
  }

  //#endregion

}
