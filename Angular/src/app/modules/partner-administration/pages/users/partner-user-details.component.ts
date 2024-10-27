import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import { UserProgressbarComponent } from 'src/app/business/components/user-progressbar/user-progressbar.component';
import { PartnerUser, PartnerUserSaveBody, Segmentation, SegmentationItem, Tier, UserExtended } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helper/partner.service';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftFormArray, SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-user-details',
    templateUrl: './partner-user-details.component.html',
    styles: [],
})
export class PartnerUserDetailsComponent extends BaseFormCopy implements OnInit {
    roleOptions: PrimengOption[];
    partnerRoleOptions: PrimengOption[];
    genderOptions: PrimengOption[];
    selectedRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'});
    selectedPartnerRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'});

    userExtendedFormGroup: SoftFormGroup<UserExtended>;
    partnerUserFormGroup: SoftFormGroup<PartnerUser>;
    partnerUserTier: Tier;

    segmentations: Segmentation[] = [];
    segmentationItems: SegmentationItem[] = [];

    segmentationItemsFormArray: SoftFormArray<SegmentationItem[]>;
    segmentationItemsFormArrayIdentifier: string = crypto.randomUUID(); // FT: Because we are not changing it, we are not using nameof, it's important that it's not the same as property in save body
    segmentationItemModel: SegmentationItem = new SegmentationItem();

    firstTimeFillText: string = $localize`:@@FirstTimeFieldFillTooltipText:Complete the field for the first time and earn extra points!`; // Popunite polje prvi put i zaradite dodatne poene
    firstTimeFillIcon: string = 'pi pi-gift';
    genderTooltipText: string;
    birthDateTooltipText: string;

    alreadyFilledSegmentationIdsForThePartnerUser: number[] = [];

    @ViewChild('userProgressbar') userProgressbar: UserProgressbarComponent;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route);
    }


    override ngOnInit() {
        this.formGroup = new FormGroup({});

        this.controllerName = 'PartnerUser';
        this.saveMethodName = 'SavePartnerUser';
        this.detailsTitle = $localize`:@@User:User`;

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
 
            forkJoin({
                rolesForThePartnerUser: this.apiService.loadPartnerRoleNamebookListForPartnerUser(this.modelId),
                roleOptions: this.apiService.loadRoleListForDropdown(),
                genderOptions: this.apiService.loadGenderNamebookListForDropdown(),                  
                partnerRoleOptions: this.apiService.loadPartnerRoleListForDropdown(),
                segmentations: this.apiService.getSegmentationListForTheCurrentPartner(),
            })
            .subscribe(({ rolesForThePartnerUser, roleOptions, genderOptions, partnerRoleOptions, segmentations }) => {
                this.selectedPartnerRoles.setValue(
                    rolesForThePartnerUser.map(role => { return role.id })
                );
                this.roleOptions = roleOptions.map(n => { return { label: n.displayName, value: n.id } });
                this.genderOptions = genderOptions.map(n => { return { label: n.displayName, value: n.id }});
                this.partnerRoleOptions = partnerRoleOptions.map(n => { return { label: n.displayName, value: n.id } });
                this.segmentations = segmentations;
            });

            this.apiService.getPartnerUser(this.modelId).subscribe(partnerUser => {
                this.partnerUserFormGroup = this.initFormGroup(new PartnerUser(partnerUser), nameof<PartnerUserSaveBody>('partnerUserDTO'));
                if (partnerUser?.tierId) {
                    this.apiService.getTier(partnerUser.tierId).subscribe(partnerUserTier => {
                        this.partnerUserTier = partnerUserTier;
                    });
                }
                
                if(partnerUser.hasFilledGenderForTheFirstTime == false)
                    this.genderTooltipText = null;
                else
                    this.genderTooltipText = this.firstTimeFillText;

                if(partnerUser.hasFilledBirthDateForTheFirstTime == false)
                    this.birthDateTooltipText = null;
                else
                    this.birthDateTooltipText = this.firstTimeFillText;

                this.apiService.getSegmentationItemListForTheCurrentPartner().subscribe(segmentationItems => {
                    this.segmentationItemsFormArray = this.initFormArray(segmentationItems, this.segmentationItemModel, this.segmentationItemsFormArrayIdentifier);

                    this.apiService.getCheckedSegmentationItemIdsForThePartnerUser(partnerUser.id).subscribe(ids => {
                        this.segmentationItemsFormArray.controls.forEach((formGroup: FormGroup) => {
                            formGroup.controls['checked'].setValue(ids.includes(formGroup.controls['id'].value));
                        });
                    });
                })

                this.getAlreadyFilledSegmentationIdsForThePartnerUser(partnerUser);     

                this.apiService.getUser(partnerUser.userId).subscribe(user => {
                    this.userExtendedFormGroup = this.initFormGroup(new UserExtended(user), nameof<PartnerUserSaveBody>('userExtendedDTO'));

                    this.apiService.loadRoleNamebookListForUserExtended(user.id).subscribe(rolesForTheUser => {
                        this.selectedRoles.setValue(
                            rolesForTheUser.map(role => { return role.id })
                        );
                    });
                });
            })
        });
    }

    // TODO FT: Return this inside save result also
    getAlreadyFilledSegmentationIdsForThePartnerUser(partnerUser: PartnerUser){
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

    override onBeforeSave(): void {
        let saveBody: PartnerUserSaveBody = new PartnerUserSaveBody();

        saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();
        saveBody.selectedRoleIds = this.selectedRoles.getRawValue();
        
        saveBody.partnerUserDTO = this.partnerUserFormGroup.getRawValue();
        saveBody.selectedPartnerRoleIds = this.selectedPartnerRoles.getRawValue();

        saveBody.selectedSegmentationItemIds = this.segmentationItemsFormArray.value.filter(x => x.checked).map(x => x.id);

        this.saveBody = saveBody;
        return;
    }

    override async onAfterSave(): Promise<void> {
        this.getAlreadyFilledSegmentationIdsForThePartnerUser(this.partnerUserFormGroup.getRawValue());
        
        if ((await firstValueFrom(this.partnerService.currentPartnerUser$)).id == this.partnerUserFormGroup.getRawValue().id) {
            await firstValueFrom(this.partnerService.loadCurrentPartnerUser());
        }

        if (this.partnerUserFormGroup.getRawValue()?.tierId) {
            this.apiService.getTier(this.partnerUserFormGroup.getRawValue().tierId).subscribe(partnerUserTier => {
                this.partnerUserTier = partnerUserTier;
            });
        }else{
            this.partnerUserTier = null;
        }
    }
}
