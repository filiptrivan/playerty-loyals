import { SpiderFileSelectEvent } from './../../../../core/controls/spider-file/spider-file.component';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BusinessSystem, BusinessSystemUpdatePointsDataBody, UpdatePoints, ExcelManualUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SpiderMessageService } from 'src/app/core/services/spider-message.service';
import { Column } from 'src/app/core/components/spider-data-table/spider-data-table.component';
import { SpiderFormGroup } from 'src/app/core/components/spider-form-control/spider-form-control';
import { BaseFormService } from 'src/app/core/services/base-form.service';
import { SpiderButton } from 'src/app/core/entities/spider-button';

@Component({
    selector: 'business-system-details',
    templateUrl: './business-system-details.component.html',
    styles: [],
})
export class BusinessSystemDetailsComponent extends BaseFormCopy implements OnInit {
    businessSystemFormGroup = new SpiderFormGroup<BusinessSystem>({});
    
    additionalButtons: SpiderButton[] = [
        {label: this.translocoService.translate('SyncDiscountCategories'), onClick: this.onSyncDiscountCategories, icon: 'pi pi-sync'}
    ]

    businessSystemUpdatePointsScheduledTaskTableCols: Column[];
    getBusinessSystemUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.getBusinessSystemUpdatePointsScheduledTaskTableData;
    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel;
    businessSystemUpdatePointsScheduledTaskTableTotalRecords: number;
    
    
    businessSystemUpdatePointsDataFormGroup = new SpiderFormGroup<BusinessSystemUpdatePointsDataBody>({});
    
    savedBusinessSystemUpdatePointsScheduledTaskIsPaused: boolean = null;

    manualUpdatePointsFormGroup = new SpiderFormGroup<UpdatePoints>({});
    
    excelManualUpdatePointsFormGroup = new SpiderFormGroup<ExcelManualUpdatePoints>({});
    excelManualUpdatePointsFormData: FormData;
    excelManualUpdatePointsFile: File;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService, baseFormService);
    }
         
    override ngOnInit() {
        this.initBusinessSystemUpdatePointsScheduledTaskTableCols();
    }
    
    businessSystemFormGroupInitFinish(){
        this.initBusinessSystemUpdatePointsDataFormGroup();
        this.initManualUpdatePointsFormGroup();
        this.initExcelManualUpdatePointsFormGroup();
    }

    onSyncDiscountCategories(){
        this.apiService.syncDiscountCategories(this.businessSystemFormGroup.getRawValue().id).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSyncToastDescription'));
        })
    }

    initBusinessSystemUpdatePointsScheduledTaskTableCols(){
        this.businessSystemUpdatePointsScheduledTaskTableCols = [
            {name: this.translocoService.translate('TransactionsFrom'), filterType: 'date', field: 'transactionsFrom', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('TransactionsTo'), filterType: 'date', field: 'transactionsTo', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('IsManuallyStarted'), filterType: 'boolean', field: 'isManual'},
        ]
    }

    initBusinessSystemUpdatePointsDataFormGroup = () => {
        this.baseFormService.createFormGroup(
            this.businessSystemUpdatePointsDataFormGroup, 
            new BusinessSystemUpdatePointsDataBody({
                businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(), 
                businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(), 
                updatePointsStartDate: this.businessSystemFormGroup.controls.updatePointsStartDate.getRawValue(), 
                updatePointsInterval: this.businessSystemFormGroup.controls.updatePointsInterval.getRawValue(),
            })
        );
    }
    
    onSaveBusinessSystemUpdatePointsData(){
        if (!this.areFormControlsValid([this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsStartDate, this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsInterval])) {
            this.showInvalidFieldsMessage();
            return;
        }

        this.apiService.saveBusinessSystemUpdatePointsData(this.businessSystemUpdatePointsDataFormGroup.getRawValue()).subscribe((version) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

            this.businessSystemFormGroup.controls.updatePointsInterval.setValue(this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsInterval.getRawValue());
            this.businessSystemFormGroup.controls.updatePointsStartDate.setValue(this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsStartDate.getRawValue());
            this.businessSystemFormGroup.controls.version.setValue(version);
        });
    }
    
    initManualUpdatePointsFormGroup = () => {
        this.baseFormService.createFormGroup(
            this.manualUpdatePointsFormGroup, 
            new UpdatePoints({
                businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(), 
                businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(), 
            })
        );
    }

    scheduleJobManually(){
        if (!this.areFormControlsValid([this.manualUpdatePointsFormGroup.controls.fromDate, this.manualUpdatePointsFormGroup.controls.toDate])) {
            this.showInvalidFieldsMessage();
            return;
        }
        
        this.apiService.updatePoints(this.manualUpdatePointsFormGroup.getRawValue()).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));

            this.manualUpdatePointsFormGroup.controls.fromDate.setValue(null);
            this.manualUpdatePointsFormGroup.controls.toDate.setValue(null);
        });
    }
    
    initExcelManualUpdatePointsFormGroup = () => {
        this.baseFormService.createFormGroup(this.excelManualUpdatePointsFormGroup, new ExcelManualUpdatePoints({}));
    }

    onSelectedExcelManualUpdateFile(event: SpiderFileSelectEvent){
        this.excelManualUpdatePointsFile = event.file;
    }

    excelManualUpdatePoints(){
        if (this.excelManualUpdatePointsFile == null) {
            this.showInvalidFieldsMessage();
            return;
        }
        
        let excelManualUpdatePoints = new ExcelManualUpdatePoints({
            businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(),
            businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(),
            excel: this.excelManualUpdatePointsFile
        });
        this.apiService.excelManualUpdatePoints(excelManualUpdatePoints).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        });
    }

    override onBeforeSave = (): void => {
        
    }

    override onAfterSave = (): void => {
        this.savedBusinessSystemUpdatePointsScheduledTaskIsPaused = this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue();
    }
}

