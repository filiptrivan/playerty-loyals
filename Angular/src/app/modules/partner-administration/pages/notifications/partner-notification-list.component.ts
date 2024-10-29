import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'partner-notification-list',
    templateUrl: './partner-notification-list.component.html',
    styles: []
})
export class PartnerNotificationListComponent implements OnInit {
    tableTitle: string = $localize`:@@Notifications:Notifications`
    cols: Column[];
    controllerName: string = 'PartnerNotification';
    objectName: string = 'PartnerNotification';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:$localize`:@@Details:Details`, field: 'Details'},
                {name:$localize`:@@Delete:Delete`, field: 'Delete'},
            ]},
            {name: 'Title', filterType: 'text', field: 'title'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
