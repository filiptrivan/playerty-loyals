import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { getControl } from 'src/app/core/services/helper-functions';
import { PartnerUserSaveBody, NotificationSaveBody, TierSaveBody, BusinessSystemTier, ExternalDiscountProductGroup, Product, MergedPartnerUser, Brand, UserExtendedSaveBody, ExternalTransaction, SegmentationSaveBody, SegmentationItem, PartnerRoleSaveBody, PartnerNotificationSaveBody, UpdatePoints, BusinessSystemTierDiscountProductGroup, Notification, BusinessSystemUpdatePointsDataBody, QrCode, Gender, PartnerUserSegmentation, PartnerUserPartnerNotification, DiscountProductGroup, UserExtended, UserNotification, Transaction, PartnerRole, PartnerRolePartnerPermission, PartnerUser, BusinessSystem, PartnerUserPartnerRole, PartnerNotification, BusinessSystemUpdatePointsScheduledTask, Partner, PartnerUserSegmentationItem, PartnerPermission, Tier, Segmentation } from '../../entities/business-entities.generated';

@Component({
    selector: 'partner-role-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel>
        <panel-header></panel-header>

        <panel-body>
            <form class="grid">
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('name', partnerRoleFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('description', partnerRoleFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-autocomplete [control]="control('partnerId', partnerRoleFormGroup)" [options]="partnerOptions" (onTextInput)="searchPartner($event)"></soft-autocomplete>
                </div>
            </form>
        </panel-body>

        <panel-footer>
            <p-button (onClick)="onSave()" [label]="t('Save')" icon="pi pi-save"></p-button>
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
    ]
})
export class PartnerRoleBaseComponent {
    @Input() partnerRoleFormGroup: SoftFormGroup<PartnerRole>;
    @Input() onSave: (reroute?: boolean) => void; 

    partnerOptions: PrimengOption[];

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit(){

    }

    searchPartner(event: AutoCompleteCompleteEvent) {
        this.apiService.getPrimengNamebookListForAutocomplete(this.apiService.getPartnerListForAutocomplete, 50, event.query).subscribe(po => {
            this.partnerOptions = po;
        });
    }

    control(formControlName: keyof PartnerRole, formGroup: SoftFormGroup){
        return getControl<PartnerRole>(formControlName, formGroup);
    }

}

@Component({
    selector: 'partner-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel>
        <panel-header></panel-header>

        <panel-body>
            <form class="grid">
                <div class="col-12">
                    <soft-file [control]="control('logoImage', partnerFormGroup)" [fileData]="partnerFormGroup.controls.logoImageData.getRawValue()" [objectId]="partnerFormGroup.controls.id.getRawValue()"></soft-file>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('name', partnerFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('email', partnerFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-colorpick [control]="control('primaryColor', partnerFormGroup)" ></soft-colorpick>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('productsRecommendationEndpoint', partnerFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-number [control]="control('pointsMultiplier', partnerFormGroup)" [decimal]="true" [maxFractionDigits]=" 2"></soft-number>
                </div>
                <div class="col-12">
                    <soft-textarea [control]="control('slug', partnerFormGroup)" ></soft-textarea>
                </div>
            </form>
        </panel-body>

        <panel-footer>
            <p-button (onClick)="onSave()" [label]="t('Save')" icon="pi pi-save"></p-button>
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
    ]
})
export class PartnerBaseComponent {
    @Input() partnerFormGroup: SoftFormGroup<Partner>;
    @Input() onSave: (reroute?: boolean) => void; 



    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit(){

    }



    control(formControlName: keyof Partner, formGroup: SoftFormGroup){
        return getControl<Partner>(formControlName, formGroup);
    }

}

@Component({
    selector: 'tier-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel>
        <panel-header></panel-header>

        <panel-body>
            <form class="grid">
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('name', tierFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('description', tierFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-number [control]="control('validFrom', tierFormGroup)" ></soft-number>
                </div>
                <div class="col-12 md:col-6">
                    <soft-number [control]="control('validTo', tierFormGroup)" ></soft-number>
                </div>
            </form>
        </panel-body>

        <panel-footer>
            <p-button (onClick)="onSave()" [label]="t('Save')" icon="pi pi-save"></p-button>
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
    ]
})
export class TierBaseComponent {
    @Input() tierFormGroup: SoftFormGroup<Tier>;
    @Input() onSave: (reroute?: boolean) => void; 



    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit(){

    }



    control(formControlName: keyof Tier, formGroup: SoftFormGroup){
        return getControl<Tier>(formControlName, formGroup);
    }

}

@Component({
    selector: 'segmentation-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel>
        <panel-header></panel-header>

        <panel-body>
            <form class="grid">
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('name', segmentationFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('description', segmentationFormGroup)" ></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-number [control]="control('pointsForTheFirstTimeFill', segmentationFormGroup)" ></soft-number>
                </div>
                <div class="col-12 md:col-6">
                    <soft-autocomplete [control]="control('partnerId', segmentationFormGroup)" [options]="partnerOptions" (onTextInput)="searchPartner($event)"></soft-autocomplete>
                </div>
            </form>
        </panel-body>

        <panel-footer>
            <p-button (onClick)="onSave()" [label]="t('Save')" icon="pi pi-save"></p-button>
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
    ]
})
export class SegmentationBaseComponent {
    @Input() segmentationFormGroup: SoftFormGroup<Segmentation>;
    @Input() onSave: (reroute?: boolean) => void; 

    partnerOptions: PrimengOption[];

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit(){

    }

    searchPartner(event: AutoCompleteCompleteEvent) {
        this.apiService.getPrimengNamebookListForAutocomplete(this.apiService.getPartnerListForAutocomplete, 50, event.query).subscribe(po => {
            this.partnerOptions = po;
        });
    }

    control(formControlName: keyof Segmentation, formGroup: SoftFormGroup){
        return getControl<Segmentation>(formControlName, formGroup);
    }

}
