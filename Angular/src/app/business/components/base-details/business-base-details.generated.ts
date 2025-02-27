import { ValidatorService } from 'src/app/business/services/validators/validators';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, firstValueFrom, forkJoin, map, Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { PrimengModule, SpiderControlsModule, CardSkeletonComponent, IndexCardComponent, IsAuthorizedForSaveEvent, SpiderDataTableComponent, SpiderFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderFormGroup, SpiderButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderFileSelectEvent, getPrimengDropdownNamebookOptions, PrimengOption, SpiderFormControl, getPrimengAutocompleteNamebookOptions } from '@playerty/spider';
import { AutomaticUpdatePoints, Brand, BusinessSystemTierDiscountProductGroup, BusinessSystemTier, ExcelUpdatePoints, ExternalDiscountProductGroup, ExternalTransaction, ManualUpdatePoints, Notification, NotificationSaveBody, PartnerNotificationSaveBody, PartnerUserSaveBody, Product, SegmentationItem, TierSaveBody, BusinessSystem, BusinessSystemUpdatePointsScheduledTask, DiscountProductGroup, Gender, Partner, PartnerNotification, PartnerPermission, PartnerRole, PartnerRolePartnerPermission, PartnerUser, PartnerUserPartnerNotification, PartnerUserPartnerRole, PartnerUserSegmentation, PartnerUserSegmentationItem, Segmentation, Tier, Transaction, UserExtended, UserNotification, BusinessSystemSaveBody, BusinessSystemTierSaveBody, BusinessSystemTierDiscountProductGroupSaveBody, BusinessSystemUpdatePointsScheduledTaskSaveBody, DiscountProductGroupSaveBody, GenderSaveBody, PartnerSaveBody, PartnerPermissionSaveBody, PartnerRoleSaveBody, PartnerRolePartnerPermissionSaveBody, PartnerUserPartnerNotificationSaveBody, PartnerUserPartnerRoleSaveBody, PartnerUserSegmentationSaveBody, PartnerUserSegmentationItemSaveBody, SegmentationSaveBody, SegmentationItemSaveBody, TransactionSaveBody, UserExtendedSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'business-system-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForBusinessSystem" class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showGetTransactionsEndpointForBusinessSystem" class="col-12 md:col-6">
                        <spider-textbox [control]="control('getTransactionsEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showGetDiscountProductGroupsEndpointForBusinessSystem" class="col-12 md:col-6">
                        <spider-textbox [control]="control('getDiscountProductGroupsEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showCreateUserEndpointForBusinessSystem" class="col-12 md:col-6">
                        <spider-textbox [control]="control('createUserEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showUpdateUserGroupEndpointForBusinessSystem" class="col-12 md:col-6">
                        <spider-textbox [control]="control('updateUserGroupEndpoint', businessSystemFormGroup)"></spider-textbox>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    businessSystemSaveBodyName: string = nameof<BusinessSystemSaveBody>('businessSystemDTO');









    @Input() showNameForBusinessSystem: boolean = true;
    @Input() showGetTransactionsEndpointForBusinessSystem: boolean = true;
    @Input() showGetDiscountProductGroupsEndpointForBusinessSystem: boolean = true;
    @Input() showCreateUserEndpointForBusinessSystem: boolean = true;
    @Input() showUpdateUserGroupEndpointForBusinessSystem: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                    mainUIFormDTO: this.apiService.getBusinessSystemMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initBusinessSystemFormGroup(new BusinessSystem(mainUIFormDTO.businessSystemDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initBusinessSystemFormGroup(new BusinessSystem({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onBusinessSystemFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) || 

                        (currentUserPermissionCodes.includes('InsertBusinessSystem') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateBusinessSystem') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.businessSystemFormGroup.controls.name.enable();
                        this.businessSystemFormGroup.controls.getTransactionsEndpoint.enable();
                        this.businessSystemFormGroup.controls.getDiscountProductGroupsEndpoint.enable();
                        this.businessSystemFormGroup.controls.createUserEndpoint.enable();
                        this.businessSystemFormGroup.controls.updateUserGroupEndpoint.enable();

                    }
                    else{
                        this.businessSystemFormGroup.controls.name.disable();
                        this.businessSystemFormGroup.controls.getTransactionsEndpoint.disable();
                        this.businessSystemFormGroup.controls.getDiscountProductGroupsEndpoint.disable();
                        this.businessSystemFormGroup.controls.createUserEndpoint.disable();
                        this.businessSystemFormGroup.controls.updateUserGroupEndpoint.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showTitleForNotification" class="col-12">
                        <spider-textbox [control]="control('title', notificationFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showDescriptionForNotification" class="col-12">
                        <spider-textarea [control]="control('description', notificationFormGroup)"></spider-textarea>
                    </div>
                    <div *ngIf="showEmailBodyForNotification" class="col-12">
                        <spider-editor [control]="control('emailBody', notificationFormGroup)"></spider-editor>
                    </div>
                    <div *ngIf="showRecipientsForNotification" class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('RecipientsForNotification')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            [readonly]="!isAuthorizedForSave"
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spider-data-table>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<UserExtended>[];
    getRecipientsTableDataObservableMethodForNotification = this.apiService.getRecipientsTableDataForNotification;
    exportRecipientsTableDataToExcelObservableMethodForNotification = this.apiService.exportRecipientsTableDataToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: TableFilter;

    @Input() showTitleForNotification: boolean = true;
    @Input() showDescriptionForNotification: boolean = true;
    @Input() showEmailBodyForNotification: boolean = true;
    @Input() showRecipientsForNotification: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                    mainUIFormDTO: this.apiService.getNotificationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initNotificationFormGroup(new Notification(mainUIFormDTO.notificationDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onNotificationFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertNotification') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateNotification') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.notificationFormGroup.controls.title.enable();
                        this.notificationFormGroup.controls.description.enable();
                        this.notificationFormGroup.controls.emailBody.enable();

                    }
                    else{
                        this.notificationFormGroup.controls.title.disable();
                        this.notificationFormGroup.controls.description.disable();
                        this.notificationFormGroup.controls.emailBody.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'partner-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showLogoImageForPartner" class="col-12">
                        <spider-file [control]="control('logoImage', partnerFormGroup)" [fileData]="partnerFormGroup.controls.logoImageData.getRawValue()" [objectId]="partnerFormGroup.controls.id.getRawValue()" (onFileSelected)="uploadLogoImageForPartner($event)" [disabled]="!isAuthorizedForSave"></spider-file>
                    </div>
                    <div *ngIf="showNameForPartner" class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showEmailForPartner" class="col-12 md:col-6">
                        <spider-textbox [control]="control('email', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showSlugForPartner" class="col-12 md:col-6">
                        <spider-textbox [control]="control('slug', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showPrimaryColorForPartner" class="col-12 md:col-6">
                        <spider-colorpick [control]="control('primaryColor', partnerFormGroup)"></spider-colorpick>
                    </div>
                    <div *ngIf="showProductsRecommendationEndpointForPartner" class="col-12 md:col-6">
                        <spider-textbox [control]="control('productsRecommendationEndpoint', partnerFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showPointsMultiplierForPartner" class="col-12 md:col-6">
                        <spider-number [control]="control('pointsMultiplier', partnerFormGroup)" [decimal]="true" [maxFractionDigits]=" 2"></spider-number>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    partnerSaveBodyName: string = nameof<PartnerSaveBody>('partnerDTO');









    @Input() showLogoImageForPartner: boolean = true;
    @Input() showNameForPartner: boolean = true;
    @Input() showEmailForPartner: boolean = true;
    @Input() showSlugForPartner: boolean = true;
    @Input() showPrimaryColorForPartner: boolean = true;
    @Input() showProductsRecommendationEndpointForPartner: boolean = true;
    @Input() showPointsMultiplierForPartner: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                    mainUIFormDTO: this.apiService.getPartnerMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initPartnerFormGroup(new Partner(mainUIFormDTO.partnerDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initPartnerFormGroup(new Partner({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onPartnerFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertPartner') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.partnerFormGroup.controls.logoImage.enable();
                        this.partnerFormGroup.controls.name.enable();
                        this.partnerFormGroup.controls.email.enable();
                        this.partnerFormGroup.controls.slug.enable();
                        this.partnerFormGroup.controls.primaryColor.enable();
                        this.partnerFormGroup.controls.productsRecommendationEndpoint.enable();
                        this.partnerFormGroup.controls.pointsMultiplier.enable();

                    }
                    else{
                        this.partnerFormGroup.controls.logoImage.disable();
                        this.partnerFormGroup.controls.name.disable();
                        this.partnerFormGroup.controls.email.disable();
                        this.partnerFormGroup.controls.slug.disable();
                        this.partnerFormGroup.controls.primaryColor.disable();
                        this.partnerFormGroup.controls.productsRecommendationEndpoint.disable();
                        this.partnerFormGroup.controls.pointsMultiplier.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'partner-notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showTitleForPartnerNotification" class="col-12">
                        <spider-textbox [control]="control('title', partnerNotificationFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showDescriptionForPartnerNotification" class="col-12">
                        <spider-textarea [control]="control('description', partnerNotificationFormGroup)"></spider-textarea>
                    </div>
                    <div *ngIf="showEmailBodyForPartnerNotification" class="col-12">
                        <spider-editor [control]="control('emailBody', partnerNotificationFormGroup)"></spider-editor>
                    </div>
                    <div *ngIf="showRecipientsForPartnerNotification" class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('RecipientsForPartnerNotification')" 
                            [cols]="recipientsTableColsForPartnerNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForPartnerNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForPartnerNotification"
                            [showAddButton]="false" 
                            [readonly]="!isAuthorizedForSave"
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForPartnerNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForPartnerNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForPartnerNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForPartnerNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForPartnerNotification($event)"></spider-data-table>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    partnerNotificationSaveBodyName: string = nameof<PartnerNotificationSaveBody>('partnerNotificationDTO');







    recipientsTableColsForPartnerNotification: Column<PartnerUser>[];
    getRecipientsTableDataObservableMethodForPartnerNotification = this.apiService.getRecipientsTableDataForPartnerNotification;
    exportRecipientsTableDataToExcelObservableMethodForPartnerNotification = this.apiService.exportRecipientsTableDataToExcelForPartnerNotification;
    newlySelectedRecipientsIdsForPartnerNotification: number[] = [];
    unselectedRecipientsIdsForPartnerNotification: number[] = [];
    areAllRecipientsSelectedForPartnerNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForPartnerNotification: TableFilter;

    @Input() showTitleForPartnerNotification: boolean = true;
    @Input() showDescriptionForPartnerNotification: boolean = true;
    @Input() showEmailBodyForPartnerNotification: boolean = true;
    @Input() showRecipientsForPartnerNotification: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName' , filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(getPrimengDropdownNamebookOptions(this.apiService.getTierDropdownListForPartnerUser)) },
                {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated' , dropdownOrMultiselectValues: await firstValueFrom(getPrimengDropdownNamebookOptions(this.apiService.getCheckedSegmentationItemsDropdownListForPartnerUser)) },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getPartnerNotificationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initPartnerNotificationFormGroup(new PartnerNotification(mainUIFormDTO.partnerNotificationDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initPartnerNotificationFormGroup(new PartnerNotification({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onPartnerNotificationFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) || 

                        (currentUserPermissionCodes.includes('InsertPartnerNotification') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartnerNotification') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.partnerNotificationFormGroup.controls.title.enable();
                        this.partnerNotificationFormGroup.controls.description.enable();
                        this.partnerNotificationFormGroup.controls.emailBody.enable();

                    }
                    else{
                        this.partnerNotificationFormGroup.controls.title.disable();
                        this.partnerNotificationFormGroup.controls.description.disable();
                        this.partnerNotificationFormGroup.controls.emailBody.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'partner-role-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForPartnerRole" class="col-12">
                        <spider-textbox [control]="control('name', partnerRoleFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showPartnerUsersForPartnerRole" class="col-12">
                        <spider-multiautocomplete [control]="selectedPartnerUsersForPartnerRole" [options]="partnerUsersOptionsForPartnerRole" (onTextInput)="searchPartnerUsersForPartnerRole($event)" [label]="t('PartnerUsers')"></spider-multiautocomplete>
                    </div>
                    <div *ngIf="showPartnerPermissionsForPartnerRole" class="col-12">
                        <spider-multiselect [control]="selectedPartnerPermissionsForPartnerRole" [options]="partnerPermissionsOptionsForPartnerRole" [label]="t('PartnerPermissions')"></spider-multiselect>
                    </div>
                    <div *ngIf="showDescriptionForPartnerRole" class="col-12">
                        <spider-textarea [control]="control('description', partnerRoleFormGroup)"></spider-textarea>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    partnerRoleSaveBodyName: string = nameof<PartnerRoleSaveBody>('partnerRoleDTO');



    partnerUsersOptionsForPartnerRole: PrimengOption[];
    partnerPermissionsOptionsForPartnerRole: PrimengOption[];

    selectedPartnerUsersForPartnerRole = new SpiderFormControl<PrimengOption[]>(null, {updateOn: 'change'});
    selectedPartnerPermissionsForPartnerRole = new SpiderFormControl<number[]>(null, {updateOn: 'change'});



    @Input() showNameForPartnerRole: boolean = true;
    @Input() showPartnerUsersForPartnerRole: boolean = true;
    @Input() showPartnerPermissionsForPartnerRole: boolean = true;
    @Input() showDescriptionForPartnerRole: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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

            getPrimengDropdownNamebookOptions(this.apiService.getPartnerPermissionsDropdownListForPartnerRole, this.modelId).subscribe(po => {
                this.partnerPermissionsOptionsForPartnerRole = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getPartnerRoleMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initPartnerRoleFormGroup(new PartnerRole(mainUIFormDTO.partnerRoleDTO));

                    this.selectedPartnerPermissionsForPartnerRole.setValue(
                        mainUIFormDTO.partnerPermissionsNamebookDTOList.map(n => { return n.id })
                    );
                    this.selectedPartnerUsersForPartnerRole.setValue(
                        mainUIFormDTO.partnerUsersNamebookDTOList.map(n => ({ label: n.displayName, value: n.id }))
                    );
                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initPartnerRoleFormGroup(new PartnerRole({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onPartnerRoleFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) || 

                        (currentUserPermissionCodes.includes('InsertPartnerRole') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartnerRole') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.partnerRoleFormGroup.controls.name.enable();
                        this.selectedPartnerUsersForPartnerRole.enable();
                        this.selectedPartnerPermissionsForPartnerRole.enable();
                        this.partnerRoleFormGroup.controls.description.enable();

                    }
                    else{
                        this.partnerRoleFormGroup.controls.name.disable();
                        this.selectedPartnerUsersForPartnerRole.disable();
                        this.selectedPartnerPermissionsForPartnerRole.disable();
                        this.partnerRoleFormGroup.controls.description.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }







    searchPartnerUsersForPartnerRole(event: AutoCompleteCompleteEvent) {
        getPrimengAutocompleteNamebookOptions(this.apiService.getPartnerUsersAutocompleteListForPartnerRole, 50, event?.query ?? '').subscribe(po => {
            this.partnerUsersOptionsForPartnerRole = po;
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'partner-user-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showPointsForPartnerUser" class="col-12">
                        <spider-number [control]="control('points', partnerUserFormGroup)"></spider-number>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
export class PartnerUserBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onPartnerUserFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() partnerUserFormGroup: SpiderFormGroup<PartnerUser>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    partnerUserSaveBodyName: string = nameof<PartnerUserSaveBody>('partnerUserDTO');









    @Input() showPointsForPartnerUser: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PartnerUserSaveBody();
            saveBody.partnerUserDTO = this.partnerUserFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePartnerUser;
        this.formGroup.mainDTOName = this.partnerUserSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getPartnerUserMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initPartnerUserFormGroup(new PartnerUser(mainUIFormDTO.partnerUserDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initPartnerUserFormGroup(new PartnerUser({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initPartnerUserFormGroup(partnerUser: PartnerUser) {
        this.baseFormService.initFormGroup<PartnerUser>(
            this.partnerUserFormGroup, 
            this.formGroup, 
            partnerUser, 
            this.partnerUserSaveBodyName,
            []
        );
        this.partnerUserFormGroup.mainDTOName = this.partnerUserSaveBodyName;

        this.onPartnerUserFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) || 

                        (currentUserPermissionCodes.includes('InsertPartnerUser') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartnerUser') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.partnerUserFormGroup.controls.points.enable();

                    }
                    else{
                        this.partnerUserFormGroup.controls.points.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'segmentation-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForSegmentation" class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', segmentationFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showPointsForTheFirstTimeFillForSegmentation" class="col-12 md:col-6">
                        <spider-number [control]="control('pointsForTheFirstTimeFill', segmentationFormGroup)"></spider-number>
                    </div>
                    <div *ngIf="showDescriptionForSegmentation" class="col-12">
                        <spider-textarea [control]="control('description', segmentationFormGroup)"></spider-textarea>
                    </div>
                     <div *ngIf="showSegmentationItemsForSegmentation" class="col-12">
                        <spider-panel>
                            <panel-header [title]="t('SegmentationItems')" icon="pi pi-list"></panel-header>
                            <panel-body [normalBottomPadding]="true">
                                @for (segmentationItemFormGroup of getFormArrayGroups(segmentationItemsFormArray); track segmentationItemFormGroup; let index = $index; let last = $last) {
                                    <index-card 
                                    [index]="index" 
                                    [last]="false" 
                                    [crudMenu]="segmentationItemsCrudMenu" 
                                    [showCrudMenu]="isAuthorizedForSave"
                                    (onMenuIconClick)="segmentationItemsLastIndexClicked.index = $event"
                                    >
                                        <form [formGroup]="segmentationItemFormGroup" class="grid">
                    <div  class="col-12">
                        <spider-textbox [control]="control('name', segmentationItemFormGroup)"></spider-textbox>
                    </div>
                                        </form>
                                    </index-card>
                                }

                                <div class="panel-add-button">
                                    <spider-button [disabled]="!isAuthorizedForSave" (onClick)="addNewItemToSegmentationItems(null)" [label]="t('AddNewSegmentationItem')" icon="pi pi-plus"></spider-button>
                                </div>

                            </panel-body>
                        </spider-panel>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    segmentationSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationDTO');

    segmentationItemsModel = new SegmentationItem();
    segmentationItemsSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationItemsDTO');
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;
    segmentationItemsLastIndexClicked = new LastMenuIconIndexClicked();
    segmentationItemsCrudMenu: MenuItem[] = [];







    @Input() showNameForSegmentation: boolean = true;
    @Input() showPointsForTheFirstTimeFillForSegmentation: boolean = true;
    @Input() showDescriptionForSegmentation: boolean = true;
    @Input() showSegmentationItemsForSegmentation: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                    mainUIFormDTO: this.apiService.getSegmentationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initSegmentationFormGroup(new Segmentation(mainUIFormDTO.segmentationDTO));
                    this.initSegmentationItemsFormArray(mainUIFormDTO.orderedSegmentationItemsDTO);


                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initSegmentationFormGroup(new Segmentation({id: 0}));
                this.initSegmentationItemsFormArray([]);
                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onSegmentationFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePartner') && this.modelId > 0) || 

                        (currentUserPermissionCodes.includes('InsertSegmentation') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateSegmentation') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.segmentationFormGroup.controls.name.enable();
                        this.segmentationFormGroup.controls.pointsForTheFirstTimeFill.enable();
                        this.segmentationFormGroup.controls.description.enable();
                        this.baseFormService.enableAllFormControls(this.segmentationItemsFormArray);

                    }
                    else{
                        this.segmentationFormGroup.controls.name.disable();
                        this.segmentationFormGroup.controls.pointsForTheFirstTimeFill.disable();
                        this.segmentationFormGroup.controls.description.disable();
                        this.baseFormService.disableAllFormControls(this.segmentationItemsFormArray);

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'tier-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForTier" class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', tierFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showDescriptionForTier" class="col-12 md:col-6">
                        <spider-textbox [control]="control('description', tierFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showValidFromForTier" class="col-12 md:col-6">
                        <spider-number [control]="control('validFrom', tierFormGroup)"></spider-number>
                    </div>
                    <div *ngIf="showValidToForTier" class="col-12 md:col-6">
                        <spider-number [control]="control('validTo', tierFormGroup)"></spider-number>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    tierSaveBodyName: string = nameof<TierSaveBody>('tierDTO');









    @Input() showNameForTier: boolean = true;
    @Input() showDescriptionForTier: boolean = true;
    @Input() showValidFromForTier: boolean = true;
    @Input() showValidToForTier: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
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
                    mainUIFormDTO: this.apiService.getTierMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initTierFormGroup(new Tier(mainUIFormDTO.tierDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initTierFormGroup(new Tier({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onTierFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertTier') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateTier') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.tierFormGroup.controls.name.enable();
                        this.tierFormGroup.controls.description.enable();
                        this.tierFormGroup.controls.validFrom.enable();
                        this.tierFormGroup.controls.validTo.enable();

                    }
                    else{
                        this.tierFormGroup.controls.name.disable();
                        this.tierFormGroup.controls.description.disable();
                        this.tierFormGroup.controls.validFrom.disable();
                        this.tierFormGroup.controls.validTo.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'user-extended-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showHasLoggedInWithExternalProviderForUserExtended" class="col-12 md:col-6">
                        <spider-checkbox [control]="control('hasLoggedInWithExternalProvider', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                    <div *ngIf="showIsDisabledForUserExtended" class="col-12 md:col-6">
                        <spider-checkbox [control]="control('isDisabled', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                    <div *ngIf="showBirthDateForUserExtended" class="col-12 md:col-6">
                        <spider-calendar [control]="control('birthDate', userExtendedFormGroup)"></spider-calendar>
                    </div>
                    <div *ngIf="showGenderForUserExtended" class="col-12 md:col-6">
                        <spider-dropdown [control]="control('genderId', userExtendedFormGroup)" [options]="genderOptionsForUserExtended"></spider-dropdown>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
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
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    currentUserPermissionCodes: string[] = [];

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');



    genderOptionsForUserExtended: PrimengOption[];





    @Input() showHasLoggedInWithExternalProviderForUserExtended: boolean = true;
    @Input() showIsDisabledForUserExtended: boolean = true;
    @Input() showBirthDateForUserExtended: boolean = true;
    @Input() showGenderForUserExtended: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new UserExtendedSaveBody();
            saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUserExtended;
        this.formGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengDropdownNamebookOptions(this.apiService.getGenderDropdownListForUserExtended, this.modelId).subscribe(po => {
                this.genderOptionsForUserExtended = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getUserExtendedMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initUserExtendedFormGroup(new UserExtended(mainUIFormDTO.userExtendedDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
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

        this.onUserExtendedFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertUserExtended') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateUserExtended') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.enable();
                        this.userExtendedFormGroup.controls.isDisabled.enable();
                        this.userExtendedFormGroup.controls.birthDate.enable();
                        this.userExtendedFormGroup.controls.genderId.enable();

                    }
                    else{
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.disable();
                        this.userExtendedFormGroup.controls.isDisabled.disable();
                        this.userExtendedFormGroup.controls.birthDate.disable();
                        this.userExtendedFormGroup.controls.genderId.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
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

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}
