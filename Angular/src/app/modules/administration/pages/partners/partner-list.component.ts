import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-list',
    templateUrl: './partner-list.component.html',
    styles: []
})
export class PartnerListComponent implements OnInit {
    tableTitle: string = $localize`:@@Partners:Partners`
    cols: Column[];
    controllerName: string = 'Partner';
    objectName: string = 'Partner';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Name', filterType: 'text', field: 'name'},
            {name: 'Slug', filterType: 'text', field: 'slug'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
