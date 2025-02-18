import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BusinessSystem, BusinessSystemUpdatePointsDataBody, UpdatePoints, ExcelManualUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, SpiderFormGroup, SpiderButton, Column, SpiderMessageService, BaseFormService, SpiderFileSelectEvent, IsAuthorizedForSaveEvent, SpiderTab } from '@playerty/spider';

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
    
    automaticUpdatePointsFormGroup = new SpiderFormGroup<BusinessSystemUpdatePointsDataBody>({});
    
    savedBusinessSystemUpdatePointsScheduledTaskIsPaused: boolean = null;
    
    manualUpdatePointsFormGroup = new SpiderFormGroup<UpdatePoints>({});
    
    excelUpdatePointsFormGroup = new SpiderFormGroup<ExcelManualUpdatePoints>({});
    
    isAuthorizedForSave: boolean = false;

    syncDiscountCategoriesButton = new SpiderButton({label: this.translocoService.translate('SyncDiscountCategories'), icon: 'pi pi-sync', disabled: true});
    additionalButtons: SpiderButton[] = [];

    updatePointsTabs: SpiderTab[] = [
        {label: this.translocoService.translate('ExcelManualUpdatePoints'), icon: 'pi pi-file-excel', isSelected: true, id: 1},
        {label: this.translocoService.translate('BusinessSystemUpdatePointsData'), icon: 'pi pi-calendar-clock', isSelected: false, id: 2},
        {label: this.translocoService.translate('ManualUpdatePoints'), icon: 'pi pi-hammer', isSelected: false, id: 3},
    ];

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
        this.syncDiscountCategoriesButton.onClick = this.syncDiscountCategories;
        this.additionalButtons.push(this.syncDiscountCategoriesButton);
        this.initBusinessSystemUpdatePointsScheduledTaskTableCols();
    }

    initBusinessSystemUpdatePointsScheduledTaskTableCols(){
        this.businessSystemUpdatePointsScheduledTaskTableCols = [
            {name: this.translocoService.translate('TransactionsFrom'), filterType: 'date', field: 'transactionsFrom', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('TransactionsTo'), filterType: 'date', field: 'transactionsTo', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('IsManuallyStarted'), filterType: 'boolean', field: 'isManual'},
        ]
    }
    
    businessSystemFormGroupInitFinish(){
        this.initAutomaticUpdatePointsFormGroup();
        this.initExcelUpdatePointsFormGroup();
        this.initManualUpdatePointsFormGroup();
    }

    //#region Init form groups

    initAutomaticUpdatePointsFormGroup = () => {
        this.createFormGroup(
            this.automaticUpdatePointsFormGroup, 
            new BusinessSystemUpdatePointsDataBody({
                businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(), 
                updatePointsStartDate: this.businessSystemFormGroup.controls.updatePointsStartDate.getRawValue(), 
                updatePointsInterval: this.businessSystemFormGroup.controls.updatePointsInterval.getRawValue(),
            })
        );
    }
    
    initManualUpdatePointsFormGroup = () => {
        this.createFormGroup(
            this.manualUpdatePointsFormGroup, 
            new UpdatePoints({
                businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(), 
            }),
            ['fromDate', 'toDate']
        );
    }
    
    initExcelUpdatePointsFormGroup = () => {
        this.createFormGroup(this.excelUpdatePointsFormGroup, new ExcelManualUpdatePoints({}));
    }

    //#endregion

    syncDiscountCategories = () => {
        this.apiService.syncDiscountCategories(this.businessSystemFormGroup.getRawValue().id).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSyncToastDescription'));
        })
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;
        this.syncDiscountCategoriesButton.disabled = !event.isAuthorizedForSave;
    }

    override onBeforeSave = (): void => {
        
    }

    override onAfterSave = (): void => {
        console.log(this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue())
        this.savedBusinessSystemUpdatePointsScheduledTaskIsPaused = this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue();
    }
}

