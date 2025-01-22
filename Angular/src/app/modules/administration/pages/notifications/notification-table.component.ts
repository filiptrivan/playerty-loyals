import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column } from 'src/app/core/components/spider-data-table/spider-data-table.component';

@Component({
    selector: 'notification-table',
    templateUrl: './notification-table.component.html',
    styles: []
})
export class NotificationTableComponent implements OnInit {
    cols: Column[];

    getNotificationTableDataObservableMethod = this.apiService.getNotificationTableData;
    exportNotificationTableDataToExcelObservableMethod = this.apiService.exportNotificationTableDataToExcel;
    deleteNotificationObservableMethod = this.apiService.deleteNotification;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Title'), filterType: 'text', field: 'title'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
    
}
