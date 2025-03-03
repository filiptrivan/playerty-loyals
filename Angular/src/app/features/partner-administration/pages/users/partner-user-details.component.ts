import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BehaviorSubject, combineLatest, firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { UserProgressbarComponent } from 'src/app/business/components/user-progressbar/user-progressbar.component';
import { PartnerUser, PartnerUserSaveBody, Segmentation, SegmentationItem, Tier, GenderAndBirthDate } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, SpiderFormGroup, SpiderFormArray, SpiderMessageService, BaseFormService, IsAuthorizedForSaveEvent, getPrimengDropdownNamebookOptions, PrimengOption } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { BusinessPermissionCodes } from 'src/app/business/enums/business-enums.generated';

@Component({
    selector: 'partner-user-details',
    templateUrl: './partner-user-details.component.html',
    styles: [],
})
export class PartnerUserDetailsComponent extends BaseFormCopy implements OnInit {
    genderAndBirthDateFormGroup = new SpiderFormGroup<GenderAndBirthDate>({});
    genderOptions: PrimengOption[];

    partnerUserFormGroup = new SpiderFormGroup<PartnerUser>({});
    partnerUserTier: Tier;

    segmentations: Segmentation[] = [];

    segmentationItemsFormArray: SpiderFormArray<SegmentationItem>;
    _segmentationItemsFormArray = new BehaviorSubject<SpiderFormArray<SegmentationItem>>(undefined);
    segmentationItemsFormArrayIdentifier: string = crypto.randomUUID(); // FT: Because we are not changing it, we are not using nameof, it's important that it's not the same as property in save body
    segmentationItemsTranslationKey: string = new SegmentationItem().typeName;
    segmentationItemModel = new SegmentationItem();

    firstTimeFillText: string = this.translocoService.translate('FirstTimeFieldFillTooltipText');

    alreadyFilledSegmentationIdsForThePartnerUser: number[] = [];

    @ViewChild('userProgressbar') userProgressbar: UserProgressbarComponent;

    isAuthorizedForSave: boolean = false;
    showPointsFormControl: boolean = false;

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
    }


    override ngOnInit() {
        
    }

    partnerUserFormGroupInitFinish = () => {
        if (this.partnerUserFormGroup.getRawValue()?.tierId) {
            this.setTier(this.partnerUserFormGroup.getRawValue().id);
        }

        getPrimengDropdownNamebookOptions(this.apiService.getGenderDropdownListForUserExtended, null).subscribe(po => {
            this.genderOptions = po;
        });

        forkJoin({
            genderAndBirthDate: this.apiService.getPartnerUserGenderAndBirthDate(this.partnerUserFormGroup.getRawValue().id),
            segmentations: this.apiService.getSegmentationListForTheCurrentPartner(),
        })
        .subscribe(({ 
            genderAndBirthDate,
            segmentations,
        }) => {
            this.initGenderAndBirthDateFormGroup(genderAndBirthDate);

            this.initSegmentationsFormArray(segmentations);
        });

        this.setAlreadyFilledSegmentationIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue());
    }

    initGenderAndBirthDateFormGroup = (genderAndBirthDate: GenderAndBirthDate) => {
        this.baseFormService.initFormGroup<GenderAndBirthDate>(
            this.genderAndBirthDateFormGroup, 
            genderAndBirthDate, 
            []
        );
    }

    initSegmentationsFormArray = (segmentations: Segmentation[]) => {
        this.segmentations = segmentations;

        this.segmentationItemsFormArray = this.initFormArray(
            this.formGroup, 
            segmentations.flatMap(x => x.segmentationItemsDTOList), 
            this.segmentationItemModel, 
            this.segmentationItemsFormArrayIdentifier, 
            this.segmentationItemsTranslationKey
        );
        this._segmentationItemsFormArray.next(null);

        this.apiService.getCheckedSegmentationItemIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue().id).subscribe(ids => {
            this.segmentationItemsFormArray.controls.forEach((formGroup: FormGroup) => {
                formGroup.controls['checked'].setValue(ids.includes(formGroup.controls['id'].value));
            });

            this.loading = false;
        });
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

    authorizedForSaveObservable = (): Observable<boolean> => {
        return combineLatest([this.authService.currentPartnerUser$, this._segmentationItemsFormArray]).pipe(
            map(([currentPartnerUser]) => {
                if (currentPartnerUser != null) {
                    const isCurrentPartnerUserPage = this.isCurrentPartnerUserPage(currentPartnerUser);
                    return isCurrentPartnerUserPage;
                }

                return false;
            })
        );
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;

        if (this.segmentationItemsFormArray != null) {
            if (event.isAuthorizedForSave === false) {
                this.baseFormService.disableAllFormControls(this.segmentationItemsFormArray);
                this.genderAndBirthDateFormGroup.controls.birthDate.disable();
                this.genderAndBirthDateFormGroup.controls.genderId.disable();
            }
            else{
                this.baseFormService.enableAllFormControls(this.segmentationItemsFormArray);
                this.genderAndBirthDateFormGroup.controls.birthDate.enable();
                this.genderAndBirthDateFormGroup.controls.genderId.enable();
            }
        }
        
        if (this.isAdmin(event.currentUserPermissionCodes)) {
            this.showPointsFormControl = true;
        }
        else{
            this.showPointsFormControl = false;
        }
    }

    isAdmin = (permissionCodes: string[]) => {
        return permissionCodes.includes(BusinessPermissionCodes.UpdatePartner) ||
               permissionCodes.includes(BusinessPermissionCodes.UpdatePartnerUser);
    }

    isCurrentPartnerUserPage = (currentPartnerUser: PartnerUser) => {
        return currentPartnerUser.id === this.partnerUserFormGroup.getRawValue().id;
    }

    override onBeforeSave = (): void => {
        let saveBody = new PartnerUserSaveBody();

        saveBody.partnerUserDTO = this.partnerUserFormGroup.getRawValue();

        saveBody.selectedSegmentationItemsIds = this.segmentationItemsFormArray.value.filter(x => x.checked).map(x => x.id);

        saveBody.birthDate = this.genderAndBirthDateFormGroup.getRawValue().birthDate;
        saveBody.genderId = this.genderAndBirthDateFormGroup.getRawValue().genderId;

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
