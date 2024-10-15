import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'soft-colorpick',
    templateUrl: './soft-colorpick.component.html',
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
export class SoftColorpickComponent extends BaseControl implements OnInit {

    constructor() { 
        super();
    }

    override ngOnInit(){
        if (this.control.value == null) {
            this.placeholder = $localize`:@@SelectAColor:Select a color`;
        }

        super.ngOnInit();
    }
    
}
