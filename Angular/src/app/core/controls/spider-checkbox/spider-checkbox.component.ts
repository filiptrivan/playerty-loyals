import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from '../../components/required/required.component';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';

@Component({
    selector: 'spider-checkbox',
    templateUrl: './spider-checkbox.component.html',
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
export class SpiderCheckboxComponent extends BaseControl implements OnInit {
    @Input() fakeLabel = true;
    @Input() initializeToFalse = true;

    constructor(
        protected override translocoService: TranslocoService,
    ) { 
        super(translocoService);
    }

     override ngOnInit(){
        if (this.initializeToFalse == true)
            this.control.setValue(false);

        super.ngOnInit();
    }
}
