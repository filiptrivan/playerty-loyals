import { StoreUpdatePointsDataBody, UpdatePoints } from './../../../../business/entities/generated/business-entities.generated';
import { SoftFormControl, SoftFormGroup } from '../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, Observable } from 'rxjs';
import { Store, StoreSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftTab } from 'src/app/core/components/soft-panels/panel-header/panel-header.component';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'store-details',
    templateUrl: './store-details.component.html',
    styles: [],
})
export class StoreDetailsComponent extends BaseFormCopy implements OnInit {
    override saveObservableMethod = this.apiService.saveStore;

    storeFormGroup: SoftFormGroup<Store>;
    storeSaveBodyName: string = nameof<StoreSaveBody>('storeDTO');
    
    storeUpdatePointsScheduledTaskTableCols: Column[];
    storeUpdatePointsScheduledTaskTableObjectNameForTheRequest: string = 'StoreUpdatePointsScheduledTask';
    loadStoreUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.loadStoreUpdatePointsScheduledTaskTableData;
    exportStoreUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportStoreUpdatePointsScheduledTaskTableDataToExcel;
    storeUpdatePointsScheduledTaskTableTotalRecords: number;
    
    manualUpdatePointsFromDate = new SoftFormControl<Date>(null, {updateOn: 'change'})
    manualUpdatePointsToDate = new SoftFormControl<Date>(null, {updateOn: 'change'})

    storeUpdatePointsDataFormGroup: SoftFormGroup<StoreUpdatePointsDataBody>;

    savedStoreUpdatePointsScheduledTaskIsPaused: boolean = null;

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
        this.initializeStoreUpdatePointsScheduledTaskTableCols();

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if (this.modelId > 0) {
                forkJoin({
                    store: this.apiService.getStore(this.modelId),
                })
                .subscribe(({ store }) => {
                    this.savedStoreUpdatePointsScheduledTaskIsPaused = store.updatePointsScheduledTaskIsPaused;
                    this.storeFormGroup = this.initFormGroup(new Store(store), this.storeSaveBodyName);

                    this.initStoreUpdatePointsDataFormGroup(store);
                });
            }else{
                this.storeFormGroup = this.initFormGroup(new Store({id: 0}), this.storeSaveBodyName);
            }
        });
    }
    
    initializeStoreUpdatePointsScheduledTaskTableCols(){
        this.storeUpdatePointsScheduledTaskTableCols = [
            {name: this.translocoService.translate('TransactionsFrom'), filterType: 'date', field: 'transactionsFrom', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('TransactionsTo'), filterType: 'date', field: 'transactionsTo', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
            {name: this.translocoService.translate('IsManuallyStarted'), filterType: 'boolean', field: 'isManual'},
        ]
    }

    initStoreUpdatePointsDataFormGroup(store: Store){
        this.storeUpdatePointsDataFormGroup = this.createFormGroup(new StoreUpdatePointsDataBody({storeId: this.modelId, updatePointsStartDate: store.updatePointsStartDate, updatePointsInterval: store.updatePointsInterval}))
    }
    
    onSaveStoreUpdatePointsData(){
        this.apiService.saveStoreUpdatePointsData(this.storeUpdatePointsDataFormGroup.getRawValue()).subscribe((version) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulSaveToastDescription'));

            this.storeFormGroup.controls.updatePointsInterval.setValue(this.storeUpdatePointsDataFormGroup.controls.updatePointsInterval.getRawValue());
            this.storeFormGroup.controls.updatePointsStartDate.setValue(this.storeUpdatePointsDataFormGroup.controls.updatePointsStartDate.getRawValue());
            this.storeFormGroup.controls.version.setValue(version);
        });
    }
    
    scheduleJobManually(){
        const updatePointsDTO: UpdatePoints = {
            storeId: this.modelId, 
            storeVersion: this.storeFormGroup.getRawValue().version, 
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
        let saveBody: StoreSaveBody = new StoreSaveBody();
        
        saveBody.storeDTO = this.storeFormGroup.getRawValue();
        
        this.saveBody = saveBody;
    }

    override onAfterSave(): void {
        this.savedStoreUpdatePointsScheduledTaskIsPaused = this.storeFormGroup.controls.updatePointsScheduledTaskIsPaused.getRawValue();
    }
}
