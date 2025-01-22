import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/spider-data-table/spider-data-table.component';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BusinessSystem } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'business-system-list',
    templateUrl: './business-system-list.component.html',
    styles: []
})
export class BusinessSystemTableComponent implements OnInit {
    cols: Column<BusinessSystem>[];
    
    getBusinessSystemTableDataObservableMethod = this.apiService.getBusinessSystemTableData;
    exportBusinessSystemTableDataToExcelObservableMethod = this.apiService.exportBusinessSystemTableDataToExcel;
    deleteBusinessSystemObservableMethod = this.apiService.deleteBusinessSystem;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { 
    }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions: [
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ];
    }
}
