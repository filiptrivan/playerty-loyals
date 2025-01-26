import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseForm } from 'src/app/business/components/base-form/base-form';
import { ConfigService } from 'src/app/business/services/config.service';
import { Role, PrimengOption, SpiderFormControl, SpiderMessageService, RoleSaveBody } from '@playerty/spider';

@Component({
    selector: 'role-details',
    templateUrl: './role-details.component.html',
    styles: [],
})
export class RoleDetailsComponent extends BaseForm<Role> implements OnInit {
    userOptions: PrimengOption[];
    selectedUsers = new SpiderFormControl<PrimengOption[]>(null, {updateOn: 'change'})

    permissionOptions: PrimengOption[];
    selectedPermissions = new SpiderFormControl<number[]>(null, {updateOn: 'change'})

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        protected override config: ConfigService,
        private apiService: ApiService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService, config);
    }
         
    override ngOnInit() {
        this.controllerName = 'Security';

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            this.apiService.getPermissionListForDropdown().subscribe(nl => {
                this.permissionOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    role: this.apiService.getRole(this.modelId),
                    users: this.apiService.getUsersNamebookListForRole(this.modelId),
                    permissions: this.apiService.getPermissionsNamebookListForRole(this.modelId),
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
        this.apiService.getUserExtendedListForAutocomplete(50, event?.query).subscribe(nl => {
            this.userOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }
    
    override onBeforeSave = (): void => {
        this.saveBody = new RoleSaveBody();
        this.saveBody.selectedUserIds = this.selectedUsers.value?.map(x => x.value);
        this.saveBody.selectedPermissionIds = this.selectedPermissions.value;
        this.saveBody.roleDTO = this.model;
    }
}
