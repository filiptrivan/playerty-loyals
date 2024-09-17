import {
  ChangeDetectorRef,
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseEntity } from '../../entities/base-entity';
import { SoftFormControl } from '../soft-form-control/soft-form-control';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SoftMessageService } from '../../services/soft-message.service';
import { getTranslatedClassName } from 'src/app/business/services/translates/translated-class-names.generated';
import { getValidator } from 'src/app/business/services/validation/validation-rules.generated';

@Component({
  selector: 'base-form',
  template: '',
  styles: [],
})
export class BaseForm<T extends BaseEntity> { 
  formGroup: FormGroup;
  model: T;
  modelId: number;
  controlNamesFromHtml: string[] = [];
  detailsTitle: string;
  invalidForm: boolean = false; // FT: We are using this only if we manualy add some form field on the UI, like multiautocomplete, autocomplete etc...

  private modelDiffer: KeyValueDiffer<string, any>;

  constructor(
    protected differs: KeyValueDiffers, 
    protected http: HttpClient, 
    protected messageService: SoftMessageService, 
    protected changeDetectorRef: ChangeDetectorRef,
    ) {
  }

  initFormGroup(model: T) {
    this.model = model;
    this.detailsTitle = getTranslatedClassName(this.model.typeName);

    this.formGroup = new FormGroup({});

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
    // FT: Adding only validators with controls('...') in html
    formControl.validator = getValidator(formControl, this.model.typeName);
    // formControl.updateValueAndValidity(); // FT: Check if you need it, i think it's not necessary
    // if(formControl.validator.toString().includes('notEmptyRule')) // FT HACK: Be carefull with this name, if you change it in generator you need to change it here also
    //   formControl.required = true; // FT: If you have problem with only putting this in BaseControl, call it here also
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  control(formControlName: string, customValidation: boolean = false) {
    let formControl: SoftFormControl = this.formGroup.controls[formControlName] as SoftFormControl;
    if (formControl == null && environment.production == false)
      console.error(
        `formControl with specified name: '${formControlName}' does not exist in DTO.`
      );
    if(this.controlNamesFromHtml.find(x => x == formControlName) == null) // FT: Add it only if it's not there already
    {
      this.controlNamesFromHtml.push(formControlName);
      if(customValidation == false) {
        this.setValidator(formControl);
      }
    }
    
    return formControl;
  }

  onSave(){
    this.onBeforeSave();

    let isValid: boolean = this.checkFormGroupValidity();

    if(isValid){
      this.http.put<T>(environment.apiUrl + `/${this.model.typeName}/Save${this.model.typeName}`, this.model, environment.httpOptions).subscribe(res => {
        Object.assign(this.model, res) // this.model = res; // FT: we lose typeName like this and everything that res doesn't have but this.model has
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

  onBeforeSave(){}
  onAfterSave(){}
  onAfterSaveRequest(){}
}
