import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: []
})
export class TierListComponent implements OnInit {
    tableTitle: string = $localize`:@@Tiers:Tiers`
    cols: Column[];
    controllerName: string = 'Tier';
    objectName: string = 'Tier';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Name', filterType: 'text', field: 'name'},
            {name: 'Discount [%]', filterType: 'numeric', field: 'discount'},
            {name: 'Valid from (points)', filterType: 'numeric', field: 'validFrom'},
            {name: 'Valid to (points)', filterType: 'numeric', field: 'validTo'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
