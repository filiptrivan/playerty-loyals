import {
  ChangeDetectorRef,
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseEntity } from '../../entities/base-entity';
import { SoftFormControl } from '../soft-form-control/soft-form-control';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SoftMessageService } from '../../services/soft-message.service';
import { getTranslatedClassName } from 'src/app/business/services/translates/translated-class-names.generated';
import { getValidator } from 'src/app/business/services/validation/validation-rules.generated';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'base-form',
  template: '',
  styles: [],
})
export class BaseForm<T extends BaseEntity> implements OnInit { 
  formGroup: FormGroup;
  model: T;
  saveBody: any;
  modelId: number;
  controlNamesFromHtml: string[] = [];
  detailsTitle: string;
  invalidForm: boolean = false; // FT: We are using this only if we manualy add some form field on the UI, like multiautocomplete, autocomplete etc...
  controllerName: string;

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

  initFormGroup(model: T) {
    this.model = model;
    this.detailsTitle = getTranslatedClassName(this.model.typeName);

    this.formGroup = new FormGroup({});
    console.log(model)
    Object.keys(this.model).forEach((key) => {
      let formControl: SoftFormControl = new SoftFormControl(this.model[key]);
      formControl.label = key;
      // formControl.addValidators(getValidator(formControl, this.model.typeName)); // FT: Adding only validators with controls('...') in html, if we add it here we will add for something we don't want
      this.formGroup.addControl(key, formControl);
    });

    // both directions
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].valueChanges.subscribe(value => {
        this.model[key] = value;
      })
    });
    
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

  setValidator(formControl: SoftFormControl) {
    formControl.validator = getValidator(formControl, this.model.typeName);
    if(formControl?.validator?.hasNotEmptyRule)
      formControl.required = true;
    // formControl.updateValueAndValidity(); // FT: Check if you need it, i think it's not necessary
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  control(formControlName: string, customValidation: boolean = false, disable: boolean = false) {
    let formControl: SoftFormControl = this.formGroup.controls[formControlName] as SoftFormControl;
    if (formControl == null && environment.production == false)
      console.error(`formControl with specified name: '${formControlName}' does not exist in DTO.`);

    if(this.controlNamesFromHtml.find(x => x == formControlName) == null) // FT: Add it only if it's not there already
      this.controlNamesFromHtml.push(formControlName);
    
    // FT: Adding only validators with controls('...') in html
    if(customValidation == false) // FT: if we put it in upper if statement the validation won't work.
      this.setValidator(formControl);

    if(disable == true)
      formControl.disable();
    
    return formControl;
  }

  onSave(){
    this.onBeforeSave();

    this.saveBody = this.saveBody ?? this.model;
    
    let isValid: boolean = this.checkFormGroupValidity();

    if(isValid){
      let controllerName: string = this.controllerName ?? this.model.typeName;
      this.http.put<T>(environment.apiUrl + `/${controllerName}/Save${this.model.typeName}`, this.saveBody, environment.httpOptions).subscribe(res => {
        Object.assign(this.model, res) // this.model = res; // FT: we lose typeName like this and everything that res doesn't have but this.model has
        this.messageService.successMessage("You have successfully saved.");
        if((res as any).id){
          this.rerouteOnTheNewEntity((res as any).id);
        }else{
          this.controlNamesFromHtml = []; // FT: If we don't do this the validators will be gone
          this.ngOnInit(); // FT: Only overriden ngOnInit is called if it exists
        }
        this.onAfterSave();
      });
      this.onAfterSaveRequest();
    }
  }

  checkFormGroupValidity(): boolean {
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
}
