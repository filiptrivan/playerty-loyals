import { SoftFormControl } from './../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { Segmentation, SegmentationItem, SegmentationSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'segmentation-details',
    templateUrl: './segmentation-details.component.html',
    styles: [],
})
export class SegmentationDetailsComponent extends BaseForm<Segmentation> implements OnInit {
    segmentationItems: SegmentationItem[];
    crudMenu: MenuItem[] = this.getCrudMenuForOrderedData(new SegmentationItem({id: 0}));

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route);
        }
         
    override ngOnInit() {
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if (this.modelId > 0) {
                forkJoin({
                    segmentation: this.apiService.getSegmentation(this.modelId),
                    segmentationItems: this.apiService.getSegmentationItemsForTheSegmentation(this.modelId),
                }).subscribe(({ segmentation, segmentationItems }) => {
                    this.init(new Segmentation(segmentation));
                    this.initFormArray(segmentationItems, new SegmentationItem({id: 0}));
                });
            }else{
                this.init(new Segmentation({id: 0}));
                this.initFormArray(null, new SegmentationItem({id: 0}));
            }
        });
    }

    init(model: Segmentation){
        this.initFormGroup(model);
    }

    addNewSegmentationItem(index: number){
        this.addNewFormControlToTheFormArray(new SegmentationItem({id: 0}), index);
    }

    override onBeforeSave(): void {
        let saveBody: SegmentationSaveBody = new SegmentationSaveBody();
        saveBody.segmentationDTO = this.model;
        saveBody.segmentationItemsDTO = this.formArray.value;
        this.saveBody = saveBody;
    }
}
