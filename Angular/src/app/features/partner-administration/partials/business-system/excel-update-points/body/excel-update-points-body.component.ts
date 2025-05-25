import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { getControl, SpiderlyControlsModule, SpiderlyFileSelectEvent, SpiderlyFormGroup, SpiderlyPanelsModule } from 'spiderly';
import { ExcelUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'excel-update-points-body',
    templateUrl: './excel-update-points-body.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderlyPanelsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        ButtonModule,
        TranslocoDirective
    ]
})
export class ExcelUpdatePointsBodyComponent implements OnInit {
    @Input() excelUpdatePointsFormGroup: SpiderlyFormGroup<ExcelUpdatePoints>;
    @Input() isAuthorizedForSave: boolean = false;
    excels: File[] = [];

    constructor(
        
    ) { 
    }

    ngOnInit(){

    }

    onSelectedExcelUpdateFile(event: SpiderlyFileSelectEvent){
        this.excels.push(event.file);
        this.excelUpdatePointsFormGroup.controls.excels.setValue(this.excels);
        this.excelUpdatePointsFormGroup.controls.excels.setErrors(null);
    }

    onRemovedExcelUpdateFile(){
        this.excelUpdatePointsFormGroup.controls.excels.setValue(null);
    }

    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }
}
