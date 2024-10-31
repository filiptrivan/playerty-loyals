import { PartnerService } from './../../../../business/services/helper/partner.service';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-user-list', 
    templateUrl: './partner-user-list.component.html',
    styles: []
})
export class PartnerUserListComponent implements OnInit {
    cols: Column[];
    controllerName: string = 'PartnerUser';
    objectNameForTheRequest: string = 'PartnerUser';

    constructor(
        private partnerService: PartnerService,
        private translocoService: TranslocoService
    ) { }

    async ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                // {name: this.translocoService.translate('Delete'), field: 'Delete'}, // TODO FT: Think about this, how to implement.
            ]},
            {name: this.translocoService.translate('User'), filterType: 'text', field: 'userDisplayName'},
            {name: this.translocoService.translate('Points'), filterType: 'numeric', field: 'points', showMatchModes: true},
            {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName', filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.partnerService.loadTierListForDropdown()) },
            {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated', dropdownOrMultiselectValues: await firstValueFrom(this.partnerService.loadSegmentationItemListForPartnerForDropdown()) },
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
    
}
