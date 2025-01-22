import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { SpiderPanelsModule } from "../spider-panels/spider-panels.module";

@Component({
    selector: 'info-card',
    templateUrl: './info-card.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SpiderPanelsModule
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