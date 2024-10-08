import { ChangeDetectorRef, Component, EventEmitter, input, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { forkJoin, filter } from 'rxjs';
import { Segmentation, SegmentationItem } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { CardSkeletonComponent } from "../../../core/components/card-skeleton/card-skeleton.component";
import { SoftCheckboxComponent } from 'src/app/core/controls/soft-checkbox/soft-checkbox.component';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { FormArray, FormGroup } from '@angular/forms';
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
    @Input() partnerUserId: number;
    @Input() override formGroup: FormGroup;
    @Output() onIdsChange: EventEmitter<number[]> = new EventEmitter();
    segmentationItems: SegmentationItem[] = [];
    segmentationItemsFormArray: FormArray;
    segmentationItemModel: SegmentationItem = new SegmentationItem();

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
        forkJoin({
            checkedSegmentationItemIdsForThePartnerUser: this.apiService.getCheckedSegmentationItemIdsForThePartnerUser(this.partnerUserId),
            segmentationItems: this.apiService.getSegmentationItemsForTheSegmentation(this.segmentation.id),
        }).subscribe(({ checkedSegmentationItemIdsForThePartnerUser, segmentationItems }) => {
            segmentationItems.forEach(x => {
                x.checked = checkedSegmentationItemIdsForThePartnerUser.includes(x.id);
            });

            this.segmentationItemsFormArray = this.initFormArray(segmentationItems, this.segmentationItemModel);

            this.segmentationItemsFormArray.valueChanges.subscribe(value => {
                this.onIdsChange.next(value.filter(x => x.checked == true).map(x => x.id));
            });

            this.segmentationItems = segmentationItems;
        });
    }

}
