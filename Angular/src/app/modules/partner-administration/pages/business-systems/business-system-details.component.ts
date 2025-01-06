import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, Observable } from 'rxjs';
import { BusinessSystem, BusinessSystemSaveBody, BusinessSystemUpdatePointsDataBody, UpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftTab } from 'src/app/core/components/soft-panels/panel-header/panel-header.component';
import { PrimeIcons } from 'primeng/api';
import { SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';

@Component({
    selector: 'business-system-details',
    templateUrl: './business-system-details.component.html',
    styles: [],
})
export class BusinessSystemDetailsComponent extends BaseFormCopy implements OnInit {
    override saveObservableMethod = this.apiService.saveBusinessSystem;

    businessSystemFormGroup: SoftFormGroup<BusinessSystem>;
    businessSystemSaveBodyName: string = nameof<BusinessSystemSaveBody>('businessSystemDTO');
    
    businessSystemUpdatePointsScheduledTaskTableCols: Column[];
    businessSystemUpdatePointsScheduledTaskTableObjectNameForTheRequest: string = 'BusinessSystemUpdatePointsScheduledTask';
    getBusinessSystemUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.getBusinessSystemUpdatePointsScheduledTaskTableData;
    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel;
    businessSystemUpdatePointsScheduledTaskTableTotalRecords: number;
    
    manualUpdatePointsFromDate = new SoftFormControl<Date>(null, {updateOn: 'change'})
    manualUpdatePointsToDate = new SoftFormControl<Date>(null, {updateOn: 'change'})

    businessSystemUpdatePointsDataFormGroup: SoftFormGroup<BusinessSystemUpdatePointsDataBody>;

    savedBusinessSystemUpdatePointsScheduledTaskIsPaused: boolean = null;

    // FT: Tab example
    // tabs: SoftTab[] = [
    //     {label: 'Hello', icon: PrimeIcons.ANDROID, value: 1, isSelected: true},
    //     {label: 'World is better place now', icon: PrimeIcons.AMAZON, value: 2}
    // ];

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.initializeBusinessSystemUpdatePointsScheduledTaskTableCols();

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if (this.modelId > 0) {
                forkJoin({
                    businessSystem: this.apiService.getBusinessSystem(this.modelId),
                })
                .subscribe(({ businessSystem }) => {
                    this.savedBusinessSystemUpdatePointsScheduledTaskIsPaused = businessSystem.updatePointsScheduledTaskIsPaused;
                    this.initBusinessSystemFormGroup(new BusinessSystem(businessSystem));

                    this.initBusinessSystemUpdatePointsDataFormGroup(businessSystem);
                });
            }else{
                this.initBusinessSystemFormGroup(new BusinessSystem({id: 0}));
            }
        });
    }
    
    initializeBusinessSystemUpdatePointsScheduledTaskTableCols(){
        this.businessSystemUpdatePointsScheduledTaskTableCols = [
            {name: this.translocoService.translate('TransactionsFrom'), filterType: 'date', field: 'transactionsFrom', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('TransactionsTo'), filterType: 'date', field: 'transactionsTo', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('IsManuallyStarted'), filterType: 'boolean', field: 'isManual'},
        ]
    }

    initBusinessSystemFormGroup(businessSystem: BusinessSystem){
        this.businessSystemFormGroup = this.initFormGroup(businessSystem, this.businessSystemSaveBodyName);
    }

    initBusinessSystemUpdatePointsDataFormGroup(businessSystem: BusinessSystem){
        this.businessSystemUpdatePointsDataFormGroup = this.createFormGroup(new BusinessSystemUpdatePointsDataBody({businessSystemId: this.modelId, updatePointsStartDate: businessSystem.updatePointsStartDate, updatePointsInterval: businessSystem.updatePointsInterval}))
    }
    
    onSaveBusinessSystemUpdatePointsData(){
        this.apiService.saveBusinessSystemUpdatePointsData(this.businessSystemUpdatePointsDataFormGroup.getRawValue()).subscribe((version) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

            this.businessSystemFormGroup.controls.updatePointsInterval.setValue(this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsInterval.getRawValue());
            this.businessSystemFormGroup.controls.updatePointsStartDate.setValue(this.businessSystemUpdatePointsDataFormGroup.controls.updatePointsStartDate.getRawValue());
            this.businessSystemFormGroup.controls.version.setValue(version);
        });
    }
    
    scheduleJobManually(){
        const updatePointsDTO: UpdatePoints = {
            businessSystemId: this.modelId, 
            businessSystemVersion: this.businessSystemFormGroup.getRawValue().version, 
            fromDate: this.manualUpdatePointsFromDate.getRawValue(),
            toDate: this.manualUpdatePointsToDate.getRawValue(),
        }
        
        this.apiService.updatePoints(updatePointsDTO).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));

            this.manualUpdatePointsFromDate.setValue(null);
            this.manualUpdatePointsToDate.setValue(null);
        });
    }

    onSyncDiscountCategories(){
        this.apiService.syncDiscountCategories(this.modelId).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSyncToastDescription'));
        })
    }
    
    override onBeforeSave(): void {
        let saveBody: BusinessSystemSaveBody = new BusinessSystemSaveBody();
        
        saveBody.businessSystemDTO = this.businessSystemFormGroup.getRawValue();
        
        this.saveBody = saveBody;
    }

    override onAfterSave(): void {
        this.savedBusinessSystemUpdatePointsScheduledTaskIsPaused = this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue();
    }
}
