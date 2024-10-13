import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'notification-list',
    templateUrl: './notification-list.component.html',
    styles: []
})
export class NotificationListComponent implements OnInit {
    tableTitle: string = $localize`:@@Notifications:Notifications`
    cols: Column[];
    controllerName: string = 'Auth';
    objectName: string = 'Notification';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Title', filterType: 'text', field: 'title'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
