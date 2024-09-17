import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SoftCalendarModule } from './soft-calendar/soft-calendar.module';
import { SoftPanelsModule } from '../components/soft-panels/soft-panels.module';
import { SoftReturnButtonComponent } from '../components/soft-buttons/soft-return-button.component';
import { SoftMultiAutocompleteComponent } from './soft-multiautocomplete/soft-multiautocomplete.component';
import { SoftPasswordComponent } from './soft-password/soft-password.component';
import { SoftTextboxComponent } from './soft-textbox/soft-textbox.component';
import { SoftCheckboxComponent } from './soft-checkbox/soft-checkbox.component';
import { SoftMultiselectComponent } from './soft-multiselect/soft-multiselect.component';
import { SoftTextareaComponent } from './soft-textarea/soft-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SoftTextboxComponent,
    SoftTextareaComponent,
    SoftCheckboxComponent,
    SoftCalendarModule,
    SoftReturnButtonComponent,
    SoftPanelsModule,
    SoftPasswordComponent,
    SoftMultiAutocompleteComponent,
    SoftMultiselectComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SoftTextboxComponent,
    SoftTextareaComponent,
    SoftCheckboxComponent,
    SoftCalendarModule,
    SoftReturnButtonComponent,
    SoftPanelsModule,
    SoftPasswordComponent,
    SoftMultiAutocompleteComponent,
    SoftMultiselectComponent
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class SoftControlsModule {}