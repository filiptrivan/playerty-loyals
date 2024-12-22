import { PartnerService } from './../../../../business/services/helper/partner.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { PartnerNotification, PartnerNotificationSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { AllClickEvent, Column, SelectedRowsMethodResult } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseForm<PartnerNotification> implements OnInit {
    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    text: string;

    partnerUserTableCols: Column[];
    loadPartnerUserTableDataObservableMethod = this.apiService.loadPartnerUserTableData;
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
        private apiService: ApiService,
        private partnerService: PartnerService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.populatePartnerUserTableCols();
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    partnerNotification: this.apiService.getPartnerNotification(this.modelId),
                  }).subscribe(({ partnerNotification }) => {
                    this.init(new PartnerNotification(partnerNotification));
                  });
            }
            else{
                this.init(new PartnerNotification({id:0}));
            }
        });
    }

    init(model: PartnerNotification){
        this.initFormGroup(model);
    }

    sendEmailNotification(){
        this.apiService.sendPartnerNotificationEmail(this.modelId, this.model.version).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));
        });
    }

    async populatePartnerUserTableCols(){
        this.partnerUserTableCols = [
            {name: this.translocoService.translate('User'), filterType: 'text', field: 'userDisplayName'},
            {name: this.translocoService.translate('Points'), filterType: 'numeric', field: 'points', showMatchModes: true},
            {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName', filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.apiService.loadPrimengListForDropdown(this.apiService.loadTierListForDropdown)) },
            {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated', dropdownOrMultiselectValues: await firstValueFrom(this.apiService.loadPrimengListForDropdown(this.apiService.loadSegmentationItemListForDropdown)) },
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }

    // FT: Using arrow function solved the problem with undefined this.modelId
    selectedPartnerUserLazyLoad = (event: TableFilter): Observable<SelectedRowsMethodResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;
        
        return this.apiService.loadPartnerUserForPartnerNotificationTableData(tableFilter).pipe(
            map(res => {
                let result = new SelectedRowsMethodResult();
                result.fakeSelectedItems = res.data.map(x => x.id);
                result.selectedTotalRecords = res.totalRecords;
                return result;
            })
        );
    }

    isAllSelectedChange(event: AllClickEvent){
        this.isAllSelected = event.checked;
    }

    onLazyLoad(event: TableFilter){
        this.lastLazyLoadTableFilter = event;
    }
    
    override onBeforeSave(): void {
        let saveBody: PartnerNotificationSaveBody = new PartnerNotificationSaveBody();

        saveBody.selectedIds = this.newlySelectedPartnerUserList;
        saveBody.unselectedIds = this.unselectedPartnerUserList;
        saveBody.isAllSelected = this.isAllSelected;
        saveBody.tableFilter = this.lastLazyLoadTableFilter;

        saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
        saveBody.partnerNotificationDTO = this.model;
        this.saveBody = saveBody;
    }
}
