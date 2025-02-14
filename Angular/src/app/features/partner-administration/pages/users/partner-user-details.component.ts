import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, forkJoin, lastValueFrom } from 'rxjs';
import { UserProgressbarComponent } from 'src/app/business/components/user-progressbar/user-progressbar.component';
import { PartnerUser, PartnerUserSaveBody, Segmentation, SegmentationItem, Tier, UserExtended } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, PrimengOption, SpiderFormGroup, SpiderFormArray, SpiderMessageService, BaseFormService, nameof } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';

@Component({
    selector: 'partner-user-details',
    templateUrl: './partner-user-details.component.html',
    styles: [],
})
export class PartnerUserDetailsComponent extends BaseFormCopy implements OnInit {
    partnerUserFormGroup = new SpiderFormGroup<PartnerUser>({});
    partnerUserTier: Tier;

    segmentations: Segmentation[] = [];
    segmentationItems: SegmentationItem[] = [];

    segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;
    segmentationItemsFormArrayIdentifier: string = crypto.randomUUID(); // FT: Because we are not changing it, we are not using nameof, it's important that it's not the same as property in save body
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemModel: SegmentationItem = new SegmentationItem();

    firstTimeFillText: string = this.translocoService.translate('FirstTimeFieldFillTooltipText');

    alreadyFilledSegmentationIdsForThePartnerUser: number[] = [];

    @ViewChild('userProgressbar') userProgressbar: UserProgressbarComponent;

    isAuthorizedForSave: boolean = false;
    currentPartnerUser: PartnerUser;

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
        private authService: AuthService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
        this.authService.currentPartnerUser$.subscribe(currentPartnerUser => this.currentPartnerUser = currentPartnerUser);
    }


    override ngOnInit() {
        
    }

    partnerUserFormGroupInitFinish = () => {
        if (this.partnerUserFormGroup.getRawValue()?.tierId) {
            this.setTier(this.partnerUserFormGroup.getRawValue().id);
        }

        forkJoin({
            segmentations: this.apiService.getSegmentationListForTheCurrentPartner(),
            segmentationItems: this.apiService.getSegmentationItemListForTheCurrentPartner(),
        })
        .subscribe(({ 
            segmentations,
            segmentationItems, 
        }) => {
            this.segmentations = segmentations;
            this.segmentationItemsFormArray = this.initFormArray(this.formGroup, segmentationItems, this.segmentationItemModel, this.segmentationItemsFormArrayIdentifier, this.segmentationItemsTranslationKey);
            this.apiService.getCheckedSegmentationItemIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue().id).subscribe(ids => {
                this.segmentationItemsFormArray.controls.forEach((formGroup: FormGroup) => {
                    formGroup.controls['checked'].setValue(ids.includes(formGroup.controls['id'].value));
                });

                this.loading = false;
            });
        });

        this.setAlreadyFilledSegmentationIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue());
    }

    isAuthorizedForSaveMethod = async () => {
        const currentPartnerUser = await firstValueFrom(this.authService.currentPartnerUser$);
        return this.partnerUserFormGroup.getRawValue().id === currentPartnerUser.id;
    }

    // TODO FT: Return this inside save result also
    setAlreadyFilledSegmentationIdsForThePartnerUser(partnerUser: PartnerUser){
        this.apiService.getAlreadyFilledSegmentationIdsForThePartnerUser(partnerUser.id).subscribe(ids => {
            this.alreadyFilledSegmentationIdsForThePartnerUser = ids;
        });
    }

    showSegmentationFirstTimeFillIcon(segmentation: Segmentation){
        if (this.alreadyFilledSegmentationIdsForThePartnerUser.includes(segmentation.id)) {
            return false;
        }

        return true;
    }

    override onBeforeSave = (): void => {
        let saveBody: PartnerUserSaveBody = new PartnerUserSaveBody();

        saveBody.partnerUserDTO = this.partnerUserFormGroup.getRawValue();

        saveBody.selectedSegmentationItemsIds = this.segmentationItemsFormArray.value.filter(x => x.checked).map(x => x.id);

        this.saveBody = saveBody;
        return;
    }

    override onAfterSave = async () => {
        this.setAlreadyFilledSegmentationIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue());
        
        if ((await firstValueFrom(this.authService.currentPartnerUser$)).id == this.partnerUserFormGroup.getRawValue().id) {
            await firstValueFrom(this.authService.setCurrentPartnerUser());
        }

        if (this.partnerUserFormGroup.getRawValue()?.tierId) {
            this.setTier(this.partnerUserFormGroup.getRawValue().id)
        }else{
            this.partnerUserTier = null;
        }
    }

    async setTier(partnerUserId: number){
        this.apiService.getTierForPartnerUser(partnerUserId).subscribe(partnerUserTier => {
            this.partnerUserTier = partnerUserTier;
        });
    }
}
