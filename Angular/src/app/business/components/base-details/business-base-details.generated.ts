import { ValidatorService } from 'src/app/business/services/validators/validators';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { PrimengModule, SpiderControlsModule, CardSkeletonComponent, IndexCardComponent, SpiderDataTableComponent, SpiderFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderFormGroup, SpiderButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderFileSelectEvent, getPrimengNamebookListForDropdown, PrimengOption, SpiderFormControl, getPrimengNamebookListForAutocomplete } from '@playerty/spider';
import { Brand, BusinessSystemTierDiscountProductGroup, BusinessSystemTier, BusinessSystemUpdatePointsDataBody, ExcelManualUpdatePoints, ExternalDiscountProductGroup, ExternalTransaction, Notification, NotificationSaveBody, PartnerNotificationSaveBody, PartnerUserSaveBody, Product, SegmentationItem, TierSaveBody, UpdatePoints, BusinessSystem, BusinessSystemUpdatePointsScheduledTask, DiscountProductGroup, Gender, Partner, PartnerNotification, PartnerPermission, PartnerRole, PartnerRolePartnerPermission, PartnerUser, PartnerUserPartnerNotification, PartnerUserPartnerRole, PartnerUserSegmentation, PartnerUserSegmentationItem, Segmentation, Tier, Transaction, UserExtended, UserNotification, BusinessSystemSaveBody, BusinessSystemTierSaveBody, BusinessSystemTierDiscountProductGroupSaveBody, BusinessSystemUpdatePointsScheduledTaskSaveBody, DiscountProductGroupSaveBody, GenderSaveBody, PartnerSaveBody, PartnerPermissionSaveBody, PartnerRoleSaveBody, PartnerRolePartnerPermissionSaveBody, PartnerUserPartnerNotificationSaveBody, PartnerUserPartnerRoleSaveBody, PartnerUserSegmentationSaveBody, PartnerUserSegmentationItemSaveBody, SegmentationSaveBody, SegmentationItemSaveBody, TransactionSaveBody, UserExtendedSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'business-system-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('getTransactionsEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('getDiscountProductGroupsEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('createUserEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('updateUserGroupEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class BusinessSystemBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onBusinessSystemFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() businessSystemFormGroup: SpiderFormGroup<BusinessSystem>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    businessSystemSaveBodyName: string = nameof<BusinessSystemSaveBody>('businessSystemDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new BusinessSystemSaveBody();
            saveBody.businessSystemDTO = this.businessSystemFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveBusinessSystem;
        this.formGroup.mainDTOName = this.businessSystemSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    businessSystem: this.apiService.getBusinessSystem(this.modelId),


                })
                .subscribe(({ businessSystem }) => {
                    this.initBusinessSystemFormGroup(new BusinessSystem(businessSystem));



                });
            }
            else{
                this.initBusinessSystemFormGroup(new BusinessSystem({id: 0}));

            }
        });
    }

    initBusinessSystemFormGroup(businessSystem: BusinessSystem) {
        this.baseFormService.initFormGroup<BusinessSystem>(
            this.businessSystemFormGroup, 
            this.formGroup, 
            businessSystem, 
            this.businessSystemSaveBodyName,
            []
        );
        this.businessSystemFormGroup.mainDTOName = this.businessSystemSaveBodyName;
        this.loading = false;
        this.onBusinessSystemFormGroupInitFinish.next();
    }











    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('title', notificationFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', notificationFormGroup)"></spider-textarea>
                    </div>
                    <div class="col-12">
                        <spider-editor [control]="control('emailBody', notificationFormGroup)"></spider-editor>
                    </div>
                    <div class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('RecipientsForNotification')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spider-data-table>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class NotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onNotificationFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() notificationFormGroup: SpiderFormGroup<Notification>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<UserExtended>[];
    getRecipientsTableDataObservableMethodForNotification = this.apiService.getRecipientsTableDataForNotification;
    exportRecipientsTableDataToExcelObservableMethodForNotification = this.apiService.exportRecipientsTableDataToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: TableFilter;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new NotificationSaveBody();
            saveBody.notificationDTO = this.notificationFormGroup.getRawValue();



            saveBody.selectedRecipientsIds = this.newlySelectedRecipientsIdsForNotification;
            saveBody.unselectedRecipientsIds = this.unselectedRecipientsIdsForNotification;
            saveBody.areAllRecipientsSelected = this.areAllRecipientsSelectedForNotification;
            saveBody.recipientsTableFilter = this.lastRecipientsLazyLoadTableFilterForNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveNotification;
        this.formGroup.mainDTOName = this.notificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.recipientsTableColsForNotification = [
                {name: this.translocoService.translate('Email'), filterType: 'text', field: 'email'  },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    notification: this.apiService.getNotification(this.modelId),


                })
                .subscribe(({ notification }) => {
                    this.initNotificationFormGroup(new Notification(notification));



                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

            }
        });
    }

    initNotificationFormGroup(notification: Notification) {
        this.baseFormService.initFormGroup<Notification>(
            this.notificationFormGroup, 
            this.formGroup, 
            notification, 
            this.notificationSaveBodyName,
            []
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;
        this.loading = false;
        this.onNotificationFormGroupInitFinish.next();
    }





    selectedRecipientsLazyLoadMethodForNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForNotification(tableFilter);
    }
    areAllRecipientsSelectedChangeForNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForNotification = event.checked;
    }
    onRecipientsLazyLoadForNotification(event: TableFilter){
        this.lastRecipientsLazyLoadTableFilterForNotification = event;
    }





    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'partner-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-file [control]="control('logoImage', partnerFormGroup)" [fileData]="partnerFormGroup.controls.logoImageData.getRawValue()" [objectId]="partnerFormGroup.controls.id.getRawValue()" (onSelectedFile)="uploadLogoImageForPartner($event)"></spider-file>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('email', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('slug', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-colorpick [control]="control('primaryColor', partnerFormGroup)"></spider-colorpick>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('productsRecommendationEndpoint', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-number [control]="control('pointsMultiplier', partnerFormGroup)" [decimal]="true" [maxFractionDigits]=" 2"></spider-number>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class PartnerBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onPartnerFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() partnerFormGroup: SpiderFormGroup<Partner>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    partnerSaveBodyName: string = nameof<PartnerSaveBody>('partnerDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PartnerSaveBody();
            saveBody.partnerDTO = this.partnerFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePartner;
        this.formGroup.mainDTOName = this.partnerSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    partner: this.apiService.getPartner(this.modelId),


                })
                .subscribe(({ partner }) => {
                    this.initPartnerFormGroup(new Partner(partner));



                });
            }
            else{
                this.initPartnerFormGroup(new Partner({id: 0}));

            }
        });
    }

    initPartnerFormGroup(partner: Partner) {
        this.baseFormService.initFormGroup<Partner>(
            this.partnerFormGroup, 
            this.formGroup, 
            partner, 
            this.partnerSaveBodyName,
            ['primaryColor']
        );
        this.partnerFormGroup.mainDTOName = this.partnerSaveBodyName;
        this.loading = false;
        this.onPartnerFormGroupInitFinish.next();
    }









    uploadLogoImageForPartner(event: SpiderFileSelectEvent){
        this.apiService.uploadLogoImageForPartner(event.formData).subscribe((completeFileName: string) => {
            this.partnerFormGroup.controls.logoImage.setValue(completeFileName);
        });
    }

    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'partner-notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('title', partnerNotificationFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', partnerNotificationFormGroup)"></spider-textarea>
                    </div>
                    <div class="col-12">
                        <spider-editor [control]="control('emailBody', partnerNotificationFormGroup)"></spider-editor>
                    </div>
                    <div class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('RecipientsForPartnerNotification')" 
                            [cols]="recipientsTableColsForPartnerNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForPartnerNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForPartnerNotification"
                            [showAddButton]="false" 
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForPartnerNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForPartnerNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForPartnerNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForPartnerNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForPartnerNotification($event)"></spider-data-table>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class PartnerNotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onPartnerNotificationFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() partnerNotificationFormGroup: SpiderFormGroup<PartnerNotification>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    partnerNotificationSaveBodyName: string = nameof<PartnerNotificationSaveBody>('partnerNotificationDTO');







    recipientsTableColsForPartnerNotification: Column<PartnerUser>[];
    getRecipientsTableDataObservableMethodForPartnerNotification = this.apiService.getRecipientsTableDataForPartnerNotification;
    exportRecipientsTableDataToExcelObservableMethodForPartnerNotification = this.apiService.exportRecipientsTableDataToExcelForPartnerNotification;
    newlySelectedRecipientsIdsForPartnerNotification: number[] = [];
    unselectedRecipientsIdsForPartnerNotification: number[] = [];
    areAllRecipientsSelectedForPartnerNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForPartnerNotification: TableFilter;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PartnerNotificationSaveBody();
            saveBody.partnerNotificationDTO = this.partnerNotificationFormGroup.getRawValue();



            saveBody.selectedRecipientsIds = this.newlySelectedRecipientsIdsForPartnerNotification;
            saveBody.unselectedRecipientsIds = this.unselectedRecipientsIdsForPartnerNotification;
            saveBody.areAllRecipientsSelected = this.areAllRecipientsSelectedForPartnerNotification;
            saveBody.recipientsTableFilter = this.lastRecipientsLazyLoadTableFilterForPartnerNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePartnerNotification;
        this.formGroup.mainDTOName = this.partnerNotificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.recipientsTableColsForPartnerNotification = [
                {name: this.translocoService.translate('User'), filterType: 'text', field: 'userDisplayName'  },
                {name: this.translocoService.translate('Points'), filterType: 'numeric', field: 'points' , showMatchModes: true },
                {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName' , filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(getPrimengNamebookListForDropdown(this.apiService.getTierListForDropdown)) },
                {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated' , dropdownOrMultiselectValues: await firstValueFrom(getPrimengNamebookListForDropdown(this.apiService.getSegmentationItemListForDropdown)) },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    partnerNotification: this.apiService.getPartnerNotification(this.modelId),


                })
                .subscribe(({ partnerNotification }) => {
                    this.initPartnerNotificationFormGroup(new PartnerNotification(partnerNotification));



                });
            }
            else{
                this.initPartnerNotificationFormGroup(new PartnerNotification({id: 0}));

            }
        });
    }

    initPartnerNotificationFormGroup(partnerNotification: PartnerNotification) {
        this.baseFormService.initFormGroup<PartnerNotification>(
            this.partnerNotificationFormGroup, 
            this.formGroup, 
            partnerNotification, 
            this.partnerNotificationSaveBodyName,
            []
        );
        this.partnerNotificationFormGroup.mainDTOName = this.partnerNotificationSaveBodyName;
        this.loading = false;
        this.onPartnerNotificationFormGroupInitFinish.next();
    }





    selectedRecipientsLazyLoadMethodForPartnerNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForPartnerNotification(tableFilter);
    }
    areAllRecipientsSelectedChangeForPartnerNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForPartnerNotification = event.checked;
    }
    onRecipientsLazyLoadForPartnerNotification(event: TableFilter){
        this.lastRecipientsLazyLoadTableFilterForPartnerNotification = event;
    }





    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'partner-role-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('name', partnerRoleFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12">
                        <spider-multiautocomplete [control]="selectedPartnerUsersForPartnerRole" [options]="partnerUsersForPartnerRoleOptions" (onTextInput)="searchPartnerUsersForPartnerRole($event)" [label]="t('PartnerUsers')"></spider-multiautocomplete>
                    </div>
                    <div class="col-12">
                        <spider-multiselect [control]="selectedPartnerPermissionsForPartnerRole" [options]="partnerPermissionsForPartnerRoleOptions" [label]="t('PartnerPermissions')"></spider-multiselect>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', partnerRoleFormGroup)"></spider-textarea>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class PartnerRoleBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onPartnerRoleFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() partnerRoleFormGroup: SpiderFormGroup<PartnerRole>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    partnerRoleSaveBodyName: string = nameof<PartnerRoleSaveBody>('partnerRoleDTO');



    partnerUsersForPartnerRoleOptions: PrimengOption[];
    partnerPermissionsForPartnerRoleOptions: PrimengOption[];

    selectedPartnerUsersForPartnerRole = new SpiderFormControl<PrimengOption[]>(null, {updateOn: 'change'});
    selectedPartnerPermissionsForPartnerRole = new SpiderFormControl<number[]>(null, {updateOn: 'change'});



    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PartnerRoleSaveBody();
            saveBody.partnerRoleDTO = this.partnerRoleFormGroup.getRawValue();

            saveBody.selectedPartnerPermissionsIds = this.selectedPartnerPermissionsForPartnerRole.getRawValue();
            saveBody.selectedPartnerUsersIds = this.selectedPartnerUsersForPartnerRole.getRawValue()?.map(n => n.value);

            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePartnerRole;
        this.formGroup.mainDTOName = this.partnerRoleSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengNamebookListForDropdown(this.apiService.getPartnerPermissionListForDropdown).subscribe(po => {
                this.partnerPermissionsForPartnerRoleOptions = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    partnerRole: this.apiService.getPartnerRole(this.modelId),

                    partnerUsersForPartnerRole: this.apiService.getPartnerUsersNamebookListForPartnerRole(this.modelId),
                    partnerPermissionsForPartnerRole: this.apiService.getPartnerPermissionsNamebookListForPartnerRole(this.modelId),
                })
                .subscribe(({ partnerRole, partnerUsersForPartnerRole, partnerPermissionsForPartnerRole }) => {
                    this.initPartnerRoleFormGroup(new PartnerRole(partnerRole));

                    this.selectedPartnerPermissionsForPartnerRole.setValue(
                        partnerPermissionsForPartnerRole.map(n => { return n.id })
                    );
                    this.selectedPartnerUsersForPartnerRole.setValue(
                        partnerUsersForPartnerRole.map(n => ({ label: n.displayName, value: n.id }))
                    );
                });
            }
            else{
                this.initPartnerRoleFormGroup(new PartnerRole({id: 0}));

            }
        });
    }

    initPartnerRoleFormGroup(partnerRole: PartnerRole) {
        this.baseFormService.initFormGroup<PartnerRole>(
            this.partnerRoleFormGroup, 
            this.formGroup, 
            partnerRole, 
            this.partnerRoleSaveBodyName,
            []
        );
        this.partnerRoleFormGroup.mainDTOName = this.partnerRoleSaveBodyName;
        this.loading = false;
        this.onPartnerRoleFormGroupInitFinish.next();
    }







    searchPartnerUsersForPartnerRole(event: AutoCompleteCompleteEvent) {
        getPrimengNamebookListForAutocomplete(this.apiService.getPartnerUserListForAutocomplete, 50, event?.query ?? '').subscribe(po => {
            this.partnerUsersForPartnerRoleOptions = po;
        });
    }



    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'segmentation-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', segmentationFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-number [control]="control('pointsForTheFirstTimeFill', segmentationFormGroup)"></spider-number>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', segmentationFormGroup)"></spider-textarea>
                    </div>
                 <div class="col-12">
                    <spider-panel>
                        <panel-header [title]="t('SegmentationItems')" icon="pi pi-list"></panel-header>
                        <panel-body [normalBottomPadding]="true">
                            @for (segmentationItemFormGroup of getFormArrayGroups(segmentationItemsFormArray); track segmentationItemFormGroup; let index = $index; let last = $last) {
                                <index-card [index]="index" [last]="false" [crudMenu]="segmentationItemsCrudMenu" (onMenuIconClick)="segmentationItemsLastIndexClicked.index = $event">
                                    <form [formGroup]="segmentationItemFormGroup" class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('name', segmentationItemFormGroup)"></spider-textbox>
                    </div>
                                    </form>
                                </index-card>
                            }

                            <div class="panel-add-button">
                                <spider-button (onClick)="addNewItemToSegmentationItems(null)" [label]="t('AddNewSegmentationItem')" icon="pi pi-plus"></spider-button>
                            </div>

                        </panel-body>
                    </spider-panel>
                </div>       
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class SegmentationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onSegmentationFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() segmentationFormGroup: SpiderFormGroup<Segmentation>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    segmentationSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationDTO');

    segmentationItemsModel: SegmentationItem = new SegmentationItem();
    segmentationItemsSaveBodyName: string = nameof<SegmentationItemSaveBody>('segmentationItemDTO');
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;
    segmentationItemsLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();
    segmentationItemsCrudMenu: MenuItem[] = [];







    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new SegmentationSaveBody();
            saveBody.segmentationDTO = this.segmentationFormGroup.getRawValue();
            saveBody.segmentationItemsDTO = this.segmentationItemsFormArray.getRawValue();



            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveSegmentation;
        this.formGroup.mainDTOName = this.segmentationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    segmentation: this.apiService.getSegmentation(this.modelId),
                    segmentationItemsForSegmentation: this.apiService.getOrderedSegmentationItemsForSegmentation(this.modelId),

                })
                .subscribe(({ segmentation, segmentationItemsForSegmentation }) => {
                    this.initSegmentationFormGroup(new Segmentation(segmentation));
                    this.initSegmentationItemsFormArray(segmentationItemsForSegmentation);


                });
            }
            else{
                this.initSegmentationFormGroup(new Segmentation({id: 0}));
                this.initSegmentationItemsFormArray([]);
            }
        });
    }

    initSegmentationFormGroup(segmentation: Segmentation) {
        this.baseFormService.initFormGroup<Segmentation>(
            this.segmentationFormGroup, 
            this.formGroup, 
            segmentation, 
            this.segmentationSaveBodyName,
            []
        );
        this.segmentationFormGroup.mainDTOName = this.segmentationSaveBodyName;
        this.loading = false;
        this.onSegmentationFormGroupInitFinish.next();
    }

    initSegmentationItemsFormArray(segmentationItems: SegmentationItem[]){
        this.segmentationItemsFormArray = this.baseFormService.initFormArray(
            this.formGroup, 
            segmentationItems, 
            this.segmentationItemsModel, 
            this.segmentationItemsSaveBodyName, 
            this.segmentationItemsTranslationKey, 
            true
        );
        this.segmentationItemsCrudMenu = this.getCrudMenuForOrderedData(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), this.segmentationItemsLastIndexClicked, false);
        this.segmentationItemsFormArray.validator = this.validatorService.isFormArrayEmpty(this.segmentationItemsFormArray);
    }

    addNewItemToSegmentationItems(index: number){ 
        this.baseFormService.addNewFormGroupToFormArray(
            this.segmentationItemsFormArray, 
            new SegmentationItem({id: 0}), 
            index
        );
    }







    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'tier-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', tierFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('description', tierFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-number [control]="control('validFrom', tierFormGroup)"></spider-number>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-number [control]="control('validTo', tierFormGroup)"></spider-number>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class TierBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onTierFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() tierFormGroup: SpiderFormGroup<Tier>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    tierSaveBodyName: string = nameof<TierSaveBody>('tierDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new TierSaveBody();
            saveBody.tierDTO = this.tierFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveTier;
        this.formGroup.mainDTOName = this.tierSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    tier: this.apiService.getTier(this.modelId),


                })
                .subscribe(({ tier }) => {
                    this.initTierFormGroup(new Tier(tier));



                });
            }
            else{
                this.initTierFormGroup(new Tier({id: 0}));

            }
        });
    }

    initTierFormGroup(tier: Tier) {
        this.baseFormService.initFormGroup<Tier>(
            this.tierFormGroup, 
            this.formGroup, 
            tier, 
            this.tierSaveBodyName,
            []
        );
        this.tierFormGroup.mainDTOName = this.tierSaveBodyName;
        this.loading = false;
        this.onTierFormGroupInitFinish.next();
    }











    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}

@Component({
    selector: 'user-extended-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('email', userExtendedFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-calendar [control]="control('birthDate', userExtendedFormGroup)"></spider-calendar>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-dropdown [control]="control('genderId', userExtendedFormGroup)" [options]="genderForUserExtendedOptions"></spider-dropdown>
                    </div>
                    <div class="col-12">
                        <spider-multiselect [control]="selectedRolesForUserExtended" [options]="rolesForUserExtendedOptions" [label]="t('Roles')"></spider-multiselect>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class UserExtendedBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onUserExtendedFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() userExtendedFormGroup: SpiderFormGroup<UserExtended>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');



    genderForUserExtendedOptions: PrimengOption[];
    rolesForUserExtendedOptions: PrimengOption[];

    selectedRolesForUserExtended = new SpiderFormControl<number[]>(null, {updateOn: 'change'});



    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new UserExtendedSaveBody();
            saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();

            saveBody.selectedRolesIds = this.selectedRolesForUserExtended.getRawValue();


            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUserExtended;
        this.formGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengNamebookListForDropdown(this.apiService.getGenderListForDropdown).subscribe(po => {
                this.genderForUserExtendedOptions = po;
            });
            getPrimengNamebookListForDropdown(this.apiService.getRoleListForDropdown).subscribe(po => {
                this.rolesForUserExtendedOptions = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    userExtended: this.apiService.getUserExtended(this.modelId),

                    rolesForUserExtended: this.apiService.getRolesNamebookListForUserExtended(this.modelId),
                })
                .subscribe(({ userExtended, rolesForUserExtended }) => {
                    this.initUserExtendedFormGroup(new UserExtended(userExtended));

                    this.selectedRolesForUserExtended.setValue(
                        rolesForUserExtended.map(n => { return n.id })
                    );

                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

            }
        });
    }

    initUserExtendedFormGroup(userExtended: UserExtended) {
        this.baseFormService.initFormGroup<UserExtended>(
            this.userExtendedFormGroup, 
            this.formGroup, 
            userExtended, 
            this.userExtendedSaveBodyName,
            []
        );
        this.userExtendedFormGroup.mainDTOName = this.userExtendedSaveBodyName;
        this.loading = false;
        this.onUserExtendedFormGroupInitFinish.next();
    }











    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}
