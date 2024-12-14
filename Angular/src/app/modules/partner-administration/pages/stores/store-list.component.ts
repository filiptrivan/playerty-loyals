import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Store } from 'src/app/business/entities/generated/business-entities.generated';
import { TableColsService } from 'src/app/business/components/base-components/table-cols.generated';

@Component({
    selector: 'store-list',
    templateUrl: './store-list.component.html',
    styles: []
})
export class StoreTableComponent implements OnInit {
    cols: Column<Store>[];
    
    loadStoreTableDataObservableMethod = this.apiService.loadStoreTableData;
    exportStoreTableDataToExcelObservableMethod = this.apiService.exportStoreTableDataToExcel;
    deleteStoreObservableMethod = this.apiService.deleteStore;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
        private tableColsService: TableColsService
    ) { 
    }

    ngOnInit(){
        this.cols = this.tableColsService.storeTableCols;
        // SoftGlobal.pushAction(this.cols, new Action({ name: 'Obrisi', field: 'Test', icon: 'pi pi-user' }));
        // SoftGlobal.deleteAction(this.cols, 'Test');
    }
}
