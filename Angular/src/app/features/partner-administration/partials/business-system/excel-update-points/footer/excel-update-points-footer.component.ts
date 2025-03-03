import { ExternalBusinessAppCodes } from './../../../../../../business/enums/external-business-app-codes';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { BaseFormService, isNullOrEmpty, SpiderControlsModule, SpiderFormGroup, SpiderMessageService, SpiderPanelsModule } from '@playerty/spider';
import { BusinessSystem, ExcelUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api/menuitem';

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

    buttonExcelManualUpdatePointsForWings: MenuItem = {label: 'Wings', icon:'pi pi-history'};
    dropdownButtonItems: MenuItem[] = [
        this.buttonExcelManualUpdatePointsForWings
    ];

    constructor(
        private baseFormService: BaseFormService,
        private apiService: ApiService,
        private translocoService: TranslocoService,
        private messageService: SpiderMessageService,
    ) { 
    }

    ngOnInit(){
        this.buttonExcelManualUpdatePointsForWings.command = this.excelManualUpdatePointsForWings;
    }

    excelManualUpdatePoints = () => {
        if (this.excelUpdatePointsFormGroup.controls.excels.getRawValue() == null) {
            this.handleExcelNotSelectedError();
            return;
        }
        
        const excelUpdatePoints = this.getExcelUpdatePoints();

        // this.apiService.excelUpdatePoints(excelUpdatePoints).subscribe(() => {
        //     this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        // });
    }

    excelManualUpdatePointsForWings = () => {
        if (this.excelUpdatePointsFormGroup.controls.excels.getRawValue() == null) {
            this.handleExcelNotSelectedError();
            return;
        }
        
        const excelUpdatePoints = this.getExcelUpdatePoints();

        this.apiService.excelUpdatePointsForWings(excelUpdatePoints).subscribe((result) => {
            if (isNullOrEmpty(result.info) === false) {
                this.messageService.infoMessage(result.info, null, true);
            }

            if (isNullOrEmpty(result.warning) === false) {
                this.messageService.warningMessage(result.warning, null, true);
            }

            this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        });
    }

    handleExcelNotSelectedError(){
        this.baseFormService.showInvalidFieldsMessage();
        this.excelUpdatePointsFormGroup.controls.excels.markAsDirty();
        this.excelUpdatePointsFormGroup.controls.excels.setErrors({_: true});
    }

    getExcelUpdatePoints(){
        return new ExcelUpdatePoints({
            businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(),
            businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(),
            excels: this.excelUpdatePointsFormGroup.controls.excels.getRawValue()
        });
    }
}
