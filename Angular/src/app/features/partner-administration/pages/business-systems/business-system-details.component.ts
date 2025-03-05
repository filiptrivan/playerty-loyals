import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BusinessSystem, ExcelUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, SpiderFormGroup, Column, SpiderMessageService, BaseFormService, IsAuthorizedForSaveEvent, SpiderDataTableComponent } from '@playerty/spider';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'business-system-details',
    templateUrl: './business-system-details.component.html',
    styles: [],
})
export class BusinessSystemDetailsComponent extends BaseFormCopy implements OnInit {
    businessSystemFormGroup = new SpiderFormGroup<BusinessSystem>({});
    
    @ViewChild('updatePointsTaskTable') updatePointsTaskTable: SpiderDataTableComponent; // FT: Made for refreshing table
    businessSystemUpdatePointsScheduledTaskTableCols: Column[];
    getBusinessSystemUpdatePointsScheduledTaskTableDataObservableMethod = this.apiService.getBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem;
    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem;
    businessSystemUpdatePointsScheduledTaskTableTotalRecords: number;
    
    excelUpdatePointsFormGroup = new SpiderFormGroup<ExcelUpdatePoints>({});
    
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
        private confirmationService: ConfirmationService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        this.initBusinessSystemUpdatePointsScheduledTaskTableCols();
    }

    notifyUsers = (taskForNotificationId: number) => {
        this.confirmationService.confirm({
            accept: () => {
                this.apiService.sendUpdatePointsNotificationToUsers(taskForNotificationId).subscribe(() => {
                    this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
                });
            }
        });
    }

    revert = (taskForRevertId: number) => {
        this.confirmationService.confirm({
            message: 'Ako prihvatite, obrisaćete sve transakcije i vratiti bodove korisnicima do odabranog stanja.',
            accept: () => {
                this.apiService.revertToTaskState(taskForRevertId).subscribe(() => {
                    this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
                    this.updatePointsTaskTable.reload();
                });
            }
        });
    }

    initBusinessSystemUpdatePointsScheduledTaskTableCols(){
        this.businessSystemUpdatePointsScheduledTaskTableCols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('NotifyUsers'), field: 'NotifyUsers', icon: 'pi pi-send', onClick: this.notifyUsers},
                {name: this.translocoService.translate('Revert'), field: 'Revert', icon: 'pi pi-undo', style: 'text-red-500', onClick: this.revert},
            ]},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
        ]
    }
    
    businessSystemFormGroupInitFinish(){
        this.initExcelUpdatePointsFormGroup();
    }

    initExcelUpdatePointsFormGroup = () => {
        this.createFormGroup(this.excelUpdatePointsFormGroup, new ExcelUpdatePoints({}));
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;
    }

    override onAfterSave = (): void => {
    }
}

