import { SoftFormArray, SoftFormGroup } from './../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Segmentation, SegmentationItem, SegmentationSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { LastMenuIconIndexClicked } from 'src/app/core/entities/last-menu-icon-index-clicked';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'segmentation-details',
    templateUrl: './segmentation-details.component.html',
    styles: [],
})
export class SegmentationDetailsComponent extends BaseFormCopy implements OnInit {
    override saveObservableMethod = this.apiService.saveSegmentation;
    segmentationFormGroup: SoftFormGroup<Segmentation>;
    segmentationSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationDTO');

    segmentationItemModel: SegmentationItem = new SegmentationItem();
    segmentationItemsSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationItemsDTO');
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemsFormArray: SoftFormArray<SegmentationItem[]>;
    segmentationItemLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();
    segmentationItemsCrudMenu: MenuItem[] = [];

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if (this.modelId > 0) {
                forkJoin({
                    segmentation: this.apiService.getSegmentation(this.modelId),
                    segmentationItems: this.apiService.getSegmentationItemsForTheSegmentation(this.modelId),
                })
                .subscribe(({ segmentation, segmentationItems }) => {
                    this.initSegmentationItemsFormArray(segmentationItems);

                    this.segmentationFormGroup = this.initFormGroup(new Segmentation(segmentation), this.segmentationSaveBodyName);
                });
            }else{
                this.initSegmentationItemsFormArray([]);
                
                this.segmentationFormGroup = this.initFormGroup(new Segmentation({id: 0}), this.segmentationSaveBodyName);
            }
        });
    }

    initSegmentationItemsFormArray(segmentationItems: SegmentationItem[]){
        this.segmentationItemsFormArray = this.initFormArray(segmentationItems, this.segmentationItemModel, this.segmentationItemsSaveBodyName, this.segmentationItemsTranslationKey, true);
        this.segmentationItemsCrudMenu = this.getCrudMenuForOrderedData(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), this.segmentationItemLastIndexClicked);
        this.segmentationItemsFormArray.validator = this.validatorService.isFormArrayEmpty(this.segmentationItemsFormArray);
    }

    addNewSegmentationItem(index: number){
        this.addNewFormControlToTheFormArray(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), index);
    }

    getSegmentationItemFormArrayControlByIndex(index: number){
        return this.getFormArrayControlByIndex<SegmentationItem>('name', this.segmentationItemsSaveBodyName, index);
    }

    override onBeforeSave(): void {
        let saveBody: SegmentationSaveBody = new SegmentationSaveBody();

        saveBody.segmentationDTO = this.segmentationFormGroup.getRawValue();

        saveBody.segmentationItemsDTO = this.segmentationItemsFormArray.getRawValue();

        this.saveBody = saveBody;
    }
}
