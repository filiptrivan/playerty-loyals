import { Component, OnInit } from '@angular/core';
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
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            // {name: 'Test', filterType: 'numeric', field: 'testColumnForGrid'},
            {name: 'UserDisplayName', filterType: 'text', field: 'userDisplayName'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
            // {name: 'Modified at', filterType: 'date', field: 'modifiedAt', showMatchModes: true},
            // {name: 'Disabled', filterType: 'boolean', field: 'isDisabled'},
            // {name: 'Version', filterType: 'text', field: 'version'},
        ]
    }
}
