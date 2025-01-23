import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredComponent } from '../../components/required/required.component';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';

@Component({
    selector: 'spider-calendar',
    templateUrl: './spider-calendar.component.html',
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
export class SpiderCalendarComponent extends BaseControl implements OnInit {
    @Input() showTime: boolean = false;

    constructor(
        protected override translocoService: TranslocoService,
    ) { 
        super(translocoService);
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
