import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column } from '@playerty/spider';
import { Partner } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'partner-list',
    templateUrl: './partner-list.component.html',
    styles: []
})
export class PartnerListComponent implements OnInit {
    cols: Column<Partner>[];
    
    getPartnerTableDataObservableMethod = this.apiService.getPartnerTableData;
    exportPartnerTableDataToExcelObservableMethod = this.apiService.exportPartnerTableDataToExcel;
    deletePartnerObservableMethod = this.apiService.deletePartner;

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
            {name: this.translocoService.translate('Slug'), filterType: 'text', field: 'slug'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
