import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { ApiService } from 'src/app/business/services/api/api.service';

@Component({
    selector: 'store-list',
    templateUrl: './store-list.component.html',
    styles: []
})
export class StoreListComponent implements OnInit {
    cols: Column[];
    
    loadStoreTableDataObservableMethod = this.apiService.loadStoreTableData;
    exportStoreTableDataToExcelObservableMethod = this.apiService.exportStoreTableDataToExcel;
    deleteStoreObservableMethod = this.apiService.deleteStore;

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
