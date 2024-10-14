import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, KeyValueDiffers, LOCALE_ID, Output } from '@angular/core';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { SoftPanelsModule } from "../soft-panels/soft-panels.module";
import { BaseForm } from '../base-form/base-form';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helper/partner.service';
import { SoftMessageService } from '../../services/soft-message.service';
import { SoftControlsModule } from '../../controls/soft-controls.module';
import { Column, SelectedRowsMethodResult, SoftDataTableComponent } from '../soft-data-table/soft-data-table.component';
import { CardSkeletonComponent } from '../card-skeleton/card-skeleton.component';
import { Observable } from 'rxjs';
import { TableFilter } from 'src/app/business/entities/table-filter';
import { SoftFormControl } from '../soft-form-control/soft-form-control';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'base-notification',
    templateUrl: './base-notification.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftPanelsModule,
    SoftControlsModule,
    SoftDataTableComponent,
    CardSkeletonComponent,
]
})
export class BaseNotificationComponent<T> extends BaseForm<T> {
    @Input() override formGroup: FormGroup;
    @Input() tableTitle: string;
    @Input() cols: Column[];
    @Input() tableControllerName: string;
    @Input() tableObjectName: string;
    @Input() newlySelectedObjectList: number[];
    @Input() unselectedObjectList: number[];
    @Input() onLazyLoad: (tableFilter: TableFilter) => void;
    @Input() selectedObjectLazyLoad: (tableFilter: TableFilter) => Observable<SelectedRowsMethodResult>;
    @Input() isAllSelectedChange: (boolean: boolean) => void;
    @Input() isMarkedAsRead: SoftFormControl;
    @Input() sendEmailNotification: () => void;


    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute,
        private apiService: ApiService,
        private partnerService: PartnerService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route);
    }

    override ngOnInit(){
    }

}