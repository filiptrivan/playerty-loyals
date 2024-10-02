import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PartnerUser, PartnerUserSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-user-details',
    templateUrl: './partner-user-details.component.html',
    styles: [],
})
export class PartnerUserDetailsComponent extends BaseForm<PartnerUser> implements OnInit {
    roleOptions: PrimengOption[];
    selectedRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'})

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
            this.apiService.loadPartnerRoleListForDropdown().subscribe(nl => {
                this.roleOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    partnerUser: this.apiService.getPartnerUser(this.modelId),
                    roles: this.apiService.loadPartnerRoleNamebookListForPartnerUser(this.modelId),
                  }).subscribe(({ partnerUser, roles }) => {
                    this.init(new PartnerUser(partnerUser));
                    this.selectedRoles.setValue(
                      roles.map(role => { return role.id })
                    );
                  });
            }
            else{
                this.init(new PartnerUser({id:0}));
            }
        });
    }

    init(model: PartnerUser){
        this.initFormGroup(model);
    }

    ngOnDestroy() {
    }
    
    override onBeforeSave(): void {
        this.saveBody = new PartnerUserSaveBody();
        this.saveBody.selectedRoleIds = this.selectedRoles.value;
        this.saveBody.userExtendedDTO = this.model;
    }
}
