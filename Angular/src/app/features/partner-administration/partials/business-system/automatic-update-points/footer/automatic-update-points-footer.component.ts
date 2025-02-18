import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { SpiderControlsModule, SpiderFormGroup, SpiderPanelsModule, BaseFormService, SpiderMessageService } from '@playerty/spider';
import { AutomaticUpdatePoints, BusinessSystem } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'automatic-update-points-footer',
    templateUrl: './automatic-update-points-footer.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderPanelsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        ButtonModule,
        TranslocoDirective,
        CommonModule,
    ]
})
export class AutomaticUpdatePointsFooterComponent implements OnInit {
    @Input() businessSystemFormGroup: SpiderFormGroup<BusinessSystem>;
    @Input() automaticUpdatePointsFormGroup: SpiderFormGroup<AutomaticUpdatePoints>;
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

    automaticUpdatePoints(){
        if (!this.baseFormService.areFormControlsValid([this.automaticUpdatePointsFormGroup.controls.updatePointsStartDate, this.automaticUpdatePointsFormGroup.controls.updatePointsInterval])) {
            this.baseFormService.showInvalidFieldsMessage();
            return;
        }

        this.automaticUpdatePointsFormGroup.controls.businessSystemVersion.setValue(this.businessSystemFormGroup.getRawValue().version);

        this.apiService.automaticUpdatePoints(this.automaticUpdatePointsFormGroup.getRawValue()).subscribe((version) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

            this.businessSystemFormGroup.controls.version.setValue(version);
            this.businessSystemFormGroup.controls.updatePointsStartDate.setValue(this.automaticUpdatePointsFormGroup.getRawValue().updatePointsStartDate);
            this.businessSystemFormGroup.controls.updatePointsInterval.setValue(this.automaticUpdatePointsFormGroup.getRawValue().updatePointsInterval);
            this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.setValue(false);
        });
    }

    changeScheduledTaskUpdatePointsStatus(){
        this.apiService.changeScheduledTaskUpdatePointsStatus(this.businessSystemFormGroup.getRawValue().id, this.businessSystemFormGroup.getRawValue().version).subscribe((version) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
            this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.setValue(!this.businessSystemFormGroup.getRawValue().updatePointsScheduledTaskIsPaused);
            this.businessSystemFormGroup.controls.version.setValue(version);
        });
    }

}
