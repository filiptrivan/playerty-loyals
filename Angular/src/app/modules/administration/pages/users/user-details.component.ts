import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PartnerUser, PartnerUserSaveBody, UserExtended, UserExtendedSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styles: [],
})

// FT: Putting any because we are merging UserExtended and PartnerUser
export class UserDetailsComponent extends BaseFormCopy implements OnInit {
    roleOptions: PrimengOption[];
    partnerRoleOptions: PrimengOption[];
    genderOptions: PrimengOption[];
    selectedRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'});
    selectedPartnerRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'});
    loading: boolean;
    userExtended: UserExtended;
    partnerUser: PartnerUser;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route);
        }
         
    override ngOnInit() {
        this.loading = true;

        this.controllerName = 'PartnerUser';
        this.saveMethodName = 'SavePartnerUser';

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            forkJoin({
                rolesForTheUser: this.apiService.loadRoleNamebookListForUserExtended(this.modelId),
                roleOptions: this.apiService.loadRoleListForDropdown(),
                genderOptions: this.apiService.loadGenderNamebookListForDropdown(),                  
                partnerRoleOptions: this.apiService.loadPartnerRoleListForDropdown(),
                }).subscribe(({ rolesForTheUser, roleOptions, genderOptions, partnerRoleOptions }) => {
                    this.selectedRoles.setValue(
                        rolesForTheUser.map(role => { return role.id })
                    );
                    this.roleOptions = roleOptions.map(n => { return { label: n.displayName, value: n.id } });
                    this.genderOptions = genderOptions.map(n => { return { label: n.displayName, value: n.id }});
                    this.partnerRoleOptions = partnerRoleOptions.map(n => { return { label: n.displayName, value: n.id } });
                });

            this.apiService.getUser(this.modelId).subscribe(user => {
                this.userExtended = new UserExtended(user);
                this.apiService.getPartnerUserForTheUser(this.modelId).subscribe(partnerUser => {
                    this.partnerUser = new PartnerUser(partnerUser);
                    this.apiService.loadPartnerRoleNamebookListForPartnerUser(partnerUser.id).subscribe(partnerRoles => {
                        this.selectedPartnerRoles.setValue(
                            partnerRoles.map(role => { return role.id })
                        );
                        this.loading = false;
                    });
                });
            });
        });
    }

    ngOnDestroy() {
    }
    
    override onBeforeSave(): void {
        let saveBody: PartnerUserSaveBody = new PartnerUserSaveBody();

        saveBody.userExtendedDTO = this.userExtended;
        saveBody.selectedRoleIds = this.selectedRoles.value;

        saveBody.partnerUserDTO = this.partnerUser;
        saveBody.selectedPartnerRoleIds = this.selectedPartnerRoles.value;

        this.saveBody = saveBody;
        return;
    }
}
