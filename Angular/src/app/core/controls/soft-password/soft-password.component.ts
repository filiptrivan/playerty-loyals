import { Component, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'soft-password',
    templateUrl: './soft-password.component.html',
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
export class SoftPasswordComponent extends BaseControl implements OnInit {

    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }

}
