import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { forkJoin } from 'rxjs';
import { DiscountCategory, StoreTier, Tier, TierSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy, LastMenuIconIndexClicked } from 'src/app/core/components/base-form/base-form copy';
import { AllClickEvent, Column, RowClickEvent, SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormArray, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { BaseEntity } from 'src/app/core/entities/base-entity';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import 'zone.js';

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
    tierLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();

    // StoreTier
    storeTierModel: StoreTier = new StoreTier();
    storeTierDTOListSaveBodyName: string = nameof<TierSaveBody>('storeTierDTOList');
    storeTierTranslationKey: string = new StoreTier().typeName;
    storeTierFormArray: SoftFormArray<StoreTier[]>;
    storeTierCrudMenu: MenuItem[];
    storeOptions: PrimengOption[];
    storeTierLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();

    // DiscountCategories M2M
    discountCategoryCols: Column[];
    discountCategoryModel: DiscountCategory = new DiscountCategory();
    discountCategoriesSaveBodyName: string = nameof<TierSaveBody>('selectedDiscountCategoryDTOList');
    discountCategoriesTranslationKey: string = new DiscountCategory().typeName;
    discountCategoryFormArray: SoftFormArray<DiscountCategory[]>;
    discountCategoryLength: number;
    alreadySelectedDiscountCategoryListForStore: DiscountCategory[] = [];
    alreadySelectedDiscountCategoryIdsForStore: number[] = [];
    discountCategorySelectedList: {id: number, additionalIndexes: DiscountCategoryAdditionalIndexes}[] = [];
    @ViewChildren('discountCategoryTable') discountCategoryTables: QueryList<SoftDataTableComponent>; // FT: Made for refreshing table

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
        this.detailsTitle = this.translocoService.translate('TierList');

        this.discountCategoryCols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            // tierList: this.apiService.loadTierDTOList(),
            tierSaveBody: this.apiService.loadTierSaveBodyDTO(),
            storeNamebookList: this.apiService.loadStoreListForDropdown(),
        }).subscribe(({ tierSaveBody, storeNamebookList }) => {
            this.initTierFormArray(tierSaveBody.tierDTOList);
            // this.initTierFormArray(tierList);
            // this.apiService.loadStoreTierDTOListForTierList(tierList.map(x => x.id)).subscribe(storeTierList => {
                this.initStoreTierFormArray(tierSaveBody.storeTierDTOList);

                // this.apiService.loadDiscountCategoryDTOListForCurrentPartner(storeTierList.map(x => x.id)).subscribe(discountCategories => {
                    this.initDiscountCategoriesFormArray(tierSaveBody.discountCategoryDTOList);
                // });
            // });

            this.storeOptions = storeNamebookList.map(n => { return { label: n.displayName, value: n.id }});
        });
    }

    //#region Tier

    initTierFormArray(tierList: Tier[]){
        this.tierFormArray = this.initFormArray(tierList, this.tierModel, this.tierDTOListSaveBodyName, this.tierTranslationKey, true);
        this.tierCrudMenu = this.getCrudMenuForOrderedData(this.tierFormArray, new Tier({id: 0}), this.tierLastIndexClicked);
        this.tierFormArray.validator = this.validatorService.isFormArrayEmpty(this.tierFormArray);
    }

    addNewTier(index: number){
        this.addNewFormControlToTheFormArray(this.tierFormArray, new Tier({id: 0}), index);
    }

    override onBeforeAddBelow(formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            this.storeTierFormArray.value.forEach((storeTier, index) => {
                if (storeTier.tierClientIndex == null || storeTier.tierClientIndex <= lastMenuIconIndexClicked)
                    return;
                
                (this.storeTierFormArray.controls[index] as SoftFormGroup<StoreTier>).controls.tierClientIndex.setValue(storeTier.tierClientIndex + 1);
            });

            this.discountCategoryFormArray.value.forEach((discountCategory, index) => {
                if (discountCategory.tierClientIndex == null || discountCategory.tierClientIndex <= lastMenuIconIndexClicked)
                    return;
                
                (this.discountCategoryFormArray.controls[index] as SoftFormGroup<DiscountCategory>).controls.tierClientIndex.setValue(discountCategory.tierClientIndex + 1);
            });

            let discountCategoryTablesForTier = this.discountCategoryTables.filter(x => (x.additionalIndexes as DiscountCategoryAdditionalIndexes).tierIndex > lastMenuIconIndexClicked);

            discountCategoryTablesForTier.forEach(table => {
                const additionalIndexes = table.additionalIndexes as DiscountCategoryAdditionalIndexes;
                this.setDiscountCategoryAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.storeTierIndex);
                // table.clientLoad();
            });
        }
    }

    override onBeforeAddAbove(formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            this.storeTierFormArray.value.forEach((storeTier, index) => { // FT: Adjusting storeTier indexes
                if (storeTier.tierClientIndex == null || storeTier.tierClientIndex < lastMenuIconIndexClicked)
                    return;
                
                (this.storeTierFormArray.controls[index] as SoftFormGroup<StoreTier>).controls.tierClientIndex.setValue(storeTier.tierClientIndex + 1);
            });

            this.discountCategoryFormArray.value.forEach((discountCategory, index) => { // FT: Adjusting discountCategory indexes
                if (discountCategory.tierClientIndex == null || discountCategory.tierClientIndex < lastMenuIconIndexClicked)
                    return;
                
                (this.discountCategoryFormArray.controls[index] as SoftFormGroup<DiscountCategory>).controls.tierClientIndex.setValue(discountCategory.tierClientIndex + 1);
            });

            let discountCategoryTablesForTier = this.discountCategoryTables.filter(x => (x.additionalIndexes as DiscountCategoryAdditionalIndexes).tierIndex >= lastMenuIconIndexClicked);

            discountCategoryTablesForTier.forEach(table => {
                const additionalIndexes = table.additionalIndexes as DiscountCategoryAdditionalIndexes;
                this.setDiscountCategoryAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.storeTierIndex);
                // table.clientLoad();
            });
        }
        else if (modelConstructor.typeName === this.storeTierModel.typeName) {
            
        }
    }

    getTierFormArrayControlByIndex(formControlName: keyof Tier & string, index: number){
        return this.getFormArrayControlByIndex<Tier>(formControlName, this.tierDTOListSaveBodyName, index);
    }

    //#endregion

    //#region StoreTier

    initStoreTierFormArray(storeTierList: StoreTier[]){
        // this.assignStoreTierListIndexes(storeTierList);
        this.storeTierFormArray = this.initFormArray(storeTierList, this.storeTierModel, this.storeTierDTOListSaveBodyName, this.storeTierTranslationKey);
        this.storeTierCrudMenu = this.getCrudMenuForOrderedData(this.storeTierFormArray, new StoreTier({id: 0}), this.storeTierLastIndexClicked);
    }

    addNewStoreTier(tierIndex: number){
        // FT: For the Tier we are not assigning index because we are sending the ordered list from the UI and we will get the index in foreach on the backend, but here we need orderNumber so we can filter 
        this.addNewFormControlToTheFormArray(this.storeTierFormArray, new StoreTier({id: 0, tierClientIndex: tierIndex}), null);
    }

    removeStoreTier(tierIndex: number, storeTierIndex: number){

    }

    storeChange(event: DropdownChangeEvent, tierIndex: number, storeTierIndex: number){
        let discountCategoryArrayForInsert: DiscountCategory[] = [];
        let discountCategoryIndexesForRemove: number[] = [];

        for (let i = 0; i < this.discountCategoryFormArray.value.length; i++) {
            const discountCategory = this.discountCategoryFormArray.value[i];

            if (discountCategory.tierClientIndex === tierIndex && discountCategory.storeTierClientIndex === storeTierIndex)
                discountCategoryIndexesForRemove.push(i);

            if (i >= this.discountCategoryLength)
                continue;

            if (discountCategory.storeId !== event.value)
                continue;

            let newDiscountCategory: DiscountCategory = new DiscountCategory(discountCategory);
            newDiscountCategory.storeTierClientIndex = storeTierIndex;
            newDiscountCategory.tierClientIndex = tierIndex;
            newDiscountCategory.storeId = event.value;

            discountCategoryArrayForInsert.push(newDiscountCategory);
        }
        
        this.removeFormControlsFromTheFormArray(this.discountCategoryFormArray, discountCategoryIndexesForRemove);

        discountCategoryArrayForInsert.forEach(newDiscountCategory => {
            this.addNewFormControlToTheFormArray(this.discountCategoryFormArray, newDiscountCategory, null, this.discountDisableLambda)
        });

        const discountCategoryTable: SoftDataTableComponent = this.findDiscountCategoryTable(tierIndex, storeTierIndex);

        discountCategoryTable.clientLoad();
    }

    getStoreTierFormArrayControl(formControlName: keyof StoreTier & string, index: number, tierIndex: number){
        return this.getFormArrayControlByIndex<StoreTier>(formControlName, this.storeTierDTOListSaveBodyName, index, 
            (formGroups: SoftFormGroup<StoreTier>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === tierIndex);
            });
    }

    getStoreTierFormArrayGroups(tierIndex: number){
        let formGroups: SoftFormGroup<StoreTier>[] = this.getFormArrayGroups(this.storeTierFormArray);
        return formGroups.filter(x => x.controls.tierClientIndex.value === tierIndex)
    }

    //#endregion

    //#region DiscountCategory M2M

    initDiscountCategoriesFormArray(discountCategories: DiscountCategory[]){
        this.discountCategoryFormArray = this.initFormArray(discountCategories, this.discountCategoryModel, this.discountCategoriesSaveBodyName, this.discountCategoriesTranslationKey, false, 
            this.discountDisableLambda
        );
        
        this.alreadySelectedDiscountCategoryIdsForStore = discountCategories.filter(x => x.selectedForStore).map(x => x.id);

        this.discountCategoryLength = discountCategories.length;
    }

    getAlreadySelectedDiscountCategoryIdsForStore = (additionalIndexes: DiscountCategoryAdditionalIndexes): number[] => {
        return this.discountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForStore).map(x => x.id);
    }

    getAlreadySelectedDiscountCategoryListForStore = (additionalIndexes: DiscountCategoryAdditionalIndexes) => {
        return this.discountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForStore);
    }

    discountDisableLambda = (formControlName: string, model: DiscountCategory): boolean => {
        if(formControlName === nameof<DiscountCategory>('discount') && model.selectedForStore !== true){
            return true;
        }

        return false;
    }

    getDiscountCategoryFormArrayItems = (additionalIndexes: DiscountCategoryAdditionalIndexes) => {
        return this.discountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex);
    }

    allSelected(event: AllClickEvent){
        const additionalIndexes = event.additionalIndexes as DiscountCategoryAdditionalIndexes;

        const formControls = this.getFormArrayControls<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, (formGroups: SoftFormGroup<DiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        if (event.checked === true) {
            formControls.forEach(control => {
                control.enable();

                if (control.label === 'id') {
                    this.discountCategorySelectedList.push({id: control.value, additionalIndexes: event.additionalIndexes});
                }
            });
        }
        else{
            formControls.forEach(control => {
                control.disable();
            });

            const selectedIndexes = this.discountCategorySelectedList
                .map((item, index) => (item.additionalIndexes === event.additionalIndexes ? index : -1))
                .filter(index => index !== -1);

            for (let i = selectedIndexes.length - 1; i >= 0; i--) {
                this.discountCategorySelectedList.splice(selectedIndexes[i], 1);
            }
        }
    }

    rowSelect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as DiscountCategoryAdditionalIndexes;

        const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<DiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        this.discountCategorySelectedList.push({id: event.id, additionalIndexes: event.additionalIndexes});

        formControl.enable();
    }

    rowUnselect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as DiscountCategoryAdditionalIndexes;

        const formControl = this.getFormArrayControlByIndex<DiscountCategory>('discount', this.discountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<DiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });
        
        const index = this.discountCategorySelectedList.findIndex(item => item.id === event.id && item.additionalIndexes === event.additionalIndexes);
          
        if (index !== -1) {
            this.discountCategorySelectedList.splice(index, 1);
        }

        formControl.disable();
    }

    getDiscountCategoryFormArrayControl = (formControlName: keyof DiscountCategory & string, index: number, additionalIndexes: DiscountCategoryAdditionalIndexes) => {
        return this.getFormArrayControlByIndex<DiscountCategory>(formControlName, this.discountCategoriesSaveBodyName, index, 
            (formGroups: SoftFormGroup<DiscountCategory>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === additionalIndexes.tierIndex && x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex);
            });
    }

    getDiscountCategoryAdditionalIndexes(tierIndex: number, storeTierIndex: number){
        return new DiscountCategoryAdditionalIndexes({tierIndex: tierIndex, storeTierIndex: storeTierIndex});
    }

    setDiscountCategoryAdditionalIndexes(table: SoftDataTableComponent, tierIndex: number, storeTierIndex: number){
        (table.additionalIndexes as DiscountCategoryAdditionalIndexes).tierIndex = tierIndex;
        (table.additionalIndexes as DiscountCategoryAdditionalIndexes).storeTierIndex = storeTierIndex;
    }

    findDiscountCategoryTable(tierIndex: number, storeTierIndex: number){
        return this.discountCategoryTables.find(x => 
            (x.additionalIndexes as DiscountCategoryAdditionalIndexes).tierIndex === tierIndex && 
            (x.additionalIndexes as DiscountCategoryAdditionalIndexes).storeTierIndex === storeTierIndex);
    }

    //#endregion

    override onBeforeSave(): void {
        let saveBody: TierSaveBody = new TierSaveBody();

        saveBody.tierDTOList = this.tierFormArray.getRawValue();
        saveBody.storeTierDTOList = this.storeTierFormArray.getRawValue();

        saveBody.selectedDiscountCategoryDTOList = this.discountCategoryFormArray.value
            .filter(x => this.discountCategorySelectedList.some(s => s.id === x.id && s.additionalIndexes.tierIndex === x.tierClientIndex && s.additionalIndexes.storeTierIndex === x.storeTierClientIndex))

        this.saveBody = saveBody;
    }
}

class DiscountCategoryAdditionalIndexes {
    tierIndex?: number;
    storeTierIndex?: number;

    constructor(
        {
            tierIndex, 
            storeTierIndex
        }:{
            tierIndex?: number; 
            storeTierIndex?: number;
        } = {}
    ) {
        this.tierIndex = tierIndex;
        this.storeTierIndex = storeTierIndex;
    }
};