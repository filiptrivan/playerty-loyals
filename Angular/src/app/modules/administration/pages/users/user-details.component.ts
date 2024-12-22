import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { UserExtended, UserExtendedSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
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
    selectedRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'});

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
        this.controllerName = 'Auth';

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            forkJoin({
                userExtended: this.apiService.getUser(this.modelId),
                rolesForTheUser: this.apiService.loadRoleNamebookListForUserExtended(this.modelId),
                roleOptions: this.apiService.loadRoleListForDropdown(),
                genderOptions: this.apiService.loadGenderNamebookListForDropdown(),                  
            })
            .subscribe(({ userExtended, rolesForTheUser, roleOptions, genderOptions}) => {
                this.init(new UserExtended(userExtended));
                this.selectedRoles.setValue(
                    rolesForTheUser.map(role => { return role.id })
                );
                this.roleOptions = roleOptions.map(n => { return { label: n.displayName, value: n.id } });
                this.genderOptions = genderOptions.map(n => { return { label: n.displayName, value: n.id }});
            });
        });
    }

    init(model: UserExtended){
        this.initFormGroup(model);
    }

    override onBeforeSave(): void {
        let saveBody: UserExtendedSaveBody = new UserExtendedSaveBody();

        saveBody.userExtendedDTO = this.model;
        saveBody.selectedRoleIds = this.selectedRoles.value;

        this.saveBody = saveBody;
        return;
    }
}
