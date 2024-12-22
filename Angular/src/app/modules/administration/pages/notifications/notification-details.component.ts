import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, map, Observable } from 'rxjs';
import { Notification, NotificationSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { AllClickEvent, Column, SelectedRowsMethodResult } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'notification-details',
    templateUrl: './notification-details.component.html',
    styles: [],
})
export class NotificationDetailsComponent extends BaseForm<Notification> implements OnInit {
    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    text: string;

    userTableCols: Column[];
    loadUserTableDataObservableMethod = this.apiService.loadUserTableData;
    exportUserTableDataToExcelObservableMethod = this.apiService.exportUserTableDataToExcel;
    deleteUserObservableMethod = this.apiService.deleteUser;

    override controllerName: string = 'Auth';
    objectNameForTheRequest: string = 'User';
    
    newlySelectedUserList: number[] = [];
    unselectedUserList: number[] = [];
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
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.populateUserTableCols();
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    notification: this.apiService.getNotification(this.modelId),
                  }).subscribe(({ notification }) => {
                    this.init(new Notification(notification));
                  });
            }
            else{
                this.init(new Notification({id:0}));
            }
        });
    }

    init(model: Notification){
        this.initFormGroup(model);
    }

    sendEmailNotification(){
        this.apiService.sendNotificationEmail(this.modelId, this.model.version).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));
        });
    }

    populateUserTableCols(){
        this.userTableCols = [
            {name: this.translocoService.translate('User'), filterType: 'text', field: 'email'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }

    // FT: Using arrow function solved the problem with undefined this.modelId
    selectedUserLazyLoad = (event: TableFilter): Observable<SelectedRowsMethodResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;
        
        return this.apiService.loadUserForNotificationTableData(tableFilter).pipe(
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
        let saveBody = new NotificationSaveBody();
        saveBody.selectedIds = this.newlySelectedUserList;
        saveBody.unselectedIds = this.unselectedUserList;
        saveBody.isAllSelected = this.isAllSelected;
        saveBody.tableFilter = this.lastLazyLoadTableFilter;

        saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
        saveBody.notificationDTO = this.model;
        this.saveBody = saveBody;
    }
}
