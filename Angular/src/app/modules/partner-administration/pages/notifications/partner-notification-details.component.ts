import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { TableLazyLoadEvent } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { PartnerNotification, PartnerNotificationSaveBody, PartnerUser } from 'src/app/business/entities/generated/business-entities.generated';
import { TableFilter } from 'src/app/business/entities/table-filter';
import { ApiService } from 'src/app/business/services/api/api.service';
import { isArrayEmpty } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseForm<PartnerNotification> implements OnInit {
    partnerUserOptions: PrimengOption[];
    // selectedPartnerUsersForAppNotification = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})
    selectedPartnerUsersForAppNotification: PartnerUser[];
    unselectedPartnerUsersForAppNotification: PartnerUser[] = [];
    // selectedPartnerUsersForEmailNotification = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})
    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    text: string;

    tableTitle: string = $localize`:@@Users:Users`
    cols: Column[];
    tableControllerName: string = 'PartnerUser';
    objectName: string = 'PartnerUser';
    partnerUsersSelectedNumber: number = 0;

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

    searchPartnerUsers(event: AutoCompleteCompleteEvent){ 
        this.apiService.loadPartnerUserListForAutocomplete(50, event?.query).subscribe(nl => {
            this.partnerUserOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }

    sendEmailNotification(){

    }

    populatePartnerUserTableCols(){
        this.cols = [
            // {name: 'Actions', actions:[
            //     {name:"Select"},
            // ]},
            // {name: 'Test', filterType: 'numeric', field: 'testColumnForGrid'},
            {name: 'UserDisplayName', filterType: 'text', field: 'userDisplayName'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
            // {name: 'Modified at', filterType: 'date', field: 'modifiedAt', showMatchModes: true},
            // {name: 'Disabled', filterType: 'boolean', field: 'isDisabled'},
            // {name: 'Version', filterType: 'text', field: 'version'},
        ]
    }

    selectedPartnerUserLazyLoad(event: TableLazyLoadEvent){
        let tableFilter: TableFilter = event as unknown as TableFilter;
        tableFilter.additionalFilterIdLong = this.modelId;

        this.apiService.loadListForTable(this.tableControllerName, this.objectName, tableFilter).subscribe(res => {
            this.selectedPartnerUsersForAppNotification = res.data;
            this.partnerUsersSelectedNumber = res.totalRecords;
        });
    }

    override onBeforeSave(): void {
        let saveBody: PartnerNotificationSaveBody = new PartnerNotificationSaveBody();
        // saveBody.selectedPartnerUserIds = this.selectedPartnerUsersForAppNotification.value?.map(x => x.value);
        console.log(this.selectedPartnerUsersForAppNotification)
        saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
        saveBody.partnerNotificationDTO = this.model;
        this.saveBody = saveBody;
    }
}
