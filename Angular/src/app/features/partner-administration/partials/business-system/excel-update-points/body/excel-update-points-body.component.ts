import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { getControl, SpiderControlsModule, SpiderFileSelectEvent, SpiderFormGroup, SpiderPanelsModule } from '@playerty/spider';
import { ExcelUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'excel-update-points-body',
    templateUrl: './excel-update-points-body.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderPanelsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        ButtonModule,
        TranslocoDirective
    ]
})
export class ExcelUpdatePointsBodyComponent implements OnInit {
    @Input() excelUpdatePointsFormGroup: SpiderFormGroup<ExcelUpdatePoints>;
    @Input() isAuthorizedForSave: boolean = false;

    constructor(
        
    ) { 
    }

    ngOnInit(){

    }

    onSelectedExcelUpdateFile(event: SpiderFileSelectEvent){
        this.excelUpdatePointsFormGroup.controls.excel.setValue(event.file);
        this.excelUpdatePointsFormGroup.controls.excel.setErrors(null);
    }

    onRemovedExcelUpdateFile(){
        this.excelUpdatePointsFormGroup.controls.excel.setValue(null);
    }

    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }
}
