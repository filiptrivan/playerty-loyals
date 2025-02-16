import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { combineLatest, forkJoin, map, Subscription } from 'rxjs';
import { DiscountProductGroup, BusinessSystemTier, BusinessSystemTierDiscountProductGroup, Tier, TierSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, nameof, SpiderFormArray, LastMenuIconIndexClicked, PrimengOption, Column, SpiderDataTableComponent, SpiderMessageService, BaseFormService, SpiderFormGroup, AllClickEvent, RowClickEvent } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: [],
})
export class TierListComponent extends BaseFormCopy implements OnInit {
    // Tier
    tierModel = new Tier();
    tierDTOListSaveBodyName: string = nameof<TierSaveBody>('tierDTOList');
    tierTranslationKey: string = new Tier().typeName;
    tierFormArray: SpiderFormArray<Tier>;
    tierCrudMenu: MenuItem[];
    tierLastIndexClicked = new LastMenuIconIndexClicked();

    // BusinessSystemTier
    businessSystemTierModel = new BusinessSystemTier();
    businessSystemTierDTOListSaveBodyName: string = nameof<TierSaveBody>('businessSystemTierDTOList');
    businessSystemTierTranslationKey: string = new BusinessSystemTier().typeName;
    businessSystemTierFormArray: SpiderFormArray<BusinessSystemTier>;
    businessSystemTierCrudMenu: MenuItem[];
    businessSystemOptions: PrimengOption[];
    businessSystemTierLastIndexClicked = new LastMenuIconIndexClicked();

    // BusinessSystemTierDiscountProductGroup M2M
    businessSystemTierDiscountProductGroupCols: Column<BusinessSystemTierDiscountProductGroup>[];
    businessSystemTierDiscountProductGroupModel = new BusinessSystemTierDiscountProductGroup();
    businessSystemTierDiscountProductGroupSaveBodyName: string = nameof<TierSaveBody>('businessSystemTierDiscountProductGroupDTOList');
    businessSystemTierDiscountProductGroupTranslationKey: string = new BusinessSystemTierDiscountProductGroup().typeName;
    businessSystemTierDiscountProductGroupFormArray: SpiderFormArray<BusinessSystemTierDiscountProductGroup>;
    alreadySelectedDiscountProductGroupListForBusinessSystem: BusinessSystemTierDiscountProductGroup[] = [];
    alreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem: number[] = [];
    @ViewChildren('businessSystemTierDiscountProductGroupTable') businessSystemTierDiscountProductGroupTables: QueryList<SpiderDataTableComponent>; // FT: Made for refreshing table

    // Authorization
    authorizationForSaveSubscription: Subscription;
    isAuthorizedForSave = false;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
        private authService: AuthService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        this.formGroup.saveObservableMethod = this.apiService.saveTier;
        
        this.businessSystemTierDiscountProductGroupCols = [
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'discountProductGroupDisplayName'},
            {name: this.translocoService.translate('Discount'), filterType: 'numeric', field: 'discount', showMatchModes: true, editable: true},
        ];

        forkJoin({
            tierSaveBody: this.apiService.getTierSaveBodyForCurrentPartner(),
            businessSystemNamebookList: this.apiService.getBusinessSystemDropdownListForBusinessSystemTier(),
        }).subscribe(({ tierSaveBody, businessSystemNamebookList }) => {
            this.initTierFormArray(tierSaveBody.tierDTOList);
            this.initBusinessSystemTierFormArray(tierSaveBody.businessSystemTierDTOList);
            this.initBusinessSystemTierDiscountCategoriesFormArray(tierSaveBody.businessSystemTierDiscountProductGroupDTOList);

            this.businessSystemOptions = businessSystemNamebookList.map(n => { return { label: n.displayName, value: n.id }});

            this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
        });
    }

    //#region Tier

    initTierFormArray(tierList: Tier[]){
        this.tierFormArray = this.initFormArray(this.formGroup, tierList, this.tierModel, this.tierDTOListSaveBodyName, this.tierTranslationKey, false);
        this.tierCrudMenu = this.getCrudMenuForOrderedData(this.tierFormArray, new Tier({id: 0}), this.tierLastIndexClicked);
        // this.tierFormArray.validator = this.validatorService.isFormArrayEmpty(this.tierFormArray); // FT: When deleting every tier, we should let it be empty
    }

    addNewTier(index: number){
        this.addNewFormGroupToFormArray(this.tierFormArray, new Tier({id: 0}), index);
    }

    //#endregion

    //#region BusinessSystemTier

    initBusinessSystemTierFormArray(businessSystemTierList: BusinessSystemTier[]){
        // this.assignBusinessSystemTierListIndexes(businessSystemTierList);
        this.businessSystemTierFormArray = this.initFormArray(
            this.formGroup, businessSystemTierList, this.businessSystemTierModel, this.businessSystemTierDTOListSaveBodyName, this.businessSystemTierTranslationKey
        );
        this.businessSystemTierCrudMenu = this.getCrudMenuForOrderedData(
            this.businessSystemTierFormArray, 
            new BusinessSystemTier({id: 0}), 
            this.businessSystemTierLastIndexClicked,
            true
        );
    }

    addNewBusinessSystemTier(tierIndex: number, formArrayIndex: number = null){
        // FT: For the Tier we are not assigning index because we are sending the ordered list from the UI and we will get the index in foreach on the backend, but here we need orderNumber so we can filter 
        this.addNewFormGroupToFormArray(this.businessSystemTierFormArray, new BusinessSystemTier({id: 0, tierClientIndex: tierIndex}), formArrayIndex);
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
            let formGroup = this.addNewFormGroupToFormArray(this.businessSystemTierDiscountProductGroupFormArray, newDiscountProductGroup, null);
            this.disableDiscount(formGroup);
        });

        const businessSystemTierDiscountProductGroupTable: SpiderDataTableComponent = this.findBusinessSystemTierDiscountProductGroupTable(tierIndex, businessSystemTierIndex);

        businessSystemTierDiscountProductGroupTable.clientLoad();
    }

    getBusinessSystemTierFormArrayGroups(tierIndex: number){
        let formGroups: SpiderFormGroup<BusinessSystemTier>[] = this.getFormArrayGroups(this.businessSystemTierFormArray);
        return formGroups.filter(x => x.controls.tierClientIndex.value === tierIndex)
    }

    getBusinessSystemTierIndexInTheFormArray(tierIndex: number, businessSystemTierIndex: number){
        const businessSystemTierList = this.businessSystemTierFormArray.getRawValue();

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
        this.businessSystemTierDiscountProductGroupFormArray = this.initFormArray(
            this.formGroup, 
            businessSystemTierDiscountCategories, 
            this.businessSystemTierDiscountProductGroupModel, 
            this.businessSystemTierDiscountProductGroupSaveBodyName, 
            this.businessSystemTierDiscountProductGroupTranslationKey,
            false
        );

        this.businessSystemTierDiscountProductGroupFormArray.controls.forEach(control => {
            let formGroup = control as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>;

            this.disableDiscount(formGroup);
        });
        
        this.alreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem = businessSystemTierDiscountCategories.filter(x => x.selectedForBusinessSystem).map(x => x.id);
    }

    getAlreadySelectedBusinessSystemTierDiscountProductGroupIdsForBusinessSystem = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes): number[] => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForBusinessSystem).map(x => x.id);
    }

    getAlreadySelectedDiscountProductGroupListForBusinessSystem = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex && x.selectedForBusinessSystem);
    }

    disableDiscount = (formGroup: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>) => {
        if (formGroup.controls.selectedForBusinessSystem.getRawValue() !== true) {
            formGroup.controls.discount.disable();
        }
    }

    getDiscountProductGroupFormArrayItems = (additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.businessSystemTierDiscountProductGroupFormArray.value.filter(x => x.businessSystemTierClientIndex === additionalIndexes.businessSystemTierIndex && x.tierClientIndex === additionalIndexes.tierIndex);
    }

    allSelected(event: AllClickEvent){
        const additionalIndexes = event.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;

        const discountFormControls = this.getFormArrayControls<BusinessSystemTierDiscountProductGroup>('discount', this.businessSystemTierDiscountProductGroupFormArray, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControls = this.getFormArrayControls<BusinessSystemTierDiscountProductGroup>('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
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

        const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.enable();
        selectedFormControl.setValue(true);
    }

    rowUnselect(event: RowClickEvent){
        const additionalIndexes = event.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes;

        const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        const selectedFormControl = this.getFormArrayControlByIndex('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray, event.index, (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
            return formGroups.filter(x => x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex && x.controls.tierClientIndex.value === additionalIndexes.tierIndex);
        });

        discountFormControl.disable();
        selectedFormControl.setValue(false);
    }

    getDiscountProductGroupFormArrayControl = (formControlName: keyof BusinessSystemTierDiscountProductGroup & string, index: number, additionalIndexes: BusinessSystemTierDiscountProductGroupAdditionalIndexes) => {
        return this.getFormArrayControlByIndex(formControlName, this.businessSystemTierDiscountProductGroupFormArray, index, 
            (formGroups: SpiderFormGroup<BusinessSystemTierDiscountProductGroup>[]): SpiderFormGroup[] => {
                return formGroups.filter(x => x.controls.tierClientIndex.value === additionalIndexes.tierIndex && x.controls.businessSystemTierClientIndex.value === additionalIndexes.businessSystemTierIndex);
            });
    }

    getBusinessSystemTierDiscountProductGroupAdditionalIndexes(tierIndex: number, businessSystemTierIndex: number){
        return new BusinessSystemTierDiscountProductGroupAdditionalIndexes({tierIndex: tierIndex, businessSystemTierIndex: businessSystemTierIndex});
    }

    setBusinessSystemTierDiscountProductGroupAdditionalIndexes(table: SpiderDataTableComponent, tierIndex: number, businessSystemTierIndex: number){
        (table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex = tierIndex;
        (table.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex = businessSystemTierIndex;
    }

    findBusinessSystemTierDiscountProductGroupTable(tierIndex: number, businessSystemTierIndex: number){
        return this.businessSystemTierDiscountProductGroupTables.find(x => 
            (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).tierIndex === tierIndex && 
            (x.additionalIndexes as BusinessSystemTierDiscountProductGroupAdditionalIndexes).businessSystemTierIndex === businessSystemTierIndex);
    }

    //#endregion

    //#region Authorization

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$]).pipe(
            map(([currentUserPermissionCodes]) => {
                if (currentUserPermissionCodes != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner')) || 
                        (currentUserPermissionCodes.includes('InsertTier')) || 
                        (currentUserPermissionCodes.includes('UpdateTier'));
                }
            })
        );
    }

    //#endregion

    override onBeforeRemove = (formArray: SpiderFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void => {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            let businessSystemTierIndexesForRemove: number[] = [];
            let businessSystemTierDiscountProductGroupIndexesForRemove: number[] = [];

            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => {
                if (businessSystemTier.tierClientIndex == this.tierLastIndexClicked.index)
                    businessSystemTierIndexesForRemove.push(index);

                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SpiderFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex - 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == this.tierLastIndexClicked.index)
                    businessSystemTierDiscountProductGroupIndexesForRemove.push(index);

                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex - 1);
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
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex - 1);
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

    override onBeforeAddBelow = (formArray: SpiderFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void => {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => {
                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SpiderFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex <= this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex + 1);
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
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex + 1);
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

    override onBeforeAddAbove = (formArray: SpiderFormArray, modelConstructor: any, lastMenuIconIndexClicked: number): void => {
        if (modelConstructor.typeName === this.tierModel.typeName) {
            // FT: Adjusting indexes for businessSystemTierFormArray
            this.businessSystemTierFormArray.value.forEach((businessSystemTier, index) => { // FT: Adjusting businessSystemTier indexes
                if (businessSystemTier.tierClientIndex == null || businessSystemTier.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierFormArray.controls[index] as SpiderFormGroup<BusinessSystemTier>).controls.tierClientIndex.setValue(businessSystemTier.tierClientIndex + 1);
            });

            // FT: Adjusting indexes for businessSystemTierDiscountProductGroupFormArray
            this.businessSystemTierDiscountProductGroupFormArray.value.forEach((businessSystemTierDiscountProductGroup, index) => {
                if (businessSystemTierDiscountProductGroup.tierClientIndex == null || businessSystemTierDiscountProductGroup.tierClientIndex < this.tierLastIndexClicked.index)
                    return;
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.tierClientIndex.setValue(businessSystemTierDiscountProductGroup.tierClientIndex + 1);
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
                
                (this.businessSystemTierDiscountProductGroupFormArray.controls[index] as SpiderFormGroup<BusinessSystemTierDiscountProductGroup>).controls.businessSystemTierClientIndex.setValue(businessSystemTierDiscountProductGroup.businessSystemTierClientIndex + 1);
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

    override onBeforeSave = (): void => {
        let saveBody: TierSaveBody = new TierSaveBody();

        saveBody.tierDTOList = this.tierFormArray.getRawValue();
        saveBody.businessSystemTierDTOList = this.businessSystemTierFormArray.getRawValue();

        saveBody.businessSystemTierDiscountProductGroupDTOList = this.businessSystemTierDiscountProductGroupFormArray.value;

        this.saveBody = saveBody;
    }

    override onAfterSave = (): void => {
        const selectedFormControls = this.getFormArrayControls('selectedForBusinessSystem', this.businessSystemTierDiscountProductGroupFormArray);
        
        selectedFormControls.forEach((selectedFormControl, index) => {
            const discountFormControl = this.getFormArrayControlByIndex('discount', this.businessSystemTierDiscountProductGroupFormArray, index)

            if (selectedFormControl.value === false){
                discountFormControl.disable();
            }
        });
    }

    ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
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