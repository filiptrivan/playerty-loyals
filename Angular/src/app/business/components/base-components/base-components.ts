import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, Input, OnInit } from '@angular/core';
import { Column, SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Store, TableFilter } from 'src/app/business/entities/generated/business-entities.generated';
import { Observable } from 'rxjs';
import { TableResponse } from 'src/app/core/entities/table-response';

@Component({
    template: `
    `,
    standalone: true,
    imports: [],
    styles: []
})
export class StoreTableBaseComponent implements OnInit {
    cols: Column<Store>[];
    
    loadStoreTableDataObservableMethod = this.apiService.loadStoreTableData;
    exportStoreTableDataToExcelObservableMethod = this.apiService.exportStoreTableDataToExcel;
    deleteStoreObservableMethod = this.apiService.deleteStore;

    constructor(
        protected apiService: ApiService,
        protected translocoService: TranslocoService,
    ) { 
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions: [
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ];
    }

    ngOnInit(){
    }
}

@Component({
    selector: 'store-table-base',
    template: `
<ng-container *transloco="let t">
    <soft-data-table 
    [tableTitle]="t('StoreList')" 
    [cols]="cols" 
    [loadTableDataObservableMethod]="loadStoreTableDataObservableMethod" 
    [exportTableDataToExcelObservableMethod]="exportStoreTableDataToExcelObservableMethod"
    [deleteItemFromTableObservableMethod]="deleteStoreObservableMethod"
    >
    </soft-data-table>
</ng-container>
    `,
    standalone: true,
    imports: [
        SoftDataTableComponent,
        TranslocoDirective,
    ],
    styles: []
})
export class StoreTableHtmlBaseComponent implements OnInit {
    @Input() cols: Column<Store>[];
    
    @Input() loadStoreTableDataObservableMethod: (tableFilterDTO: TableFilter) => Observable<TableResponse>;
    @Input() exportStoreTableDataToExcelObservableMethod: (tableFilterDTO: TableFilter) => any;
    @Input() deleteStoreObservableMethod: (rowId: number) => any;

    constructor(
    ) { 
        
    }

    ngOnInit(){
    }
}