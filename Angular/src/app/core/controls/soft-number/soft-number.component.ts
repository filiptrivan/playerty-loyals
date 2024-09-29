import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'soft-number',
    templateUrl: './soft-number.component.html',
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
export class SoftNumberComponent extends BaseControl implements OnInit {
    @Input() prefix: string;
    @Input() showButtons: boolean = true;
    @Input() decimal: boolean;
    @Input() maxFractionDigits: number = 0;

    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }
    
}
