import { Component, Input, OnInit } from '@angular/core';
import { Segmentation, SegmentationItem } from 'src/app/business/entities/business-entities.generated';
import { CardSkeletonComponent, SpiderCheckboxComponent, SpiderFormGroup, SpiderFormArray, BaseFormService, getControl } from '@playerty/spider';

@Component({
    selector: 'segmentation-select',
    templateUrl: './segmentation-select.component.html',
    styles: [],
    standalone: true,
    imports: [
        CardSkeletonComponent,
        SpiderCheckboxComponent,
    ]
})
// FT: Putting any because we are merging UserExtended and PartnerUser
export class SegmentationSelectComponent implements OnInit {
    @Input() segmentation: Segmentation;
    @Input() segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;

    constructor(
        private baseFormService: BaseFormService,
    ) 
    {
    }
         
    ngOnInit() {
    }

    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getSegmentationItemFormArrayGroups(formArray: SpiderFormArray<SegmentationItem>): SpiderFormGroup<SegmentationItem>[]{
        return this.baseFormService.getFormArrayGroups<SegmentationItem>(formArray)
            .filter(x => x.getRawValue().segmentationId === this.segmentation.id);
    }

}
