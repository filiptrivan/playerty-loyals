import { PartnerService } from './../../../../business/services/helper/partner.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-user-list', 
    templateUrl: './partner-user-list.component.html',
    styles: []
})
export class PartnerUserListComponent implements OnInit {
    tableTitle: string = $localize`:@@Users:Users`
    cols: Column[];
    controllerName: string = 'PartnerUser';
    objectName: string = 'PartnerUser';

    constructor(
        private partnerService: PartnerService,
    ) { }

    async ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:$localize`:@@Details:Details`, field: 'Details'},
                // {name:$localize`:@@Delete:Delete`, field: 'Delete'}, // TODO FT: Think about this, how to implement.
            ]},
            {name: 'User', filterType: 'text', field: 'userDisplayName'},
            {name: 'Points', filterType: 'numeric', field: 'points', showMatchModes: true},
            {name: 'Tier', filterType: 'multiselect', field: 'tierDisplayName', filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.partnerService.loadTierListForDropdown()) },
            {name: 'Segmentation', filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated', dropdownOrMultiselectValues: await firstValueFrom(this.partnerService.loadSegmentationItemListForPartnerForDropdown()) },
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
    
}
