import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column } from '@playerty/spider';

@Component({
    selector: 'partner-role-table',
    templateUrl: './partner-role-table.component.html',
    styles: []
})
export class PartnerRoleTableComponent implements OnInit {
    cols: Column[];

    getPartnerRoleTableDataObservableMethod = this.apiService.getPartnerRoleTableData;
    exportPartnerRoleTableDataToExcelObservableMethod = this.apiService.exportPartnerRoleTableDataToExcel;
    deletePartnerRoleObservableMethod = this.apiService.deletePartnerRole;

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
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
