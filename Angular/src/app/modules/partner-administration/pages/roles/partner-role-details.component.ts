import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin } from 'rxjs';
import { PartnerRole, PartnerRoleSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-role-details',
    templateUrl: './partner-role-details.component.html',
    styles: [],
})
export class PartnerRoleDetailsComponent extends BaseForm<PartnerRole> implements OnInit {
    partnerUserOptions: PrimengOption[];
    selectedPartnerUsers = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})

    partnerPermissionOptions: PrimengOption[];
    selectedPartnerPermissions = new SoftFormControl<number[]>(null, {updateOn: 'change'})

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
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            this.apiService.loadPartnerPermissionListForDropdown().subscribe(nl => {
                this.partnerPermissionOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    partnerRole: this.apiService.getPartnerRole(this.modelId),
                    partnerUsers: this.apiService.loadPartnerUserNamebookListForPartnerRole(this.modelId),
                    partnerPermissions: this.apiService.loadPartnerPermissionNamebookListForPartnerRole(this.modelId),
                  }).subscribe(({ partnerRole, partnerUsers, partnerPermissions }) => {
                    this.init(new PartnerRole(partnerRole));
                    this.selectedPartnerUsers.setValue(
                        partnerUsers.map(partnerUser => ({ label: partnerUser.displayName, value: partnerUser.id }))
                    );
                    this.selectedPartnerPermissions.setValue(
                        partnerPermissions.map(permission => { return permission.id })
                    );
                  });
            }
            else{
                this.init(new PartnerRole({id:0}));
            }
        });
    }

    init(model: PartnerRole){
        this.initFormGroup(model);
    }

    searchPartnerUsers(event: AutoCompleteCompleteEvent){ 
        this.apiService.loadPartnerUserListForAutocomplete(50, event?.query).subscribe(nl => {
            this.partnerUserOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }
    
    override onBeforeSave(): void {
        let saveBody: PartnerRoleSaveBody = new PartnerRoleSaveBody();

        saveBody.selectedPartnerUserIds = this.selectedPartnerUsers.value?.map(x => x.value);
        saveBody.selectedPermissionIds = this.selectedPartnerPermissions.value;
        saveBody.partnerRoleDTO = this.model;

        this.saveBody = saveBody;
    }
}
