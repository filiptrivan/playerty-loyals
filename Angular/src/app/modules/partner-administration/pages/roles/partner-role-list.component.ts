import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-role-list',
    templateUrl: './partner-role-list.component.html',
    styles: []
})
export class PartnerRoleListComponent implements OnInit {
    tableTitle: string = $localize`:@@Roles:Roles`
    cols: Column[];
    controllerName: string = 'PartnerRole';
    objectName: string = 'PartnerRole';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Name', filterType: 'text', field: 'name'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
