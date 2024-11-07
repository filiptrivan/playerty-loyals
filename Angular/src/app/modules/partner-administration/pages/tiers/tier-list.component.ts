import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { DiscountCategory, StoreTier, Tier, TierSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormArray } from 'src/app/core/components/soft-form-control/soft-form-control';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: [],
})
export class TierListComponent extends BaseFormCopy implements OnInit {
    tierModel: Tier = new Tier();
    tierDTOListSaveBodyName: string = nameof<TierSaveBody>('tierDTOList');
    tierTranslationKey: string = new Tier().typeName;
    tierFormArray: SoftFormArray<Tier[]>;
    tierCrudMenu: MenuItem[];

    storeTierModel: StoreTier = new StoreTier();
    storeTierDTOListSaveBodyName: string = nameof<TierSaveBody>('storeTierDTOList');
    storeTierTranslationKey: string = new StoreTier().typeName;
    storeTierFormArray: SoftFormArray<StoreTier[]>;
    storeTierCrudMenu: MenuItem[];

    cols: Column[];
    tableControllerName: string = 'Store';
    objectNameForTheRequest: string = 'DiscountCategory';
    selectedDiscountCategoryListForStore: DiscountCategory[] = [];
    selectedDiscountCategoryIdsForStore: number[] = [];

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
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
        }
         
    override ngOnInit() {
        this.controllerName = 'Tier';
        this.saveMethodName = 'SaveTierList';
        this.detailsTitle = this.translocoService.translate('TierList');

        this.cols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            tierList: this.apiService.loadTierDTOList(),
        }).subscribe(({ tierList }) => {
            this.initTierFormArray(tierList);
            this.apiService.loadStoreTierDTOListForTierList(tierList.map(x => x.id)).subscribe(storeTierList => {
                this.initStoreTierFormArray(storeTierList);
            });
        });
    }

    initTierFormArray(tierList: Tier[]){
        this.tierFormArray = this.initFormArray(tierList, this.tierModel, this.tierDTOListSaveBodyName, this.tierTranslationKey, true);
        this.tierCrudMenu = this.getCrudMenuForOrderedData(this.tierFormArray, new Tier({id: 0}));
        this.tierFormArray.validator = this.validatorService.isFormArrayEmpty(this.tierFormArray);
    }

    initStoreTierFormArray(storeTierList: StoreTier[]){
        this.storeTierFormArray = this.initFormArray(storeTierList, this.storeTierModel, this.storeTierDTOListSaveBodyName, this.storeTierTranslationKey);
        this.storeTierCrudMenu = this.getCrudMenuForOrderedData(this.storeTierFormArray, new StoreTier({id: 0}));
    }

    addNewTier(index: number){
        this.addNewFormControlToTheFormArray(this.tierFormArray, new Tier({id: 0}), index);
    }

    getTierFormArrayControlByIndex(formControlName: keyof Tier & string, index: number){
        return this.getFormArrayControlByIndex<Tier>(formControlName, this.tierDTOListSaveBodyName, index);
    }

    addNewStoreTier(index: number, tierId: number){
        this.addNewFormControlToTheFormArray(this.storeTierFormArray, new StoreTier({id: 0, tierId: tierId}), index);
    }

    getStoreTierFormArrayControlByIndex(formControlName: keyof StoreTier & string, index: number){
        return this.getFormArrayControlByIndex<StoreTier>(formControlName, this.storeTierDTOListSaveBodyName, index);
    }

    getStoreTierFormArrayGroups(tierId: number){
        let formGroups: FormGroup[] = this.getFormArrayGroups(this.storeTierFormArray);
        return formGroups.filter(x => x.controls['tierId'].value === tierId)
    }

    // override ngOnInit() {
    //     this.route.params.subscribe((params) => {
    //         this.modelId = params['id'];

    //         this.apiService.loadDiscountCategoryDTOListForCurrentPartner(this.modelId).subscribe(discountCategories => {
    //             this.initDiscountCategoriesFormArray(discountCategories);
    //         });

    //         if (this.modelId > 0) {
    //             forkJoin({
    //                 store: this.apiService.getStore(this.modelId),
    //             })
    //             .subscribe(({ store }) => {
    //                 this.storeFormGroup = this.initFormGroup(new Store(store), this.storeSaveBodyName);
    //             });
    //         }else{
    //             this.storeFormGroup = this.initFormGroup(new Store({id: 0}), this.storeSaveBodyName);
    //         }
    //     });
    // }

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

    // override onBeforeSave(): void {
    //     let saveBody: StoreSaveBody = new StoreSaveBody();

    //     saveBody.storeDTO = this.storeFormGroup.getRawValue();

    //     saveBody.selectedStoreDiscountCategoryDTOList = this.discountCategoryFormArray.value
    //         .filter(x => x.selectedForStore)
    //         .map(x => { return { discountCategoriesId: x.id, discount: x.discount }});

    //     this.saveBody = saveBody;
    // }
}
