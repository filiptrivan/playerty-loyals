import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormService } from './../../../core/services/base-form.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { SoftFormArray, SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { getControl, nameof } from 'src/app/core/services/helper-functions';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { BaseEntity } from 'src/app/core/entities/base-entity';
import { CardSkeletonComponent } from "../../../core/components/card-skeleton/card-skeleton.component";
import { SoftButton } from 'src/app/core/entities/soft-button';
import { IndexCardComponent } from 'src/app/core/components/index-card/index-card.component';
import { LastMenuIconIndexClicked } from 'src/app/core/entities/last-menu-icon-index-clicked';
import { MenuItem } from 'primeng/api';
import { AllClickEvent, Column, SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { LazyLoadSelectedIdsResult } from 'src/app/core/entities/lazy-load-selected-ids-result';
import { Brand, BusinessSystemTierDiscountProductGroup, BusinessSystemTier, BusinessSystemUpdatePointsDataBody, ExternalDiscountProductGroup, ExternalTransaction, MergedPartnerUser, Notification, NotificationSaveBody, PartnerNotificationSaveBody, PartnerRoleSaveBody, PartnerUserSaveBody, Product, QrCode, SegmentationItem, TierSaveBody, UpdatePoints, UserExtendedSaveBody, BusinessSystem, BusinessSystemUpdatePointsScheduledTask, DiscountProductGroup, Gender, Partner, PartnerNotification, PartnerPermission, PartnerRole, PartnerRolePartnerPermission, PartnerUser, PartnerUserPartnerNotification, PartnerUserPartnerRole, PartnerUserSegmentation, PartnerUserSegmentationItem, Segmentation, Tier, Transaction, UserExtended, UserNotification, BusinessSystemSaveBody, BusinessSystemTierSaveBody, BusinessSystemTierDiscountProductGroupSaveBody, BusinessSystemUpdatePointsScheduledTaskSaveBody, DiscountProductGroupSaveBody, GenderSaveBody, PartnerSaveBody, PartnerPermissionSaveBody, PartnerRolePartnerPermissionSaveBody, PartnerUserPartnerNotificationSaveBody, PartnerUserPartnerRoleSaveBody, PartnerUserSegmentationSaveBody, PartnerUserSegmentationItemSaveBody, SegmentationSaveBody, SegmentationItemSaveBody, TransactionSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'notification-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <soft-textbox [control]="control('title', notificationFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-checkbox [control]="control('isMarkedAsRead', notificationFormGroup)"></soft-checkbox>
                    </div>
                    <div class="col-12">
                        <soft-textarea [control]="control('description', notificationFormGroup)"></soft-textarea>
                    </div>
                    <div class="col-12">
                        <soft-editor [control]="control('emailBody', notificationFormGroup)"></soft-editor>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class NotificationBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() notificationFormGroup: SoftFormGroup<Notification>;
    @Input() additionalButtons: SoftButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new NotificationSaveBody();
            saveBody.notificationDTO = this.notificationFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveNotification;
        this.formGroup.mainDTOName = this.notificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




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
            this.notificationFormGroup, this.formGroup, notification, this.notificationSaveBodyName, []
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;
        this.loading = false;
    }









    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
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
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <soft-file [control]="control('logoImage', partnerFormGroup)" [fileData]="partnerFormGroup.controls.logoImageData.getRawValue()" [objectId]="partnerFormGroup.controls.id.getRawValue()"></soft-file>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('name', partnerFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('email', partnerFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('slug', partnerFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-colorpick [control]="control('primaryColor', partnerFormGroup)"></soft-colorpick>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('productsRecommendationEndpoint', partnerFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-number [control]="control('pointsMultiplier', partnerFormGroup)" [decimal]="true" [maxFractionDigits]=" 2"></soft-number>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class PartnerBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() partnerFormGroup: SoftFormGroup<Partner>;
    @Input() additionalButtons: SoftButton[] = [];
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
            this.partnerFormGroup, this.formGroup, partner, this.partnerSaveBodyName, ['primaryColor']
        );
        this.partnerFormGroup.mainDTOName = this.partnerSaveBodyName;
        this.loading = false;
    }









    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
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
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <soft-textbox [control]="control('title', partnerNotificationFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12">
                        <soft-textarea [control]="control('description', partnerNotificationFormGroup)"></soft-textarea>
                    </div>
                    <div class="col-12">
                        <soft-editor [control]="control('emailBody', partnerNotificationFormGroup)"></soft-editor>
                    </div>
                    <div class="col-12">
                        <soft-data-table 
                            [tableTitle]="t('PartnerUsersForPartnerNotification')" 
                            [cols]="partnerUsersTableColsForPartnerNotification" 
                            [getTableDataObservableMethod]="getPartnerUsersTableDataObservableMethodForPartnerNotification" 
                            [exportTableDataToExcelObservableMethod]="exportPartnerUsersTableDataToExcelObservableMethodForPartnerNotification"
                            [showAddButton]="false" 
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedPartnerUsersIdsForPartnerNotification" 
                            [unselectedItems]="unselectedPartnerUsersIdsForPartnerNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onPartnerUsersLazyLoadForPartnerNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedPartnerUsersLazyLoadMethodForPartnerNotification" 
                            (onIsAllSelectedChange)="areAllPartnerUsersSelectedChangeForPartnerNotification($event)"></soft-data-table>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class PartnerNotificationBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() partnerNotificationFormGroup: SoftFormGroup<PartnerNotification>;
    @Input() additionalButtons: SoftButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    partnerNotificationSaveBodyName: string = nameof<PartnerNotificationSaveBody>('partnerNotificationDTO');







    partnerUsersTableColsForPartnerNotification: Column<PartnerUser>[];
    getPartnerUsersTableDataObservableMethodForPartnerNotification = this.apiService.getPartnerUsersTableDataForPartnerNotification;
    exportPartnerUsersTableDataToExcelObservableMethodForPartnerNotification = this.apiService.exportPartnerUsersTableDataToExcelForPartnerNotification;
    newlySelectedPartnerUsersIdsForPartnerNotification: number[] = [];
    unselectedPartnerUsersIdsForPartnerNotification: number[] = [];
    areAllPartnerUsersSelectedForPartnerNotification: boolean = null;
    lastPartnerUsersLazyLoadTableFilterForPartnerNotification: TableFilter;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PartnerNotificationSaveBody();
            saveBody.partnerNotificationDTO = this.partnerNotificationFormGroup.getRawValue();



            saveBody.selectedPartnerUsersIds = this.newlySelectedPartnerUsersIdsForPartnerNotification;
            saveBody.unselectedPartnerUsersIds = this.unselectedPartnerUsersIdsForPartnerNotification;
            saveBody.areAllPartnerUsersSelected = this.areAllPartnerUsersSelectedForPartnerNotification;
            saveBody.partnerUsersTableFilter = this.lastPartnerUsersLazyLoadTableFilterForPartnerNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePartnerNotification;
        this.formGroup.mainDTOName = this.partnerNotificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.partnerUsersTableColsForPartnerNotification = [
                {name: this.translocoService.translate('User'), filterType: 'text', field: 'userDisplayName'  },
                {name: this.translocoService.translate('Points'), filterType: 'numeric', field: 'points' , showMatchModes: true },
                {name: this.translocoService.translate('Tier'), filterType: 'multiselect', field: 'tierDisplayName' , filterField: 'tierId', dropdownOrMultiselectValues: await firstValueFrom(this.apiService.getPrimengNamebookListForDropdown(this.apiService.getTierListForDropdown)) },
                {name: this.translocoService.translate('Segmentation'), filterType: 'multiselect', field: 'checkedSegmentationItemsCommaSeparated' , dropdownOrMultiselectValues: await firstValueFrom(this.apiService.getPrimengNamebookListForDropdown(this.apiService.getSegmentationItemListForDropdown)) },
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
            this.partnerNotificationFormGroup, this.formGroup, partnerNotification, this.partnerNotificationSaveBodyName, []
        );
        this.partnerNotificationFormGroup.mainDTOName = this.partnerNotificationSaveBodyName;
        this.loading = false;
    }





    selectedPartnerUsersLazyLoadMethodForPartnerNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedPartnerUsersIdsForPartnerNotification(tableFilter);
    }
    areAllPartnerUsersSelectedChangeForPartnerNotification(event: AllClickEvent){
        this.areAllPartnerUsersSelectedForPartnerNotification = event.checked;
    }
    onPartnerUsersLazyLoadForPartnerNotification(event: TableFilter){
        this.lastPartnerUsersLazyLoadTableFilterForPartnerNotification = event;
    }



    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
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
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('name', partnerRoleFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('description', partnerRoleFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12">
                        <soft-multiautocomplete [control]="selectedPartnerUsersForPartnerRole" [options]="partnerUsersForPartnerRoleOptions" (onTextInput)="searchPartnerUsersForPartnerRole($event)" [label]="t('PartnerUsers')"></soft-multiautocomplete>
                    </div>
                    <div class="col-12">
                        <soft-multiselect [control]="selectedPartnerPermissionsForPartnerRole" [options]="partnerPermissionsForPartnerRoleOptions" [label]="t('PartnerPermissions')"></soft-multiselect>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class PartnerRoleBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() partnerRoleFormGroup: SoftFormGroup<PartnerRole>;
    @Input() additionalButtons: SoftButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    partnerRoleSaveBodyName: string = nameof<PartnerRoleSaveBody>('partnerRoleDTO');



    partnerUsersForPartnerRoleOptions: PrimengOption[];
    partnerPermissionsForPartnerRoleOptions: PrimengOption[];

    selectedPartnerUsersForPartnerRole = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'});
    selectedPartnerPermissionsForPartnerRole = new SoftFormControl<number[]>(null, {updateOn: 'change'});



    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
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

            this.apiService.getPrimengNamebookListForDropdown(this.apiService.getPartnerPermissionListForDropdown).subscribe(po => {
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
            this.partnerRoleFormGroup, this.formGroup, partnerRole, this.partnerRoleSaveBodyName, []
        );
        this.partnerRoleFormGroup.mainDTOName = this.partnerRoleSaveBodyName;
        this.loading = false;
    }







    searchPartnerUsersForPartnerRole(event: AutoCompleteCompleteEvent) {
        this.apiService.getPrimengNamebookListForAutocomplete(this.apiService.getPartnerUserListForAutocomplete, 50, event?.query ?? '').subscribe(po => {
            this.partnerUsersForPartnerRoleOptions = po;
        });
    }

    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
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
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('name', segmentationFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-number [control]="control('pointsForTheFirstTimeFill', segmentationFormGroup)"></soft-number>
                    </div>
                    <div class="col-12">
                        <soft-textarea [control]="control('description', segmentationFormGroup)"></soft-textarea>
                    </div>
                 <div class="col-12">
                    <soft-panel>
                        <panel-header [title]="t('SegmentationItems')" icon="pi pi-list"></panel-header>
                        <panel-body [normalBottomPadding]="true">
                            @for (segmentationItemFormGroup of getFormArrayGroups(segmentationItemsFormArray); track segmentationItemFormGroup; let index = $index; let last = $last) {
                                <index-card [index]="index" [last]="false" [crudMenu]="segmentationItemsCrudMenu" (onMenuIconClick)="segmentationItemsLastIndexClicked.index = $event">
                                    <form [formGroup]="segmentationItemFormGroup" class="grid">
                    <div class="col-12">
                        <soft-textbox [control]="control('name', segmentationItemFormGroup)"></soft-textbox>
                    </div>
                                    </form>
                                </index-card>
                            }

                            <div class="panel-add-button">
                                <p-button (onClick)="addNewItemToSegmentationItems(null)" [label]="t('AddNewSegmentationItem')" icon="pi pi-plus"></p-button>
                            </div>

                        </panel-body>
                    </soft-panel>
                </div>       
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class SegmentationBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() segmentationFormGroup: SoftFormGroup<Segmentation>;
    @Input() additionalButtons: SoftButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    modelId: number;
    loading: boolean = true;

    segmentationSaveBodyName: string = nameof<SegmentationSaveBody>('segmentationDTO');

    segmentationItemsModel: SegmentationItem = new SegmentationItem();
    segmentationItemsSaveBodyName: string = nameof<SegmentationItemSaveBody>('segmentationItemDTO');
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemsFormArray: SoftFormArray<SegmentationItem[]>;
    segmentationItemsLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();
    segmentationItemsCrudMenu: MenuItem[] = [];







    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
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
            this.segmentationFormGroup, this.formGroup, segmentation, this.segmentationSaveBodyName, []
        );
        this.segmentationFormGroup.mainDTOName = this.segmentationSaveBodyName;
        this.loading = false;
    }

    initSegmentationItemsFormArray(segmentationItems: SegmentationItem[]){
        this.segmentationItemsFormArray = this.baseFormService.initFormArray(
            this.formGroup, segmentationItems, this.segmentationItemsModel, this.segmentationItemsSaveBodyName, this.segmentationItemsTranslationKey, true
        );
        this.segmentationItemsCrudMenu = this.getCrudMenuForOrderedData(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), this.segmentationItemsLastIndexClicked, false);
        this.segmentationItemsFormArray.validator = this.validatorService.isFormArrayEmpty(this.segmentationItemsFormArray);
    }

    addNewItemToSegmentationItems(index: number){ 
        this.baseFormService.addNewFormGroupToFormArray(this.segmentationItemsFormArray, new SegmentationItem({id: 0}), index);
    }





    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
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
    <soft-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('name', tierFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-textbox [control]="control('description', tierFormGroup)"></soft-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-number [control]="control('validFrom', tierFormGroup)"></soft-number>
                    </div>
                    <div class="col-12 md:col-6">
                        <soft-number [control]="control('validTo', tierFormGroup)"></soft-number>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        PrimengModule,
        SoftControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SoftDataTableComponent,
    ]
})
export class TierBaseComponent {
    @Output() onSave = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SoftFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SoftFormGroup;
    @Input() tierFormGroup: SoftFormGroup<Tier>;
    @Input() additionalButtons: SoftButton[] = [];
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
            this.tierFormGroup, this.formGroup, tier, this.tierSaveBodyName, []
        );
        this.tierFormGroup.mainDTOName = this.tierSaveBodyName;
        this.loading = false;
    }









    control(formControlName: string, formGroup: SoftFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SoftFormArray): SoftFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

}
