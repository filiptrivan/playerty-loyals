import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { SoftPanelsModule } from "../soft-panels/soft-panels.module";

@Component({
    selector: 'info-card',
    templateUrl: './info-card.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftPanelsModule
]
})
export class InfoCardComponent {
    @Input() public header: string = '';
    @Input() public description: string;
    
    constructor(
        protected formBuilder: FormBuilder,
        ) {

        }

    ngOnInit(){
    }

}