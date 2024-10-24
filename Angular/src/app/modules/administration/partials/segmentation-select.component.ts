import { ChangeDetectorRef, Component, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { Segmentation, SegmentationItem } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { CardSkeletonComponent } from "../../../core/components/card-skeleton/card-skeleton.component";
import { SoftCheckboxComponent } from 'src/app/core/controls/soft-checkbox/soft-checkbox.component';
import { FormGroup } from '@angular/forms';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'segmentation-select',
    templateUrl: './segmentation-select.component.html',
    styles: [],
    standalone: true,
    imports: [
        CardSkeletonComponent,
        SoftCheckboxComponent,
    ]
})
// FT: Putting any because we are merging UserExtended and PartnerUser
export class SegmentationSelectComponent extends BaseFormCopy implements OnInit {
    @Input() segmentation: Segmentation;
    @Input() allSegmentationItems: SegmentationItem[]; // All, we need to filter, it's better then making multiple requests
    @Input() partnerUserId: number;
    @Input() override formGroup: FormGroup;
    @Input() segmentationItemsFormArrayIdentifier: string; // FT: Because we are not changing it, we are not using nameof
    @Input() checkedSegmentationItemIdsForThePartnerUser: number[]; // FT: Because we are not changing it, we are not using nameof
    
    segmentationItemsForTheCurrentSegmentation: SegmentationItemIndex[] = []; // for the current segmentation

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService,
    ) 
    {
        super(differs, http, messageService, changeDetectorRef, router, route);
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
