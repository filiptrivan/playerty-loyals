import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { User } from 'src/app/business/entities/generated/security-entities.generated';
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
export class UserDetailsComponent extends BaseForm<User> implements OnInit {
    private routeSub: Subscription;
    roleOptions: PrimengOption[];
    selectedRoles = new SoftFormControl<number[]>(null, {updateOn: 'change'})

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute, 
        private router: Router, 
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef);
        }
         
    ngOnInit() {
        // this.selectedRoles.setValidators(isArrayEmpty(this.selectedRoles));

        this.routeSub = this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            this.apiService.loadRoleListForDropdown().subscribe(nl => {
                this.roleOptions = nl.map(n => { return { label: n.displayName, value: n.id } });
            });
            if(this.modelId > 0){
                forkJoin({
                    user: this.apiService.getUser(this.modelId),
                    roles: this.apiService.loadRoleListForUser(this.modelId),
                  }).subscribe(({ user, roles }) => {
                    this.init(new User(user));
                    this.selectedRoles.setValue(
                      roles.map(role => { return role.id })
                    );
                  });
            }
            else{
                this.init(new User({id:0}));
            }
        });
    }

    init(model: User){
        this.initFormGroup(model);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
    
    override onBeforeSave(): void {
        // this.selectedRoles.markAsDirty(); // FT: If you want to make the multi autocomplete mandatory
        // this.invalidForm = this.selectedRoles.invalid;
    }
}
