import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { forkJoin, Observable } from 'rxjs';
import { DiscountProductGroup, BusinessSystemTier, BusinessSystemTierDiscountProductGroup, Tier, TierSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { AllClickEvent, Column, RowClickEvent, SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftFormArray, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { LastMenuIconIndexClicked } from 'src/app/core/entities/last-menu-icon-index-clicked';
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

    // BusinessSystemTier
    businessSystemTierModel: BusinessSystemTier = new BusinessSystemTier();
    businessSystemTierDTOListSaveBodyName: string = nameof<TierSaveBody>('businessSystemTierDTOList');
    businessSystemTierTranslationKey: string = new BusinessSystemTier().typeName;
    businessSystemTierFormArray: SoftFormArray<BusinessSystemTier[]>;
    businessSystemTierCrudMenu: MenuItem[];
    businessSystemOptions: PrimengOption[];
    businessSystemTierLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();

    // BusinessSystemTierDiscountProductGroup M2M
    businessSystemTierDiscountProductGroupCols: Column<BusinessSystemTierDiscountProductGroup>[];
    businessSystemTierDiscountProductGroupModel: BusinessSystemTierDiscountProductGroup = new BusinessSystemTierDiscountProductGroup();
    businessSystemTierDiscountProductGroupSaveBodyName: string = nameof<TierSaveBody>('businessSystemTierDiscountProductGroupDTOList');
    businessSystemTierDiscountProductGroupTranslationKey: string = new BusinessSystemTierDiscountProductGroup().typeName;
    businessSystemTierDiscountProductGroupFormArray: SoftFormArray<BusinessSystemTierDiscountProductGroup[]>;
    alreadySelectedDiscountProductGroupListForBusinessSystem: BusinessSystemTierDiscountProductGroup[] = [];
    alreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem: number[] = [];
    @ViewChildren('businessSystemTierDiscountProductGroupTable') businessSystemTierDiscountProductGroupTables: QueryList<SoftDataTableComponent>; // FT: Made for refreshing table

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
        this.businessSystemTierDiscountProductGroupCols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'discountProductGroupDisplayName'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            tierSaveBody: this.apiService.getTierSaveBodyDTO(),
            businessSystemNamebookList: this.apiService.getBusinessSystemListForDropdown(),
        }).subscribe(({ tierSaveBody, businessSystemNamebookList }) => {
            this.initTierFormArray(tierSaveBody.tierDTOList);
            this.initBusinessSystemTierFormArray(tierSaveBody.businessSystemTierDTOList);
            this.initBusinessSystemTierDiscountCategoriesFormArray(tierSaveBody.businessSystemTierDiscountProductGroupDTOList);

            this.businessSystemOptions = businessSystemNamebookList.map(n => { return { label: n.displayName, value: n.id }});
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

    //#endregion

    //#region BusinessSystemTier

    initBusinessSystemTierFormArray(businessSystemTierList: BusinessSystemTier[]){
        // this.assignBusinessSystemTierListIndexes(businessSystemTierList);
        this.businessSystemTierFormArray = this.initFormArray(businessSystemTierList, this.businessSystemTierModel, this.businessSystemTierDTOListSaveBodyName, this.businessSystemTierTranslationKey);
        this.businessSystemTierCrudMenu = this.getCrudMenuForOrderedData(this.businessSystemTierFormArray, new BusinessSystemTier({id: 0}), this.businessSystemTierLastIndexClicked, true);
    }

    addNewBusinessSystemTier(tierIndex: number, formArrayIndex: number = null){
        // FT: For the Tier we are not assigning index because we are sending the ordered list from the UI and we will get the index in foreach on the backend, but here we need orderNumber so we can filter 
        this.addNewFormControlToTheFormArray(this.businessSystemTierFormArray, new BusinessSystemTier({id: 0, tierClientIndex: tierIndex}), formArrayIndex);
    }

    // FT: Adding new table of businessSystemTierDiscountProductGroup for the selected businessSystem
    businessSystemChange(event: DropdownChangeEvent, tierIndex: number, businessSystemTierIndex: number){
        let businessSystemTierDiscountProductGroupArrayForInsert: DiscountProductGroup[] = [];
        let businessSystemTierDiscountProductGroupIndexesForRemove: number[] = [];

        for (let i = 0; i < this.businessSystemTierDiscountProductGroupFormArray.value.length; i++) {
            const businessSystemTierDiscountProductGroup = this.businessSystemTierDiscountProductGroupFormArray.value[i];

            if (businessSystemTierDiscountProductGroup.tierClientIndex === tierIndex && businessSystemTierDiscountProductGroup.businessSystemTierClientIndex === businessSystemTierIndex)
                businessSystemTierDiscountProductGroupIndexesForRemove.push(i);

            if (businessSystemTierDiscountProductGroup.tierClientIndex !== null || businessSystemTierDiscountProductGroup.businessSystemTierClientIndex !== null)
                continue;

            if (businessSystemTierDiscountProductGroup.businessSystemId !== event.value) // FT: Skipping the businessSystemTierDiscountProductGroup from the first (eg. 14) which are not from the selected businessSystem
                continue;

            let newBusinessSystemTierDiscountProductGroup: BusinessSystemTierDiscountProductGroup = new BusinessSystemTierDiscountProductGroup(businessSystemTierDiscountProductGroup);
            newBusinessSystemTierDiscountProductGroup.businessSystemTierClientIndex = businessSystemTierIndex;
            newBusinessSystemTierDiscountProductGroup.tierClientIndex = tierIndex;

            businessSystemTierDiscountProductGroupArrayForInsert.push(newBusinessSystemTierDiscountProductGroup);
        }
        
        this.removeFormControlsFromTheFormArray(this.businessSystemTierDiscountProductGroupFormArray, businessSystemTierDiscountProductGroupIndexesForRemove);

        businessSystemTierDiscountProductGroupArrayForInsert.forEach(newDiscountProductGroup => {
            this.addNewFormControlToTheFormArray(this.businessSystemTierDiscountProductGroupFormArray, newDiscountProductGroup, null, this.discountDisableLambda)
        });

        const businessSystemTierDiscountProductGroupTable: SoftDataTableComponent = this.findBusinessSystemTierDiscountProductGroupTable(tierIndex, businessSystemTierIndex);

        businessSystemTierDiscountProductGroupTable.clientLoad();
    }

    getBusinessSystemTierFormArrayControl(formControlName: keyof BusinessSystemTier & string, index: number, tierIndex: number){
        return this.getFormArrayControlByIndex(formControlName, this.businessSystemTierFormArray, index, 
            (formGroups: SoftFormGroup<BusinessSystemTier>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === tierIndex);
            });
    }

    getBusinessSystemTierFormArrayGroups(tierIndex: number){
        let formGroups: SoftFormGroup<BusinessSystemTier>[] = this.getFormArrayGroups(this.businessSystemTierFormArray);
        return formGroups.filter(x => x.controls.tierClientIndex.value === tierIndex)
    }

    getBusinessSystemTierIndexInTheFormArray(tierIndex: number, businessSystemTierIndex: number){
        const businessSystemTierList = this.businessSystemTierFormArray.value;

        let j: number = 0

        for (let i = 0; i < businessSystemTierList.length; i++) {
            if (businessSystemTierList[i].tierClientIndex === tierIndex) {
                if (j === businessSystemTierIndex){
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

    //#region DiscountProductGroup M2M

    initBusinessSystemTierDiscountCategoriesFormArray(businessSystemTierDiscountCategories: BusinessSystemTierDiscountProductGroup[]){
        this.businessSystemTierDiscountProductGroupFormArray = this.initFormArray(businessSystemTierDiscountCategories, this.businessSystemTierDiscountProductGroupModel, this.businessSystemTierDiscountProductGroupSaveBodyName, this.businessSystemTierDiscountProductGroupTranslationKey, false, 
            this.discountDisableLambda
        );
        
        this.alreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem = businessSystemTierDiscountCategories.filter(x => x.selectedForBusinessSystem).map(x => x.id);
    }

    getAlreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes): number[] => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForBusinessSystem).map(x => x.id);
    }

    getAlreadySelectedDiscountProductGroupListForBusinessSystem = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForBusinessSystem);
    }

    discountDisableLambda = (formControlName: string, model: BusinessSystemTierDiscountProductGroup): boolean => {
        if(formControlName === nameof<BusinessSystemTierDiscountProductGroup>('discount') && model.selectedForBusinessSystem !== true){
            return true;
        }

        return false;
    }

    getDiscountProductGroupFormArrayItems = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex);
    }

    allSelected(event: AllClickEvent){
        const additionalIndexes = event.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;

        const discountFormControls = this.getFormArrayControls<BusinessSystemTierDiscountProductGroup>('discount', this.businessSystemTierDiscountProductGroupSaveBodyName, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControls = this.getFormArrayControls<BusinessSystemTierDiscountProductGroup>('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupSaveBodyName, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
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
        const additionalIndexes = event.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;

        const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.enable();
        selectedFormControl.setValue(true);
    }

    rowUnselect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;

        const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.disable();
        selectedFormControl.setValue(false);
    }

    getDiscountProductGroupFormArrayControl = (formControlName: keyof BusinessSystemTierDiscountProductGroup & string, index: number, additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.getFormArrayControlByIndex(formControlName, this.businessSystemTierDiscountProductGroupFormArray, index, 
            (formGroups: SoftFormGroup<BusinessSystemTierDiscountProductGroup>[]): SoftFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === additionalIndexes.tierIndex && x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex);
            });
    }

    getBusinessSystemTierDiscountProductGroupAdditionalIndexes(tierIndex: number, businessSystemTierIndex: number){
        return new BusinessSystemTierDiscountProductGroupAdditionalIndexes({tierIndex: tierIndex, businessSystemTierIndex: businessSystemTierIndex});
    }

    setBusinessSystemTierDiscountProductGroupAdditionalIndexes(table: SoftDataTableComponent, tierIndex: number, businessSystemTierIndex: number){
        (table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex = tierIndex;
        (table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex = businessSystemTierIndex;
    }

    findBusinessSystemTierDiscountProductGroupTable(tierIndex: number, businessSystemTierIndex: number){
        return this.businessSystemTierDiscountProductGroupTables.find(x => 
            (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex === tierIndex && 
            (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex === businessSystemTierIndex);
    }

    //#endregion

    override onBeforeRemove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            let businessSystemTierIndexesForRemove: number[] = [];
            let businessSystemTierDiscountProductGroupIndexesForRemove: number[] = [];

            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => {
                if (businessSystemTier.tierClientIndex == this.tierLastIndexClicked.index)
                    businessSystemTierIndexesForRemove.push(index);

                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SoftFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex - 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == this.tierLastIndexClicked.index)
                    businessSystemTierDiscountProductGroupIndexesForRemove.push(index);

                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex - 1);
            });

            this.removeFormControlsFromTheFormArray(this.businessSystemTierDiscountProductGroupFormArray, businessSystemTierDiscountProductGroupIndexesForRemove);
            this.removeFormControlsFromTheFormArray(this.businessSystemTierFormArray, businessSystemTierIndexesForRemove);

            // FT: Adjust all additional indexes on tables where tierIndex is greater then last clicked
            let businessSystemTierDiscountProductGroupTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex >= this.tierLastIndexClicked.index);
            businessSystemTierDiscountProductGroupTablesForTier.forEach(table => {
                table.clientLoad();
            });
        }
        else if (modelConstructor.typeName === this.businessSystemTierModel.typeName) {
            let businessSystemTierDiscountProductGroupIndexesForRemove: number[] = [];
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex === this.tierLastIndexClicked.index && businessSystemTierDiscountProductGroup.businessSystemTierClientIndex === this.businessSystemTierLastIndexClicked.index)
                    businessSystemTierDiscountProductGroupIndexesForRemove.push(index);

                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.tierClientIndex !== this.tierLastIndexClicked.index || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex <= this.businessSystemTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex - 1);
           });

           this.removeFormControlsFromTheFormArray(this.businessSystemTierDiscountProductGroupFormArray, businessSystemTierDiscountProductGroupIndexesForRemove);
           
           let formArrayIndex: number = this.getBusinessSystemTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.businessSystemTierLastIndexClicked.index);
           this.removeFormControlFromTheFormArray(this.businessSystemTierFormArray, formArrayIndex);

           // FT: Adjust all additional indexes on tables where businessSystemTierIndex is greater then last clicked
           let businessSystemTierDiscountProductGroupTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => 
               (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
               (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex >= this.businessSystemTierLastIndexClicked.index);

           businessSystemTierDiscountProductGroupTablesForTier.forEach(table => {
               table.clientLoad(); // FT: Because we changed additional indexes, items also change
           });
        }
    }

    override onBeforeAddBelow(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => {
                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SoftFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex + 1);
            });

            // FT: We don't need to do this because change detection from the html does it for us.
            // FT: Adjust all additional indexes on tables where tierIndex is greater then last clicked
            // let businessSystemTierDiscountProductGroupTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex > this.tierLastIndexClicked.index);
            // businessSystemTierDiscountProductGroupTablesForTier.forEach(table => {
                // const additionalIndexes = table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;
                // this.setBusinessSystemTierDiscountProductGroupAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.businessSystemTierIndex);
                // table.clientLoad();
            // });
        }
        else if (modelConstructor.typeName === this.businessSystemTierModel.typeName) {
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.tierClientIndex != this.tierLastIndexClicked.index || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex <= this.businessSystemTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex + 1);
            });

            // FT: Adjust all additional indexes on tables where businessSystemTierIndex is greater then last clicked
            let businessSystemTierDiscountProductGroupTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => 
                (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
                (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex > this.businessSystemTierLastIndexClicked.index);

            businessSystemTierDiscountProductGroupTablesForTier.forEach(table => {
                table.clientLoad(); // FT: Because we changed additional indexes the items also changes
            });

            let formArrayIndex: number = this.getBusinessSystemTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.businessSystemTierLastIndexClicked.index);
            this.addNewBusinessSystemTier(this.tierLastIndexClicked.index, formArrayIndex + 1);
        }
    }

    override onBeforeAddAbove(formArray: SoftFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => { // FT: Adjusting businessSystemTier indexes
                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SoftFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex + 1);
            });

            // FT: We don't need to do this because change detection from the html does it for us.
            // let discountCategoryTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex >= lastMenuIconIndexClicked);
            // discountCategoryTablesForTier.forEach(table => {
            //     const additionalIndexes = table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;
            //     this.setBusinessSystemTierDiscountProductGroupAdditionalIndexes(table, additionalIndexes.tierIndex + 1, additionalIndexes.businessSystemTierIndex);
            //     table.clientLoad();
            // });
        }
        else if (modelConstructor.typeName === this.businessSystemTierModel.typeName) {
            modelConstructor.tierClientIndex = this.tierLastIndexClicked.index;

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex == null || 
                    businessSystemTierDiscountProductGroup.tierClientIndex != this.tierLastIndexClicked.index || 
                    businessSystemTierDiscountProductGroup.businessSystemTierClientIndex < this.businessSystemTierLastIndexClicked.index
                ) {
                    return;
                }
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SoftFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex + 1);
            });

            // FT: Adjust all additional indexes on tables where businessSystemTierIndex is greater then last clicked
            let businessSystemTierDiscountProductGroupTablesForTier = this.businessSystemTierDiscountProductGroupTables.filter(x => 
                (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex === this.tierLastIndexClicked.index &&
                (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex >= this.businessSystemTierLastIndexClicked.index);

            businessSystemTierDiscountProductGroupTablesForTier.forEach(table => {
                // FT: We don't need to do this because change detection from the html does it for us.
                // const additionalIndexes = table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;
                // this.setBusinessSystemTierDiscountProductGroupAdditionalIndexes(table, additionalIndexes.tierIndex, additionalIndexes.businessSystemTierIndex + 1); 

                table.clientLoad(); // FT: Because we changed additional indexes the items also changes
            });

            let formArrayIndex: number = this.getBusinessSystemTierIndexInTheFormArray(this.tierLastIndexClicked.index, this.businessSystemTierLastIndexClicked.index);
            this.addNewBusinessSystemTier(this.tierLastIndexClicked.index, formArrayIndex);
        }
    }

    override onBeforeSave(): void {
        let saveBody: TierSaveBody = new TierSaveBody();

        saveBody.tierDTOList = this.tierFormArray.getRawValue();
        saveBody.businessSystemTierDTOList = this.businessSystemTierFormArray.getRawValue();

        saveBody.businessSystemTierDiscountProductGroupDTOList = this.businessSystemTierDiscountProductGroupFormArray.value;

        this.saveBody = saveBody;
    }

    override onAfterSave(): void {
        const selectedFormControls = this.getFormArrayControls<BusinessSystemTierDiscountProductGroup>('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupSaveBodyName);
        
        selectedFormControls.forEach((selectedFormControl, index) => {
            const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, index)

            if (selectedFormControl.value === false){
                discountFormControl.disable();
            }
        });
    }
}

class BusinessSystemTierDiscountProductGroupAdditionalIndexes {
    tierIndex?: number;
    businessSystemTierIndex?: number;

    constructor(
        {
            tierIndex, 
            businessSystemTierIndex
        }:{
            tierIndex?: number; 
            businessSystemTierIndex?: number;
        } = {}
    ) {
        this.tierIndex = tierIndex;
        this.businessSystemTierIndex = businessSystemTierIndex;
    }
};