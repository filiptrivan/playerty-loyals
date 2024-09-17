import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { DialogService } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TooltipModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    RippleModule,
    PanelModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TooltipModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    RippleModule,
    PanelModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule
  ],
  declarations: [],
  providers: [
    DialogService,
  ],
})
export class PrimengModule {}
