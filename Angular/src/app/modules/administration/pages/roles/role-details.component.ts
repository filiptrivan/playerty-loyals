import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin } from 'rxjs';
import { Role, RoleSaveBody } from 'src/app/business/entities/security-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'role-details',
    templateUrl: './role-details.component.html',
    styles: [],
})
export class RoleDetailsComponent extends BaseForm<Role> implements OnInit {
    userOptions: PrimengOption[];
    selectedUsers = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})

    permissionOptions: PrimengOption[];
    selectedPermissions = new SoftFormControl<number[]>(null, {updateOn: 'change'})

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
        }
         
    override ngOnInit() {
        this.controllerName = "Auth";
        // this.selectedUsers.validator = isArrayEmpty(this.selectedUsers);

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            this.apiService.loadPermissionListForDropdown().subscribe(nl => {
                this.permissionOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    role: this.apiService.getRole(this.modelId),
                    users: this.apiService.loadUserListForRole(this.modelId),
                    permissions: this.apiService.loadPermissionListForRole(this.modelId),
                  }).subscribe(({ role, users, permissions }) => {
                    this.init(new Role(role));
                    this.selectedUsers.setValue(
                        users.map(user => ({ label: user.displayName, value: user.id }))
                    );
                    this.selectedPermissions.setValue(
                        permissions.map(permission => { return permission.id })
                    );
                  });
            }
            else{
                this.init(new Role({id:0}));
            }
        });
    }

    init(model: Role){
        this.initFormGroup(model);
    }

    searchUsers(event: AutoCompleteCompleteEvent){ 
        this.apiService.loadUserListForAutocomplete(50, event?.query).subscribe(nl => {
            this.userOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }
    
    override onBeforeSave(): void {
        this.saveBody = new RoleSaveBody();
        this.saveBody.selectedUserIds = this.selectedUsers.value?.map(x => x.value);
        this.saveBody.selectedPermissionIds = this.selectedPermissions.value;
        this.saveBody.roleDTO = this.model;
    }
}
