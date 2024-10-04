import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'segmentation-list',
    templateUrl: './segmentation-list.component.html',
    styles: []
})
export class SegmentationListComponent implements OnInit {
    tableTitle: string = $localize`:@@Segmentations:Segmentations`
    cols: Column[];
    controllerName: string = 'Segmentation';
    objectName: string = 'Segmentation';

    constructor(
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Name', filterType: 'text', field: 'name'},
            {name: 'Name latin', filterType: 'text', field: 'nameLatin'},
            {name: 'Description', filterType: 'text', field: 'description'},
            {name: 'Description latin', filterType: 'text', field: 'descriptionLatin'},
            {name: 'Points for the first time fill', filterType: 'numeric', field: 'pointsForFirstTimeFill', showMatchModes: true},
        ]
    }
}
