import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { BusinessSystem, BusinessSystemSaveBody, BusinessSystemUpdatePointsDataBody, UpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { BaseFormService } from 'src/app/core/services/base-form.service';

@Component({
    selector: 'business-system-details',
    templateUrl: './business-system-details.component.html',
    styles: [],
})
export class BusinessSystemDetailsComponent extends BaseFormCopy implements OnInit {
    businessSystemFormGroup = new SoftFormGroup<BusinessSystem>({});
    businessSystemSaveBodyName: string = nameof<BusinessSystemSaveBody>('businessSystemDTO');
    
    businessSystemUpdatePointsScheduledTaskTableCols: Column[];
    businessSystemUpdatePointsScheduledTaskTableObjectNameForTheRequest: string = 'BusinessSystemUpdatePointsScheduledTask';
    getBusinessSystemUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.getBusinessSystemUpdatePointsScheduledTaskTableData;
    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel;
    businessSystemUpdatePointsScheduledTaskTableTotalRecords: number;
    
    manualUpdatePointsFromDate = new SoftFormControl<Date>(null, {updateOn: 'change'});
    manualUpdatePointsToDate = new SoftFormControl<Date>(null, {updateOn: 'change'});

    businessSystemUpdatePointsDataFormGroup = new SoftFormGroup<BusinessSystemUpdatePointsDataBody>({});

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
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService, baseFormService);
    }
         
    override ngOnInit() {
        this.validatorService.notEmpty(this.manualUpdatePointsFromDate);
        this.validatorService.notEmpty(this.manualUpdatePointsToDate);

        this.initializeBusinessSystemUpdatePointsScheduledTaskTableCols();

        this.formGroup.saveObservableMethod = this.apiService.saveBusinessSystem;

        this.route.params.subscribe((params) => {
            this.modelId = +params['id'];

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
        this.baseFormService.initFormGroup(this.businessSystemFormGroup, this.formGroup, businessSystem, this.businessSystemSaveBodyName);
        this.loading = false;
    }

    initBusinessSystemUpdatePointsDataFormGroup(businessSystem: BusinessSystem){
        this.baseFormService.createFormGroup(
            this.businessSystemUpdatePointsDataFormGroup, 
            new BusinessSystemUpdatePointsDataBody({
                businessSystemId: this.businessSystemFormGroup.controls.id.getRawValue(), 
                businessSystemVersion: this.businessSystemFormGroup.controls.version.getRawValue(), 
                updatePointsStartDate: businessSystem.updatePointsStartDate, 
                updatePointsInterval: businessSystem.updatePointsInterval
            })
        )
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
    
    scheduleJobManually(){
        if (!this.areFormControlsValid([this.manualUpdatePointsFromDate, this.manualUpdatePointsToDate])) {
            this.showInvalidFieldsMessage();
            return;
        }

        const updatePointsDTO: UpdatePoints = {
            businessSystemId: this.businessSystemFormGroup.getRawValue().id, 
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
        this.apiService.syncDiscountCategories(this.businessSystemFormGroup.getRawValue().id).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSyncToastDescription'));
        })
    }
    
    override onBeforeSave = (): void => {
        let saveBody: BusinessSystemSaveBody = new BusinessSystemSaveBody();
        
        saveBody.businessSystemDTO = this.businessSystemFormGroup.getRawValue();
        
        this.saveBody = saveBody;
    }

    override onAfterSave = (): void => {
        this.savedBusinessSystemUpdatePointsScheduledTaskIsPaused = this.businessSystemFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue();
    }
}

