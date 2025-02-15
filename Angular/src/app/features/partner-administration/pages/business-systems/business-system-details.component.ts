import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BusinessSystem, BusinessSystemUpdatePointsDataBody, UpdatePoints, ExcelManualUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, SpiderFormGroup, SpiderButton, Column, SpiderMessageService, BaseFormService, SpiderFileSelectEvent } from '@playerty/spider';

@Component({
    selector: 'business-system-details',
    templateUrl: './business-system-details.component.html',
    styles: [],
})
export class BusinessSystemDetailsComponent extends BaseFormCopy implements OnInit {
    businessSystemFormGroup = new SpiderFormGroup<BusinessSystem>({});
    
    businessSystemUpdatePointsScheduledTaskTableCols: Column[];
    getBusinessSystemUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.getBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem;
    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem;
    businessSystemUpdatePointsScheduledTaskTableTotalRecords: number;
    
    
    businessSystemUpdatePointsDataFormGroup = new SpiderFormGroup<BusinessSystemUpdatePointsDataBody>({});
    
    savedBusinessSystemUpdatePointsScheduledTaskIsPaused: boolean = null;
    
    manualUpdatePointsFormGroup = new SpiderFormGroup<UpdatePoints>({});
    
    excelManualUpdatePointsFormGroup = new SpiderFormGroup<ExcelManualUpdatePoints>({});
    excelManualUpdatePointsFormData: FormData;
    
    isAuthorizedForSave: boolean = false;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        this.initBusinessSystemUpdatePointsScheduledTaskTableCols();
    }
    
    businessSystemFormGroupInitFinish(){
        this.initBusinessSystemUpdatePointsDataFormGroup();
        this.initManualUpdatePointsFormGroup();
        this.initExcelManualUpdatePointsFormGroup();
    }

    syncDiscountCategories = () => {
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
        this.createFormGroup(
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
        this.createFormGroup(
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
        this.createFormGroup(this.excelManualUpdatePointsFormGroup, new ExcelManualUpdatePoints({}));
    }

    onSelectedExcelManualUpdateFile(event: SpiderFileSelectEvent){
        this.excelManualUpdatePointsFormGroup.controls.excel.setValue(event.file);
        this.excelManualUpdatePointsFormGroup.controls.excel.setErrors(null);
    }

    onRemovedExcelManualUpdateFile(){
        this.excelManualUpdatePointsFormGroup.controls.excel.setValue(null);
    }

    excelManualUpdatePoints(){
        if (this.excelManualUpdatePointsFormGroup.controls.excel.getRawValue() == null) {
            this.showInvalidFieldsMessage();
            this.excelManualUpdatePointsFormGroup.controls.excel.markAsDirty();
            this.excelManualUpdatePointsFormGroup.controls.excel.setErrors({_: true});
            return;
        }
        
        const excelManualUpdatePoints = new ExcelManualUpdatePoints({
            businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(),
            businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(),
            excel: this.excelManualUpdatePointsFormGroup.controls.excel.getRawValue()
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

    additionalButtons: SpiderButton[] = [
        {label: this.translocoService.translate('SyncDiscountCategories'), icon: 'pi pi-sync', onClick: this.syncDiscountCategories, disabled: !this.isAuthorizedForSave}
    ];
}

