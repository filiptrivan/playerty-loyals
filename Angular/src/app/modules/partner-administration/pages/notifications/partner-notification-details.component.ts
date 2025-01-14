import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { AllClickEvent, Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { PartnerNotification, PartnerNotificationSaveBody, PartnerUser } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { nameof } from 'src/app/core/services/helper-functions';
import { LazyLoadSelectedIdsResult } from 'src/app/core/entities/lazy-load-selected-ids-result';
import { BaseFormService } from 'src/app/core/services/base-form.service';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseFormCopy implements OnInit {
    partnerNotificationFormGroup: SoftFormGroup<PartnerNotification>;

    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    partnerUserTableCols: Column<PartnerUser>[];
    getPartnerUserTableDataObservableMethod = this.apiService.getPartnerUserTableData;
    exportPartnerUserTableDataToExcelObservableMethod = this.apiService.exportPartnerUserTableDataToExcel;
    deletePartnerUserObservableMethod = this.apiService.deletePartnerUser;
    
    newlySelectedPartnerUserList: number[] = [];
    unselectedPartnerUserList: number[] = [];
    isAllSelected: boolean = null;
    lastLazyLoadTableFilter: TableFilter;

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
        this.formGroup.saveObservableMethod = this.apiService.savePartnerNotification;

        this.populatePartnerUserTableCols();
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    partnerNotification: this.apiService.getPartnerNotification(this.modelId),
                  }).subscribe(({ partnerNotification }) => {
                    this.initPartnerNotificationFormGroup(new PartnerNotification(partnerNotification));
                  });
            }
            else{
                this.initPartnerNotificationFormGroup(new PartnerNotification({id:0}));
            }
        });
    }

    initPartnerNotificationFormGroup(partnerNotification: PartnerNotification){
        this.partnerNotificationFormGroup = this.baseFormService.initFormGroup(this.formGroup, partnerNotification, nameof<PartnerNotificationSaveBody>('partnerNotificationDTO'));
    }

    sendEmailNotification(){
        this.apiService.sendPartnerNotificationEmail(this.modelId, this.partnerNotificationFormGroup.getRawValue().version).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));
        });
    }

    async populatePartnerUserTableCols(){
        this.partnerUserTableCols = [
            {name: this.translocoService.translate('User'), filterType: 'text', field: 'userDisplayName'},
            {name: this.translocoService.translate('Points'), filterType: 'numeric', field: 'points', showMatchModes: true},
            {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName', filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.apiService.getPrimengNamebookListForDropdown(this.apiService.getTierListForDropdown)) },
            {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated', dropdownOrMultiselectValues: await firstValueFrom(this.apiService.getPrimengNamebookListForDropdown(this.apiService.getSegmentationItemListForDropdown)) },
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }

    // FT: Using arrow function solved the problem with undefined this.modelId
    selectedPartnerUserLazyLoad = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;
        
        return this.apiService.lazyLoadSelectedPartnerUserIdsForPartnerNotification(tableFilter);
    }

    isAllSelectedChange(event: AllClickEvent){
        this.isAllSelected = event.checked;
    }

    onLazyLoad(event: TableFilter){
        this.lastLazyLoadTableFilter = event;
    }
    
    override onBeforeSave = (): void => {
        let saveBody: PartnerNotificationSaveBody = new PartnerNotificationSaveBody();

        saveBody.selectedIds = this.newlySelectedPartnerUserList;
        saveBody.unselectedIds = this.unselectedPartnerUserList;
        saveBody.isAllSelected = this.isAllSelected;
        saveBody.tableFilter = this.lastLazyLoadTableFilter;

        saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
        saveBody.partnerNotificationDTO = this.partnerNotificationFormGroup.getRawValue();

        this.saveBody = saveBody;
    }
}
