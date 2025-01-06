import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-notification-list',
    templateUrl: './partner-notification-list.component.html',
    styles: []
})
export class PartnerNotificationListComponent implements OnInit {
    cols: Column[];
    
    getPartnerNotificationTableDataObservableMethod = this.apiService.getPartnerNotificationTableData;
    exportPartnerNotificationTableDataToExcelObservableMethod = this.apiService.exportPartnerNotificationTableDataToExcel;
    deletePartnerNotificationObservableMethod = this.apiService.deletePartnerNotification;

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
