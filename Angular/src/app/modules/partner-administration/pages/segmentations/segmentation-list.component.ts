import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';

@Component({
    selector: 'segmentation-list',
    templateUrl: './segmentation-list.component.html',
    styles: []
})
export class SegmentationListComponent implements OnInit {
    cols: Column[];
    controllerName: string = 'Segmentation';
    objectNameForTheRequest: string = 'Segmentation';

    constructor(
        private translocoService: TranslocoService
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('PointsForTheFirstTimeFill'), filterType: 'numeric', field: 'pointsForTheFirstTimeFill', showMatchModes: true},
        ]
    }
}
