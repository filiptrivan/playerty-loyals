import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { forkJoin, Observable } from 'rxjs';
import { DiscountCategory, StoreTier, StoreTierDiscountCategory, Tier, TierSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy, LastMenuIconIndexClicked } from 'src/app/core/components/base-form/base-form copy';
import { AllClickEvent, Column, RowClickEvent, SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormArray, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: [],
})
export class TierListComponent extends BaseFormCopy implements OnInit {
    override saveObservableMethod = this.apiService.saveTier; 

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

    // StoreTierDiscountCategory M2M
    storeTierDiscountCategoryCols: Column[];
    storeTierDiscountCategoryModel: StoreTierDiscountCategory = new StoreTierDiscountCategory();
    storeTierDiscountCategoriesSaveBodyName: string = nameof<TierSaveBody>('storeTierDiscountCategoryDTOList');
    storeTierDiscountCategoriesTranslationKey: string = new StoreTierDiscountCategory().typeName;
    storeTierDiscountCategoryFormArray: SoftFormArray<StoreTierDiscountCategory[]>;
    alreadySelectedDiscountCategoryListForStore: StoreTierDiscountCategory[] = [];
    alreadySelectedStoreTierDiscountCategoryIdsForStore: number[] = [];
    @ViewChildren('storeTierDiscountCategoryTable') storeTierDiscountCategoryTables: QueryList<SoftDataTableComponent>; // FT: Made for refreshing table

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
        this.storeTierDiscountCategoryCols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'discountCategoryDisplayName'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            tierSaveBody: this.apiService.loadTierSaveBodyDTO(),
            storeNamebookList: this.apiService.loadStoreListForDropdown(),
        }).subscribe(({ tierSaveBody, storeNamebookList }) => {
            this.initTierFormArray(tierSaveBody.tierDTOList);
            this.initStoreTierFormArray(tierSaveBody.storeTierDTOList);
            this.initStoreTierDiscountCategoriesFormArray(tierSaveBody.storeTierDiscountCategoryDTOList);

            this.storeOptions = storeNamebookList.map(n => { return { label: n.displayName, value: n.id }});
        });
    }

    //#region Tier

    initTierFormArray(tierList: Tier[]){
        this.tierFormArray = this.initFormArray(tierList, this.tierModel, this.tierDTOListSaveBodyName, this.tierTranslationKey, false);
        this.tierCrudMenu = this.getCrudMenuForOrderedData(this.tierFormArray, new Tier({id: 0}), this.tierLastIndexClicked);
        // this.tierFormArray.validator = this.validatorService.isFormArrayEmpty(this.tierFormArray); // FT: When deleting every tier, we should let it be empty
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
        // this.assignStoreTierListIndexes(storeTierList);
        this.storeTierFormArray = this.initFormArray(storeTierList, this.storeTierModel, this.storeTierDTOListSaveBodyName, this.storeTierTranslationKey);
        this.storeTierCrudMenu = this.getCrudMenuForOrderedData(this.storeTierFormArray, new StoreTier({id: 0}), this.storeTierLastIndexClicked, true);
    }

    addNewStoreTier(tierIndex: number, formArrayIndex: number = null){
        // FT: For the Tier we are not assigning index because we are sending the ordered list from the UI and we will get the index in foreach on the backend, but here we need orderNumber so we can filter 
        this.addNewFormControlToTheFormArray(this.storeTierFormArray, new StoreTier({id: 0, tierClientIndex: tierIndex}), formArrayIndex);
    }

    // FT: Adding new table of storeTierDiscountCategory for the selected store
    storeChange(event: DropdownChangeEvent, tierIndex: number, storeTierIndex: number){
        let storeTierDiscountCategoryArrayForInsert: DiscountCategory[] = [];
        let storeTierDiscountCategoryIndexesForRemove: number[] = [];

        for (let i = 0; i < this.storeTierDiscountCategoryFormArray.value.length; i++) {
            const storeTierDiscountCategory = this.storeTierDiscountCategoryFormArray.value[i];

            if (storeTierDiscountCategory.tierClientIndex === tierIndex && storeTierDiscountCategory.storeTierClientIndex === storeTierIndex)
                storeTierDiscountCategoryIndexesForRemove.push(i);

            if (storeTierDiscountCategory.tierClientIndex !== null || storeTierDiscountCategory.storeTierClientIndex !== null)
                continue;

            if (storeTierDiscountCategory.storeId !== event.value) // FT: Skipping the storeTierDiscountCategory from the first (eg. 14) which are not from the selected store
                continue;

            let newStoreTierDiscountCategory: StoreTierDiscountCategory = new StoreTierDiscountCategory(storeTierDiscountCategory);
            newStoreTierDiscountCategory.storeTierClientIndex = storeTierIndex;
            newStoreTierDiscountCategory.tierClientIndex = tierIndex;

            storeTierDiscountCategoryArrayForInsert.push(newStoreTierDiscountCategory);
        }
        
        this.removeFormControlsFromTheFormArray(this.storeTierDiscountCategoryFormArray, storeTierDiscountCategoryIndexesForRemove);

        storeTierDiscountCategoryArrayForInsert.forEach(newDiscountCategory => {
            this.addNewFormControlToTheFormArray(this.storeTierDiscountCategoryFormArray, newDiscountCategory, null, this.discountDisableLambda)
        });

        const storeTierDiscountCategoryTable: SoftDataTableComponent = this.findStoreTierDiscountCategoryTable(tierIndex, storeTierIndex);

        storeTierDiscountCategoryTable.clientLoad();
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

    getStoreTierIndexInTheFormArray(tierIndex: number, storeTierIndex: number){
        const storeTierList = this.storeTierFormArray.value;

        let j: number = 0

        for (let i = 0; i < storeTierList.length; i++) {
            if (storeTierList[i].tierClientIndex === tierIndex) {
                if (j === storeTierIndex){
                    return i;
                }
                else{
                    j++;
                }
            }
        }

        return null;
    }

    //#endregion

    //#region DiscountCategory M2M

    initStoreTierDiscountCategoriesFormArray(storeTierDiscountCategories: StoreTierDiscountCategory[]){
        this.storeTierDiscountCategoryFormArray = this.initFormArray(storeTierDiscountCategories, this.storeTierDiscountCategoryModel, this.storeTierDiscountCategoriesSaveBodyName, this.storeTierDiscountCategoriesTranslationKey, false, 
            this.discountDisableLambda
        );
        
        this.alreadySelectedStoreTierDiscountCategoryIdsForStore = storeTierDiscountCategories.filter(x => x.selectedForStore).map(x => x.id);
    }

    getAlreadySelectedStoreTierDiscountCategoryIdsForStore = (additionalIndexes: StoreTierDiscountCategoryAdditionalIndexes): number[] => {
        return this.storeTierDiscountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForStore).map(x => x.id);
    }

    getAlreadySelectedDiscountCategoryListForStore = (additionalIndexes: StoreTierDiscountCategoryAdditionalIndexes) => {
        return this.storeTierDiscountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForStore);
    }

    discountDisableLambda = (formControlName: string, model: StoreTierDiscountCategory): boolean => {
        if(formControlName === nameof<StoreTierDiscountCategory>('discount') && model.selectedForStore !== true){
            return true;
        }

        return false;
    }

    getDiscountCategoryFormArrayItems = (additionalIndexes: StoreTierDiscountCategoryAdditionalIndexes) => {
        return this.storeTierDiscountCategoryFormArray.value.filter(x => x.storeTierClientIndex === additionalIndexes.storeTierIndex && x.tierClientIndex === additionalIndexes.tierIndex);
    }

    allSelected(event: AllClickEvent){
        const additionalIndexes = event.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;

        const discountFormControls = this.getFormArrayControls<StoreTierDiscountCategory>('discount', this.storeTierDiscountCategoriesSaveBodyName, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControls = this.getFormArrayControls<StoreTierDiscountCategory>('selectedForStore', this.storeTierDiscountCategoriesSaveBodyName, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        if (event.checked === true) {
            discountFormControls.forEach(control => {
                control.enable();
            });

            selectedFormControls.forEach(control => {
                control.setValue(true);
            });
        }
        else{
            discountFormControls.forEach(control => {
                control.disable();
            });

            selectedFormControls.forEach(control => {
                control.setValue(false);
            });
        }
    }

    rowSelect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;

        const discountFormControl = this.getFormArrayControlByIndex<StoreTierDiscountCategory>('discount', this.storeTierDiscountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex<StoreTierDiscountCategory>('selectedForStore', this.storeTierDiscountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.enable();
        selectedFormControl.setValue(true);
    }

    rowUnselect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;

        const discountFormControl = this.getFormArrayControlByIndex<StoreTierDiscountCategory>('discount', this.storeTierDiscountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex<StoreTierDiscountCategory>('selectedForStore', this.storeTierDiscountCategoriesSaveBodyName, event.index, (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.disable();
        selectedFormControl.setValue(false);
    }

    getDiscountCategoryFormArrayControl = (formControlName: keyof StoreTierDiscountCategory & string, index: number, additionalIndexes: StoreTierDiscountCategoryAdditionalIndexes) => {
        return this.getFormArrayControlByIndex<StoreTierDiscountCategory>(formControlName, this.storeTierDiscountCategoriesSaveBodyName, index, 
            (formGroups: SoftFormGroup<StoreTierDiscountCategory>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === additionalIndexes.tierIndex && x.controls.storeTierClientIndex.value === additionalIndexes.storeTierIndex);
            });
    }

    getStoreTierDiscountCategoryAdditionalIndexes(tierIndex: number, storeTierIndex: number){
        return new StoreTierDiscountCategoryAdditionalIndexes({tierIndex: tierIndex, storeTierIndex: storeTierIndex});
    }

    setStoreTierDiscountCategoryAdditionalIndexes(table: SoftDataTableComponent, tierIndex: number, storeTierIndex: number){
        (table.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex = tierIndex;
        (table.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).storeTierIndex = storeTierIndex;
    }

    findStoreTierDiscountCategoryTable(tierIndex: number, storeTierIndex: number){
        return this.storeTierDiscountCategoryTables.find(x => 
            (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex === tierIndex && 
            (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).storeTierIndex === storeTierIndex);
    }

    //#endregion

    override onBeforeRemove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            let storeTierIndexesForRemove: number[] = [];
            let storeTierDiscountCategoryIndexesForRemove: number[] = [];

            // FT: Adjusting indexes for storeTierFormArray
            this.storeTierFormArray.value.forEach((storeTier, index) => {
                if (storeTier.tierClientIndex == this.tierLastIndexClicked.index)
                    storeTierIndexesForRemove.push(index);

                if (storeTier.tierClientIndex == null || storeTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierFormArray.controls[index] as SoftFormGroup<StoreTier>).controls.tierClientIndex.setValue(storeTier.tierClientIndex - 1);
            });

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex == this.tierLastIndexClicked.index)
                    storeTierDiscountCategoryIndexesForRemove.push(index);

                if (storeTierDiscountCategory.tierClientIndex == null || storeTierDiscountCategory.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.tierClientIndex.setValue(storeTierDiscountCategory.tierClientIndex - 1);
            });

            this.removeFormControlsFromTheFormArray(this.storeTierDiscountCategoryFormArray, storeTierDiscountCategoryIndexesForRemove);
            this.removeFormControlsFromTheFormArray(this.storeTierFormArray, storeTierIndexesForRemove);

            // FT: Adjust all additional indexes on tables where tierIndex is greater then last clicked
            let storeTierDiscountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex >= this.tierLastIndexClicked.index);
            storeTierDiscountCategoryTablesForTier.forEach(table => {
                table.clientLoad();
            });
        }
        else if (modelConstructor.typeName === this.storeTierModel.typeName) {
            let storeTierDiscountCategoryIndexesForRemove: number[] = [];
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex === this.tierLastIndexClicked.index && storeTierDiscountCategory.storeTierClientIndex === this.storeTierLastIndexClicked.index)
                    storeTierDiscountCategoryIndexesForRemove.push(index);

                if (storeTierDiscountCategory.tierClientIndex == null || 
                    storeTierDiscountCategory.storeTierClientIndex == null || 
                    storeTierDiscountCategory.tierClientIndex !== this.tierLastIndexClicked.index || 
                    storeTierDiscountCategory.storeTierClientIndex <= this.storeTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.storeTierClientIndex.setValue(storeTierDiscountCategory.storeTierClientIndex - 1);
           });

           this.removeFormControlsFromTheFormArray(this.storeTierDiscountCategoryFormArray, storeTierDiscountCategoryIndexesForRemove);
           
           let formArrayIndex: number = this.getStoreTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.storeTierLastIndexClicked.index);
           this.removeFormControlFromTheFormArray(this.storeTierFormArray, formArrayIndex);

           // FT: Adjust all additional indexes on tables where storeTierIndex is greater then last clicked
           let storeTierDiscountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => 
               (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
               (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).storeTierIndex >= this.storeTierLastIndexClicked.index);

           storeTierDiscountCategoryTablesForTier.forEach(table => {
               table.clientLoad(); // FT: Because we changed additional indexes, items also change
           });
        }
    }

    override onBeforeAddBelow(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for storeTierFormArray
            this.storeTierFormArray.value.forEach((storeTier, index) => {
                if (storeTier.tierClientIndex == null || storeTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierFormArray.controls[index] as SoftFormGroup<StoreTier>).controls.tierClientIndex.setValue(storeTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex == null || storeTierDiscountCategory.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.tierClientIndex.setValue(storeTierDiscountCategory.tierClientIndex + 1);
            });

            // FT: We don't need to do this because change detection from the html does it for us.
            // FT: Adjust all additional indexes on tables where tierIndex is greater then last clicked
            // let storeTierDiscountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex > this.tierLastIndexClicked.index);
            // storeTierDiscountCategoryTablesForTier.forEach(table => {
                // const additionalIndexes = table.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;
                // this.setStoreTierDiscountCategoryAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.storeTierIndex);
                // table.clientLoad();
            // });
        }
        else if (modelConstructor.typeName === this.storeTierModel.typeName) {
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex == null || 
                    storeTierDiscountCategory.storeTierClientIndex == null || 
                    storeTierDiscountCategory.tierClientIndex != this.tierLastIndexClicked.index || 
                    storeTierDiscountCategory.storeTierClientIndex <= this.storeTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.storeTierClientIndex.setValue(storeTierDiscountCategory.storeTierClientIndex + 1);
            });

            // FT: Adjust all additional indexes on tables where storeTierIndex is greater then last clicked
            let storeTierDiscountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => 
                (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
                (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).storeTierIndex > this.storeTierLastIndexClicked.index);

            storeTierDiscountCategoryTablesForTier.forEach(table => {
                table.clientLoad(); // FT: Because we changed additional indexes the items also changes
            });

            let formArrayIndex: number = this.getStoreTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.storeTierLastIndexClicked.index);
            this.addNewStoreTier(this.tierLastIndexClicked.index, formArrayIndex + 1);
        }
    }

    override onBeforeAddAbove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for storeTierFormArray
            this.storeTierFormArray.value.forEach((storeTier, index) => { // FT: Adjusting storeTier indexes
                if (storeTier.tierClientIndex == null || storeTier.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierFormArray.controls[index] as SoftFormGroup<StoreTier>).controls.tierClientIndex.setValue(storeTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex == null || storeTierDiscountCategory.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.tierClientIndex.setValue(storeTierDiscountCategory.tierClientIndex + 1);
            });

            // FT: We don't need to do this because change detection from the html does it for us.
            // let discountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex >= lastMenuIconIndexClicked);
            // discountCategoryTablesForTier.forEach(table => {
            //     const additionalIndexes = table.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;
            //     this.setStoreTierDiscountCategoryAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.storeTierIndex);
            //     table.clientLoad();
            // });
        }
        else if (modelConstructor.typeName === this.storeTierModel.typeName) {
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for storeTierDiscountCategoryFormArray
            this.storeTierDiscountCategoryFormArray.value.forEach((storeTierDiscountCategory, index) => {
                if (storeTierDiscountCategory.tierClientIndex == null || 
                    storeTierDiscountCategory.storeTierClientIndex == null || 
                    storeTierDiscountCategory.tierClientIndex != this.tierLastIndexClicked.index || 
                    storeTierDiscountCategory.storeTierClientIndex < this.storeTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.storeTierDiscountCategoryFormArray.controls[index] as SoftFormGroup<StoreTierDiscountCategory>).controls.storeTierClientIndex.setValue(storeTierDiscountCategory.storeTierClientIndex + 1);
            });

            // FT: Adjust all additional indexes on tables where storeTierIndex is greater then last clicked
            let storeTierDiscountCategoryTablesForTier = this.storeTierDiscountCategoryTables.filter(x => 
                (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
                (x.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes).storeTierIndex >= this.storeTierLastIndexClicked.index);

            storeTierDiscountCategoryTablesForTier.forEach(table => {
                // FT: We don't need to do this because change detection from the html does it for us.
                // const additionalIndexes = table.additionalIndexes as StoreTierDiscountCategoryAdditionalIndexes;
                // this.setStoreTierDiscountCategoryAdditionalIndexes(table, additionalIndexes.tierIndex, additionalIndexes.storeTierIndex + 1); 

                table.clientLoad(); // FT: Because we changed additional indexes the items also changes
            });

            let formArrayIndex: number = this.getStoreTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.storeTierLastIndexClicked.index);
            this.addNewStoreTier(this.tierLastIndexClicked.index, formArrayIndex);
        }
    }

    override onBeforeSave(): void {
        let saveBody: TierSaveBody = new TierSaveBody();

        saveBody.tierDTOList = this.tierFormArray.getRawValue();
        saveBody.storeTierDTOList = this.storeTierFormArray.getRawValue();

        saveBody.storeTierDiscountCategoryDTOList = this.storeTierDiscountCategoryFormArray.value;

        this.saveBody = saveBody;
    }

    override onAfterSave(): void {
        const selectedFormControls = this.getFormArrayControls<StoreTierDiscountCategory>('selectedForStore', this.storeTierDiscountCategoriesSaveBodyName);
        
        selectedFormControls.forEach((selectedFormControl, index) => {
            const discountFormControl = this.getFormArrayControlByIndex<StoreTierDiscountCategory>('discount', this.storeTierDiscountCategoriesSaveBodyName, index)

            if (selectedFormControl.value === false){
                discountFormControl.disable();
            }
        });
    }
}

class StoreTierDiscountCategoryAdditionalIndexes {
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