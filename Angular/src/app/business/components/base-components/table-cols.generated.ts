import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from "@angular/core";
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Injectable({
  providedIn: 'root',
})
export class TableColsService {
    constructor(
        private translocoService: TranslocoService,
    ) {
    
    }

    storeTableCols: Column[] = [
        {name: this.translocoService.translate('Actions'), actions: [
            {name: this.translocoService.translate('Details'), field: 'Details'},
            {name: this.translocoService.translate('Delete'), field: 'Delete'},
        ]},
        {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
        {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
    ];
}