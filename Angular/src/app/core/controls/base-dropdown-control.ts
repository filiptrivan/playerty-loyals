import {
    Component,
    Input,
  } from '@angular/core';
import { BaseControl } from './base-control';
import { PrimengOption } from '../entities/primeng-option';

  @Component({
    selector: 'base-dropdown-control',
    template: '',
    styles: [],
  })
  export class BaseDropdownControl extends BaseControl {
    @Input() options: PrimengOption[];

    dropdownMarkAsDirty(){
      this.control.markAsDirty();
    }
  }