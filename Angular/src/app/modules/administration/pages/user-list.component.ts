import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    tableTitle: string = $localize`:@@Users:Users`
    cols: Column[];
    controllerName: string = 'Auth';
    objectName: string = 'User';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            // {name: 'Test', filterType: 'numeric', field: 'testColumnForGrid'},
            {name: 'Email', filterType: 'text', field: 'email'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
            // {name: 'Modified at', filterType: 'date', field: 'modifiedAt', showMatchModes: true},
            {name: 'Disabled', filterType: 'boolean', field: 'isDisabled'},
            // {name: 'Version', filterType: 'text', field: 'version'},
        ]
    }
}
