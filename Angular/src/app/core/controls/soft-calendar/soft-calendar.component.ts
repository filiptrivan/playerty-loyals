import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredComponent } from '../../components/required/required.component';

@Component({
    selector: 'soft-calendar',
    templateUrl: './soft-calendar.component.html',
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
export class SoftCalendarComponent extends BaseControl implements OnInit {
    constructor() {
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    setDate(event:Date) { 
        // event.setTime(event.getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
        // console.log(event)
        // this.control.setValue(event)
    }
}
