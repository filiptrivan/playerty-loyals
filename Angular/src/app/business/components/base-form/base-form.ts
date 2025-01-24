import {
  ChangeDetectorRef,
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BaseEntity } from '../../../core/entities/base-entity';
import { SpiderFormControl } from '../../../core/components/spider-form-control/spider-form-control';
import { HttpClient } from '@angular/common/http';
import { SpiderMessageService } from '../../../core/services/spider-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
  selector: 'base-form',
  template: '',
  styles: [],
})
export class BaseForm<T extends BaseEntity> implements OnInit { 
  formGroup: FormGroup;
  formArray: FormArray;
  formArrayControlNamesFromHtml: string[] = [];
  model: T;
  modelList: T[];
  saveBody: any;
  modelId: number;
  detailsTitle: string;
  invalidForm: boolean = false; // FT: We are using this only if we manualy add some form field on the UI, like multiautocomplete, autocomplete etc...
  controllerName: string;

  private modelDiffer: KeyValueDiffer<string, any>;

  constructor(
    protected differs: KeyValueDiffers, 
    protected http: HttpClient, 
    protected messageService: SpiderMessageService, 
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router, 
    protected route: ActivatedRoute,
    protected translocoService: TranslocoService,
    protected translateClassNamesService: TranslateClassNamesService,
    protected validatorService: ValidatorService,
    protected config: ConfigService
    ) {
  }

  ngOnInit(){
  }

  //#region Model

  initFormGroup(model: T) {
    this.model = Object.assign(this.model ? this.model : {}, model);
    
    this.detailsTitle = this.translateClassNamesService.translate(this.model.typeName);

    this.formGroup = new FormGroup({});
    
    this.modelDiffer = this.differs.find(this.model).create();
  }

  subscribeFormToModelChanges(formGroup: FormGroup, model: T) {
    // both directions
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.controls[key].setValue(model[key]);
    });
  }

  modelChanged(changes: KeyValueChanges<string, any>) {
    // https://stackoverflow.com/questions/46330070/angular-4-how-to-watch-an-object-for-changes
    this.subscribeFormToModelChanges(this.formGroup, this.model);
  }

  ngDoCheck(): void {
    const changes = this.modelDiffer?.diff(this.model);
    if (changes) {
      this.modelChanged(changes);
    }
  }

  setValidator(formControl: SpiderFormControl, model: T = null) {
    if (formControl == null) return null;

    this.validatorService.setValidator(formControl, model ? model.typeName : this.model.typeName);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  // FT: If we put onChange to true, we are validating control on change not on blur.
  // FT: If we assign model, we are taking validators for the other class
  control(formControlName: keyof T & string, updateOnChange: boolean = false, customValidation: boolean = false, disable: boolean = false, model: T = null) {
    let formControl: SpiderFormControl = this.formGroup.controls[formControlName] as SpiderFormControl;

    if (formControl == null) {
      if (updateOnChange)
        formControl = new SpiderFormControl(this.model[formControlName], { updateOn: 'change' });
      else
        formControl = new SpiderFormControl(this.model[formControlName], { updateOn: 'blur' });

      if (formControl == null)
        return null;

      if (formControlName.endsWith('Id') && formControlName.length > 2) {
        formControl.label = formControlName.substring(0, formControlName.length - 2);
      } else if (formControlName.endsWith('DisplayName')) {
        formControl.label = formControlName.replace('DisplayName', '');
      } else {
        formControl.label = formControlName;
      }

      this.formGroup.addControl(formControlName, formControl);

      if(customValidation == false)
        this.setValidator(formControl, model);
      
      if(disable == true)
        formControl.disable();
      
      this.formGroup.controls[formControlName].valueChanges.subscribe(value => {
        this.model[formControlName] = value;
      })
      
      this.onAfterControlInitialization(formControlName);
    }

    return formControl;
  }

  onAfterControlInitialization(formControlName: string) { }

  onSave(doNgOnInit: boolean = false){
    this.onBeforeSave();

    this.saveBody = this.saveBody ?? this.model;
    
    let isValid: boolean = this.isFormGroupValid();
    let isFormArrayValid: boolean = this.isFormArrayValid();
    
    if(isValid && isFormArrayValid){
      let controllerName: string = this.controllerName ?? this.model.typeName;

      this.http.put<T>(this.config.apiUrl + `/${controllerName}/Save${this.model.typeName}`, this.saveBody, this.config.httpOptions).subscribe(res => {
        Object.assign(this.model, res) // this.model = res; // FT: we lose typeName like this and everything that res doesn't have but this.model has

        this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

        if((res as any).id)
          this.rerouteOnTheNewEntity((res as any).id);
        
        // FT: Only overriden ngOnInit is called if it exists
        if (doNgOnInit) {
          this.ngOnInit(); // TODO FT: Even if working with other objects, try to assign everything with Object.assign. Like this we are having more requests then we need.
        }

        this.onAfterSave(res);
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
  onAfterSave(res: any){}
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

  initFormArray(modelList: T[], modelConstructor: T){ // FT HACK: Because generics can't instantiate in TS (because JS)
    this.formArray = new FormArray([]);
    
    if (modelList == null)
      return;

    modelList.forEach(model => {
      Object.assign(modelConstructor, model)
      this.formArray.push(this.createFormGroup(modelConstructor));
    });
  }

  createFormGroup(model: T): FormGroup {
    let formGroup: FormGroup = new FormGroup({});

    Object.keys(model).forEach((key) => {
      formGroup = this.arrayFormGroup(key, formGroup, model);
    });

    return formGroup;
  }

  arrayFormGroup(formControlName: string, formGroup: FormGroup, model: T, updateOnChange: boolean = false, customValidation: boolean = false, disable: boolean = false) {
    let formControl: SpiderFormControl = formGroup.controls[formControlName] as SpiderFormControl;

    if (formControl == null) {
      if (updateOnChange)
        formControl = new SpiderFormControl(model[formControlName], { updateOn: 'change' });
      else
        formControl = new SpiderFormControl(model[formControlName], { updateOn: 'blur' });

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

  // FT: Need to use this from html because can't do "as SpiderFormControl" there
  getFormArrayControl(formControlName: keyof T & string, index: number): SpiderFormControl{
    if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      this.formArrayControlNamesFromHtml.push(formControlName);
    return (this.formArray.controls[index] as FormGroup).controls[formControlName] as SpiderFormControl;
  }

  getFormArrayGroup(index: number): FormGroup{
    return this.formArray.controls[index] as FormGroup
  }

  getFormArrayGroups(): FormGroup[]{
    return this.formArray.controls as FormGroup[]
  }

  removeFormControlFromTheFormArray(index: number) {
    this.formArray.removeAt(index);
  }

  onSaveList(modelConstructor: T){
    this.onBeforeSaveList();
    
    let isValid: boolean = this.checkFormArrayValidity();

    if(isValid){
      let controllerName: string = this.controllerName ?? this.model.typeName;

      this.http.put<T[]>(this.config.apiUrl + `/${controllerName}/Save${this.model.typeName}List`, this.formArray.value, this.config.httpOptions).subscribe((res: T[]) => {
        this.formArray = null;
        this.initFormArray(res, modelConstructor);

        this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

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
        let formControl = formGroup.controls[key] as SpiderFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work
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
        let formControl = formGroup.controls[key] as SpiderFormControl; // this.formArray.markAsDirty(); // FT: For some reason this doesnt work
        formControl.markAsDirty();
        if (formControl.invalid && this.formArrayControlNamesFromHtml.includes(formControl.label)) {
          invalid = true;
        }
      });
    });

    if (invalid || this.invalidForm) {
      this.showInvalidFieldsMessage();

      return false;
    }

    return true;
  }

  onBeforeSaveList(){}
  onAfterSaveList(){}
  onAfterSaveListRequest(){}

  lastMenuIconIndexClicked: number;
  
  //#endregion

}
