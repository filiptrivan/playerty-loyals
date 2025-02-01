import { ChangeDetectorRef, Component, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { Segmentation, SegmentationItem } from 'src/app/business/entities/business-entities.generated';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { CardSkeletonComponent, SpiderCheckboxComponent, BaseFormCopy, SpiderFormGroup, SpiderFormArray, SpiderMessageService, BaseFormService } from '@playerty/spider';

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
export class SegmentationSelectComponent extends BaseFormCopy implements OnInit {
    @Input() segmentation: Segmentation;
    @Input() allSegmentationItems: SegmentationItem[]; // All, we need to filter, it's better then making multiple requests
    @Input() partnerUserId: number;
    @Input() override formGroup: SpiderFormGroup;
    @Input() segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;
    @Input() checkedSegmentationItemIdsForThePartnerUser: number[]; // FT: Because we are not changing it, we are not using nameof
    
    segmentationItemsForTheCurrentSegmentation: SegmentationItemIndex[] = []; // for the current segmentation

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
    ) 
    {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        this.allSegmentationItems.forEach((segmentationItem, index) => {
            if (segmentationItem.segmentationId == this.segmentation.id) {
                this.segmentationItemsForTheCurrentSegmentation.push({...segmentationItem, index: index})
            }
        });
    }

}

class SegmentationItemIndex extends SegmentationItem {
    index: number;
}
