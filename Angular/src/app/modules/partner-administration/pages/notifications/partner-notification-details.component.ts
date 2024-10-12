import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { TableLazyLoadEvent } from 'primeng/table';
import { firstValueFrom, forkJoin, map, Observable, tap } from 'rxjs';
import { PartnerNotification, PartnerNotificationSaveBody, PartnerUser } from 'src/app/business/entities/generated/business-entities.generated';
import { TableFilter } from 'src/app/business/entities/table-filter';
import { ApiService } from 'src/app/business/services/api/api.service';
import { isArrayEmpty } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { Column, SelectedRowsMethodResult } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseForm<PartnerNotification> implements OnInit {
    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    text: string;

    tableTitle: string = $localize`:@@Recipients:Recipients`
    cols: Column[];
    tableControllerName: string = 'PartnerUser';
    objectName: string = 'PartnerUser';
    
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
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route);
        }
         
    override ngOnInit() {
        // this.selectedPartnerUsersForAppNotification.validator = isArrayEmpty(this.selectedPartnerUsersForAppNotification);
        // this.selectedPartnerUsersForEmailNotification.validator = isArrayEmpty(this.selectedPartnerUsersForEmailNotification);
        this.populatePartnerUserTableCols();
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    partnerNotification: this.apiService.getPartnerNotification(this.modelId),
                    // partnerUsers: this.apiService.loadPartnerUserNamebookListForPartnerNotification(this.modelId),
                    // partnerUsers: this.apiService.loadPartnerUserListForPartnerNotificationForTable(this.modelId),
                  }).subscribe(({ partnerNotification }) => {
                    this.init(new PartnerNotification(partnerNotification));
                    // this.selectedPartnerUsersForAppNotification.setValue(
                    //     partnerUsers.map(partnerUser => ({ label: partnerUser.displayName, value: partnerUser.id }))
                    // );
                    // this.selectedPartnerUsersForEmailNotification.setValue(
                    //     partnerUsers.map(partnerUser => ({ label: partnerUser.displayName, value: partnerUser.id }))
                    // );
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
        this.apiService.sendNotificationEmail(this.modelId, this.model.version).subscribe(() => {
            this.messageService.successMessage($localize`:@@SuccessfulEmailAttempt:Your email attempt has been processed.`);
        });
    }

    async populatePartnerUserTableCols(){
        this.cols = [
            {name: 'User', filterType: 'text', field: 'userDisplayName'},
            {name: 'Points', filterType: 'numeric', field: 'points', showMatchModes: true},
            {name: 'Tier', filterType: 'multiselect', field: 'tierDisplayName', filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.loadTierListForDropdown()) },
            {name: 'Segmentation', filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated', dropdownOrMultiselectValues: await firstValueFrom(this.loadSegmentationItemListForPartnerForDropdown()) },
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }

    loadTierListForDropdown(): Observable<PrimengOption[]>{
        return this.apiService.loadTierListForDropdown().pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.id }));
            })
        );
    }

    loadSegmentationItemListForPartnerForDropdown(): Observable<PrimengOption[]>{
        return this.apiService.loadSegmentationItemListForDropdown().pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.id }));
            })
        );
    }

    // FT: Using arrow function solved the problem with undefined this.modelId
    selectedPartnerUserLazyLoad = (event: TableFilter): Observable<SelectedRowsMethodResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;
        
        return this.apiService.loadListForTable('PartnerNotification', 'PartnerUserForPartnerNotification', tableFilter).pipe(
            map(res => {
                let result = new SelectedRowsMethodResult();
                result.fakeSelectedItems = res.data.map(x => x.id);
                result.selectedTotalRecords = res.totalRecords;
                return result;
            })
        );
    }

    isAllSelectedChange(event: boolean){
        this.isAllSelected = event;
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
