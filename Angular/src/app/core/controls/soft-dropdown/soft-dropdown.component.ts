import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { BaseDropdownControl } from '../base-dropdown-control';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/translated-labels.generated';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
    selector: 'soft-dropdown',
    templateUrl: './soft-dropdown.component.html',
    styles: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        RequiredComponent
    ]
})
export class SoftDropdownComponent extends BaseDropdownControl implements OnInit {
    @Output() onChange: EventEmitter<DropdownChangeEvent> = new EventEmitter();

    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
    ) { 
        super(translocoService, translateLabelsService);
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    buttonClick(){

    }

    change(event: DropdownChangeEvent){
        this.onChange.next(event);
    }

}
