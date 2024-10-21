import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PartnerUser, PartnerUserSaveBody, Segmentation, UserExtended } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
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
    userExtended: UserExtended;
    partnerUser: PartnerUser;
    segmentations: Segmentation[] = [];
    selectedSegmentationItemIds: number[];
    
    firstTimeFillText: string = $localize`:@@FirstTimeFieldFillTooltipText:Complete the field for the first time and earn extra points!`; // Popunite polje prvi put i zaradite dodatne poene
    firstTimeFillIcon: string = 'pi pi-gift';

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route);
    }


    override ngOnInit() {
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
                this.partnerUser = new PartnerUser(partnerUser);
                
                this.apiService.getUser(partnerUser.userId).subscribe(user => {
                    this.userExtended = new UserExtended(user);

                    this.apiService.loadRoleNamebookListForUserExtended(user.id).subscribe(rolesForTheUser => {
                        this.selectedRoles.setValue(
                            rolesForTheUser.map(role => { return role.id })
                        );
                    });
                });
            });
        });
    }

    selectedSegmentationItemIdsChange(event: number[]){
        this.selectedSegmentationItemIds = event;
    }

    override onBeforeSave(): void {
        let saveBody: PartnerUserSaveBody = new PartnerUserSaveBody();

        saveBody.userExtendedDTO = this.userExtended;
        saveBody.selectedRoleIds = this.selectedRoles.value;

        saveBody.partnerUserDTO = this.partnerUser;
        saveBody.selectedPartnerRoleIds = this.selectedPartnerRoles.value;

        saveBody.selectedSegmentationItemIds = this.selectedSegmentationItemIds;

        this.saveBody = saveBody;
        return;
    }
}
