import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { forkJoin, filter } from 'rxjs';
import { DiscountCategory, StoreTier, Tier, TierSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { Column } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormArray, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: [],
})
export class TierListComponent extends BaseFormCopy implements OnInit {
    // Tier
    tierModel: Tier = new Tier();
    tierDTOListSaveBodyName: string = nameof<TierSaveBody>('tierDTOList');
    tierTranslationKey: string = new Tier().typeName;
    tierFormArray: SoftFormArray<Tier[]>;
    tierCrudMenu: MenuItem[];

    // StoreTier
    storeTierModel: StoreTier = new StoreTier();
    storeTierDTOListSaveBodyName: string = nameof<TierSaveBody>('storeTierDTOList');
    storeTierTranslationKey: string = new StoreTier().typeName;
    storeTierFormArray: SoftFormArray<StoreTier[]>;
    storeTierCrudMenu: MenuItem[];
    
    // DiscountCategories M2M
    discountCategoryCols: Column[];
    discountCategoryModel: DiscountCategory = new DiscountCategory();
    discountCategoriesSaveBodyName: string = nameof<TierSaveBody>('selectedDiscountCategoryDTOList');
    discountCategoriesTranslationKey: string = new DiscountCategory().typeName;
    discountCategoryFormArray: SoftFormArray<DiscountCategory[]>;
    alreadySelectedDiscountCategoryListForStore: DiscountCategory[] = [];
    alreadySelectedDiscountCategoryIdsForStore: number[] = [];

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

        this.discountCategoryCols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            tierList: this.apiService.loadTierDTOList(),
        }).subscribe(({ tierList }) => {
            this.initTierFormArray(tierList);
            this.apiService.loadStoreTierDTOListForTierList(tierList.map(x => x.id)).subscribe(storeTierList => {
                this.initStoreTierFormArray(storeTierList);

                this.apiService.loadDiscountCategoryDTOListForCurrentPartner(storeTierList.map(x => x.id)).subscribe(discountCategories => {
                    this.initDiscountCategoriesFormArray(discountCategories);
                });
            });
        });
    }

    //#region Tier

    initTierFormArray(tierList: Tier[]){
        this.tierFormArray = this.initFormArray(tierList, this.tierModel, this.tierDTOListSaveBodyName, this.tierTranslationKey, true);
        this.tierCrudMenu = this.getCrudMenuForOrderedData(this.tierFormArray, new Tier({id: 0}));
        this.tierFormArray.validator = this.validatorService.isFormArrayEmpty(this.tierFormArray);
    }

    addNewTier(index: number){
        this.addNewFormControlToTheFormArray(this.tierFormArray, new Tier({id: 0}), index);
    }

    getTierFormArrayControlByIndex(formControlName: keyof Tier & string, index: number){
        return this.getFormArrayControlByIndex<Tier>(formControlName, this.tierDTOListSaveBodyName, index);
    }

    //#endregion

    //#region StoreTier

    initStoreTierFormArray(storeTierList: StoreTier[]){
        this.storeTierFormArray = this.initFormArray(storeTierList, this.storeTierModel, this.storeTierDTOListSaveBodyName, this.storeTierTranslationKey);
        this.storeTierCrudMenu = this.getCrudMenuForOrderedData(this.storeTierFormArray, new StoreTier({id: 0}));
    }

    addNewStoreTier(index: number, tierIndex: number){
        let tierId = this.getTierFormArrayControlByIndex('id', tierIndex).getRawValue();
        tierId = tierId === 0 ? tierIndex : tierId; // FT: Doing this because if we add new Tier and StoreTier, the tierId will be 0

        // FT: For the Tier we are not assigning index because we are sending the ordered list from the UI and we will get the index in foreach on the backend, but here we need orderNumber so we can filter 
        this.addNewFormControlToTheFormArray(this.storeTierFormArray, new StoreTier({id: 0, tierId: 0, tierClientIndex: tierIndex}), index);

        this.discountCategoryFormArray.value.filter(x => x.storeTierId === 0).forEach(discountCategory => {
            let newDiscountCategory: DiscountCategory = new DiscountCategory(discountCategory);
            newDiscountCategory.storeTierId = 0;
            newDiscountCategory.storeTierClientIndex = index;
            newDiscountCategory.tierClientIndex = tierIndex;

            this.addNewFormControlToTheFormArray(this.discountCategoryFormArray, newDiscountCategory, null)
        });
    }

    getStoreTierFormArrayControl(formControlName: keyof StoreTier & string, index: number, tierIndex: number){
        return this.getFormArrayControlByIndex<StoreTier>(formControlName, this.storeTierDTOListSaveBodyName, index, 
            (formGroups: SoftFormGroup<StoreTier>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls['tierIndex'].value === tierIndex);
            });
    }

    getStoreTierFormArrayGroups(tierIndex: number){
        let tierId = this.getTierFormArrayControlByIndex('id', tierIndex).getRawValue();
        tierId = tierId === 0 ? tierIndex : tierId;

        let formGroups: FormGroup[] = this.getFormArrayGroups(this.storeTierFormArray);
        return formGroups.filter(x => x.controls['tierId'].value === tierId)
    }

    //#endregion

    //#region DiscountCategory M2M

    initDiscountCategoriesFormArray(discountCategories: DiscountCategory[]){
        this.discountCategoryFormArray = this.initFormArray(discountCategories, this.discountCategoryModel, this.discountCategoriesSaveBodyName, this.discountCategoriesTranslationKey, false, 
            this.discountDisableLambda
        );
        
        this.alreadySelectedDiscountCategoryIdsForStore = discountCategories.filter(x => x.selectedForStore).map(x => x.id);
    }

    discountDisableLambda = (formControlName: string, model: DiscountCategory): boolean => {
        if(formControlName === nameof<DiscountCategory>('discount') && model.selectedForStore !== true){
            return true;
        }

        return false;
    }

    getDiscountCategoryFormArrayItems(storeTierIndex: number, tierIndex: number){
        return this.discountCategoryFormArray.value.filter(x => x.storeTierClientIndex === storeTierIndex && x.tierClientIndex === tierIndex);
    }

    rowSelect(index: number){
        const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, index);
        formControl.enable();
    }

    rowUnselect(index: number){
        const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, index);
        formControl.disable();
    }

    //#endregion

    // override onBeforeSave(): void {
    //     let saveBody: StoreSaveBody = new StoreSaveBody();

    //     saveBody.storeDTO = this.storeFormGroup.getRawValue();

    //     saveBody.selectedStoreDiscountCategoryDTOList = this.discountCategoryFormArray.value
    //         .filter(x => x.selectedForStore)
    //         .map(x => { return { discountCategoriesId: x.id, discount: x.discount }});

    //     this.saveBody = saveBody;
    // }
}
