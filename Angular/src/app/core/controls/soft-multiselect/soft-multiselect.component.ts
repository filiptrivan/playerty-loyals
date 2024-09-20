import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from '../../components/required/required.component';
import { BaseDropdownControl } from '../base-dropdown-control';

@Component({
    selector: 'soft-multiselect',
    templateUrl: './soft-multiselect.component.html',
    styles: [
`
::ng-deep .p-multiselect-label-container, .p-multiselect-chip {
    display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  gap: 10px;
}

::ng-deep .p-multiselect-token, .p-multiselect-token-label {
}
`
    ],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        RequiredComponent
    ]
})
export class SoftMultiselectComponent extends BaseDropdownControl implements OnInit {
    
    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }
}
