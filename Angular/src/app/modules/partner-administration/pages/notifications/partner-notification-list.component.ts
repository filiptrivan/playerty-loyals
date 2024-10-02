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
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Title', filterType: 'text', field: 'title'},
            {name: 'Title latin', filterType: 'text', field: 'titleLatin'},
            {name: 'Description', filterType: 'text', field: 'description'},
            {name: 'Description latin', filterType: 'text', field: 'descriptionLatin'},
            {name: 'Created at', filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}
