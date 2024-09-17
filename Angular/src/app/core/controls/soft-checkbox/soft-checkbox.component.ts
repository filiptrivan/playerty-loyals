import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from '../../components/required/required.component';

@Component({
    selector: 'soft-checkbox',
    templateUrl: './soft-checkbox.component.html',
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
export class SoftCheckboxComponent extends BaseControl implements OnInit {
    @Input() initializeToFalse = true;

    constructor() {
        super();
     }

     override ngOnInit(){
        if (this.initializeToFalse == true)
            this.control.setValue(false);

        super.ngOnInit();
    }
}
