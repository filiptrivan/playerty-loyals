import { SoftFormArray, SoftFormControl } from './../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { Segmentation, SegmentationItem, SegmentationSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { isArrayEmpty, isFormArrayEmpty } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'segmentation-details',
    templateUrl: './segmentation-details.component.html',
    styles: [],
})
export class SegmentationDetailsComponent extends BaseFormCopy implements OnInit {
    segmentationItems: SegmentationItem[];
    segmentationItemModel: SegmentationItem = new SegmentationItem();
    segmentationItemsFormArray: SoftFormArray;
    
    segmentation: Segmentation;
    segmentationModel: SegmentationItem = new SegmentationItem();

    crudMenu: MenuItem[] = [];

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route);
    }
         
    override ngOnInit() {
        this.controllerName = 'Segmentation';
        this.saveMethodName = 'SaveSegmentation';
        this.detailsTitle = $localize`:@@Segmentation:Segmentation`

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if (this.modelId > 0) {
                forkJoin({
                    segmentation: this.apiService.getSegmentation(this.modelId),
                    segmentationItems: this.apiService.getSegmentationItemsForTheSegmentation(this.modelId),
                })
                .subscribe(({ segmentation, segmentationItems }) => {
                    this.segmentationItems = segmentationItems;
                    this.initSegmentationItemsFormArray();

                    this.segmentation = new Segmentation(segmentation);
                });
            }else{
                this.segmentationItems = [];
                this.initSegmentationItemsFormArray();

                this.segmentation = new Segmentation({id: 0});
            }
        });
    }

    initSegmentationItemsFormArray(){
        this.segmentationItemsFormArray = this.initFormArray(this.segmentationItems, this.segmentationItemModel, true);
        this.crudMenu = this.getCrudMenuForOrderedData(this.segmentationItemsFormArray, new SegmentationItem({id: 0}));
        this.segmentationItemsFormArray.validator = isFormArrayEmpty(this.segmentationItemsFormArray);
    }

    addNewSegmentationItem(index: number){
        this.addNewFormControlToTheFormArray(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), index);
    }

    override onBeforeSave(): void {
        let saveBody: SegmentationSaveBody = new SegmentationSaveBody();

        saveBody.segmentationDTO = this.segmentation;

        saveBody.segmentationItemsDTO = this.segmentationItemsFormArray.value;

        this.saveBody = saveBody;
    }
}
