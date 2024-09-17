import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from '../../components/required/required.component';
import { BaseDropdownControl } from '../base-dropdown-control';

@Component({
    selector: 'soft-multiselect',
    templateUrl: './soft-multiselect.component.html',
    styles: [],
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
