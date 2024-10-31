import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredComponent } from '../../components/required/required.component';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/translated-labels.generated';

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
    
    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
    ) { 
        super(translocoService, translateLabelsService);
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
