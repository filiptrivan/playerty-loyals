import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { BaseFormService, SpiderControlsModule, SpiderFormGroup, SpiderMessageService, SpiderPanelsModule } from '@playerty/spider';
import { BusinessSystem, ExcelManualUpdatePoints, UpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'manual-update-points-footer',
    templateUrl: './manual-update-points-footer.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderPanelsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        ButtonModule,
        TranslocoDirective,
    ]
})
export class ManualUpdatePointsFooterComponent implements OnInit {
    @Input() manualUpdatePointsFormGroup: SpiderFormGroup<UpdatePoints>;
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

    scheduleJobManually(){
        if (!this.baseFormService.areFormControlsValid([this.manualUpdatePointsFormGroup.controls.fromDate, this.manualUpdatePointsFormGroup.controls.toDate])) {
            this.baseFormService.showInvalidFieldsMessage();
            return;
        }
        
        this.manualUpdatePointsFormGroup.controls.businessSystemId.setValue(this.businessSystemFormGroup.getRawValue().id);
        this.manualUpdatePointsFormGroup.controls.businessSystemVersion.setValue(this.businessSystemFormGroup.getRawValue().version);

        this.apiService.updatePoints(this.manualUpdatePointsFormGroup.getRawValue()).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));

            this.manualUpdatePointsFormGroup.reset();
        });
    }

}
