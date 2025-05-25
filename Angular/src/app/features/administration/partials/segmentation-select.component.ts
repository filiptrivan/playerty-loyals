import { Component, Input, OnInit } from '@angular/core';
import { Segmentation, SegmentationItem } from 'src/app/business/entities/business-entities.generated';
import { CardSkeletonComponent, SpiderlyCheckboxComponent, SpiderlyFormGroup, SpiderlyFormArray, BaseFormService, getControl } from 'spiderly';

@Component({
    selector: 'segmentation-select',
    templateUrl: './segmentation-select.component.html',
    styles: [],
    standalone: true,
    imports: [
        CardSkeletonComponent,
        SpiderlyCheckboxComponent,
    ]
})
// FT: Putting any because we are merging UserExtended and PartnerUser
export class SegmentationSelectComponent implements OnInit {
    @Input() segmentation: Segmentation;
    @Input() segmentationItemsFormArray: SpiderlyFormArray<SegmentationItem>;

    constructor(
        private baseFormService: BaseFormService,
    ) 
    {
    }
         
    ngOnInit() {
    }

    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getSegmentationItemFormArrayGroups(formArray: SpiderlyFormArray<SegmentationItem>): SpiderlyFormGroup<SegmentationItem>[]{
        return this.baseFormService.getFormArrayGroups<SegmentationItem>(formArray)
            .filter(x => x.getRawValue().segmentationId === this.segmentation.id);
    }

}
