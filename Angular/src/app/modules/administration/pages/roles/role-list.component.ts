import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column } from 'src/app/core/components/spider-data-table/spider-data-table.component';

@Component({
    selector: 'role-list',
    templateUrl: './role-list.component.html',
    styles: []
})
export class RoleListComponent implements OnInit {
    cols: Column[];

    getRoleTableDataObservableMethod = this.apiService.getRoleTableData;
    exportRoleTableDataToExcelObservableMethod = this.apiService.exportRoleTableDataToExcel;
    deleteRoleObservableMethod = this.apiService.deleteRole;

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
