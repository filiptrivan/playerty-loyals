import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { BaseDropdownControl } from '../base-dropdown-control';

@Component({
    selector: 'soft-dropdown',
    templateUrl: './soft-dropdown.component.html',
    styles: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        RequiredComponent
    ]
})
export class SoftDropdownComponent extends BaseDropdownControl implements OnInit {
    // @Input() required: boolean = true; // TODO FT: delete if you don't need through whole app

    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    buttonClick(){

    }

    select(event){

    }

}
