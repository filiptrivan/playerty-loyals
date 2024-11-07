import { SoftFormArray, SoftFormGroup } from '../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { DiscountCategory, Store, StoreSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'store-details',
    templateUrl: './store-details.component.html',
    styles: [],
})
export class StoreDetailsComponent extends BaseFormCopy implements OnInit {
    // discountCategoryModel: DiscountCategory = new DiscountCategory();
    // discountCategoriesSaveBodyName: string = nameof<StoreSaveBody>('selectedStoreDiscountCategoryDTOList');
    // discountCategoriesTranslationKey: string = new DiscountCategory().typeName;
    // discountCategoryFormArray: SoftFormArray<DiscountCategory[]>;

    cols: Column[];
    tableControllerName: string = 'Store';
    objectNameForTheRequest: string = 'DiscountCategory';
    selectedDiscountCategoryListForStore: DiscountCategory[] = [];
    selectedDiscountCategoryIdsForStore: number[] = [];

    storeFormGroup: SoftFormGroup<Store>;
    storeSaveBodyName: string = nameof<StoreSaveBody>('storeDTO');


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
        this.controllerName = 'Store';
        this.saveMethodName = 'SaveStore';
        this.detailsTitle = this.translocoService.translate('Store');

        this.cols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            // this.apiService.loadDiscountCategoryDTOListForCurrentPartner(this.modelId).subscribe(discountCategories => {
            //     this.initDiscountCategoriesFormArray(discountCategories);
            // });

            if (this.modelId > 0) {
                forkJoin({
                    store: this.apiService.getStore(this.modelId),
                })
                .subscribe(({ store }) => {
                    this.storeFormGroup = this.initFormGroup(new Store(store), this.storeSaveBodyName);
                });
            }else{
                this.storeFormGroup = this.initFormGroup(new Store({id: 0}), this.storeSaveBodyName);
            }
        });
    }

    // initDiscountCategoriesFormArray(discountCategories: DiscountCategory[]){
    //     this.discountCategoryFormArray = this.initFormArray(discountCategories, this.discountCategoryModel, this.discountCategoriesSaveBodyName, this.discountCategoriesTranslationKey, false, 
    //         this.discountDisableLambda
    //     );
        
    //     this.selectedDiscountCategoryIdsForStore = discountCategories.filter(x => x.selectedForStore).map(x => x.id);
    // }

    // discountDisableLambda = (formControlName: string, model: DiscountCategory): boolean => {
    //     if(formControlName === nameof<DiscountCategory>('discount') && model.selectedForStore !== true){
    //         return true;
    //     }

    //     return false;
    // }

    // rowSelect(index: number){
    //     const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, index);
    //     formControl.enable();
    // }

    // rowUnselect(index: number){
    //     const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, index);
    //     formControl.disable();
    // }

    override onBeforeSave(): void {
        let saveBody: StoreSaveBody = new StoreSaveBody();

        saveBody.storeDTO = this.storeFormGroup.getRawValue();

        // saveBody.selectedStoreDiscountCategoryDTOList = this.discountCategoryFormArray.value
        //     .filter(x => x.selectedForStore)
        //     .map(x => { return { discountCategoriesId: x.id, discount: x.discount }});

        this.saveBody = saveBody;
    }
}
