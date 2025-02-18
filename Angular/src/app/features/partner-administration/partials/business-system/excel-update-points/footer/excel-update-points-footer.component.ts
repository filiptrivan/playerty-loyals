import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { BaseFormService, SpiderControlsModule, SpiderFormGroup, SpiderMessageService, SpiderPanelsModule } from '@playerty/spider';
import { BusinessSystem, ExcelUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'excel-update-points-footer',
    templateUrl: './excel-update-points-footer.component.html',
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
export class ExcelUpdatePointsFooterComponent implements OnInit {
    @Input() excelUpdatePointsFormGroup: SpiderFormGroup<ExcelUpdatePoints>;
    @Input() businessSystemFormGroup: SpiderFormGroup<BusinessSystem>;
    @Input() isAuthorizedForSave: boolean = false;

    constructor(
        private baseFormService: BaseFormService,
        private apiService: ApiService,
        private translocoService: TranslocoService,
        private messageService: SpiderMessageService,
    ) { 
    }

    ngOnInit(){

    }

    excelManualUpdatePoints(){
        if (this.excelUpdatePointsFormGroup.controls.excel.getRawValue() == null) {
            this.baseFormService.showInvalidFieldsMessage();
            this.excelUpdatePointsFormGroup.controls.excel.markAsDirty();
            this.excelUpdatePointsFormGroup.controls.excel.setErrors({_: true});
            return;
        }
        
        const excelUpdatePoints = new ExcelUpdatePoints({
            businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(),
            businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(),
            excel: this.excelUpdatePointsFormGroup.controls.excel.getRawValue()
        });

        this.apiService.excelManualUpdatePoints(excelUpdatePoints).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        });
    }
}
