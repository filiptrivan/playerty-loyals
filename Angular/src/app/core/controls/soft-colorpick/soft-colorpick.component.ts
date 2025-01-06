import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';
import { ColorPickerChangeEvent } from 'primeng/colorpicker';

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

    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
    ) { 
        super(translocoService, translateLabelsService);
    }

    override ngOnInit(){
        this.control.valueChanges.subscribe((value) => {
            this.control.setValue(value, { emitEvent: false }); // FT: Preventing infinite loop
        });

        if (this.control.value == null)
            this.placeholder = this.translocoService.translate('SelectAColor');

        super.ngOnInit();
    }

}
