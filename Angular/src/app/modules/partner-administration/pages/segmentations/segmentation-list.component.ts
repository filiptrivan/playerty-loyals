import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Segmentation } from 'src/app/business/entities/generated/business-entities.generated';
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
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(){
        this.cols = [
            {name: 'Actions', actions:[
                {name:"Details"},
                {name:"Delete"},
            ]},
            {name: 'Name', filterType: 'text', field: 'name'},
            {name: 'Points for the first time fill', filterType: 'numeric', field: 'pointsForTheFirstTimeFill', showMatchModes: true},
        ]
    }
}
