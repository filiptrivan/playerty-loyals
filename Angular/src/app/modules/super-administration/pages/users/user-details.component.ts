import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserExtended, UserExtendedSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styles: [],
})
export class UserDetailsComponent extends BaseForm<UserExtended> implements OnInit {
    roleOptions: PrimengOption[];
    genderOptions: PrimengOption[];
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
        this.controllerName = "Auth";

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            this.apiService.loadRoleListForDropdown().subscribe(nl => {
                this.roleOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    user: this.apiService.getUser(this.modelId),
                    roles: this.apiService.loadRoleNamebookListForUserExtended(this.modelId),
                    genders: this.apiService.loadGenderNamebookListForDropdown(),
                  }).subscribe(({ user, roles, genders }) => {
                    this.init(new UserExtended(user));
                    this.selectedRoles.setValue(
                      roles.map(role => { return role.id })
                    );
                    this.genderOptions = genders.map(n => { return { label: n.displayName, value: n.id }});
                  });
            }
            else{
                this.init(new UserExtended({id:0}));
            }
        });
    }

    init(model: UserExtended){
        this.initFormGroup(model);
    }

    ngOnDestroy() {
    }
    
    override onBeforeSave(): void {
        this.saveBody = new UserExtendedSaveBody();
        this.saveBody.selectedRoleIds = this.selectedRoles.value;
        this.saveBody.userExtendedDTO = this.model;
    }
}
