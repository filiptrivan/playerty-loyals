import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Subscription } from 'rxjs';
import { Notification, NotificationSaveBody } from 'src/app/business/entities/generated/security-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'notification-details',
    templateUrl: './notification-details.component.html',
    styles: [],
})
export class NotificationDetailsComponent extends BaseForm<Notification> implements OnInit {
    private routeSub: Subscription;
    userOptions: PrimengOption[];
    selectedUsers = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})
    isMarkedAsRead = new SoftFormControl<boolean>(null, {updateOn: 'change'})

    text: string;

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
        this.routeSub = this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    notification: this.apiService.getNotification(this.modelId),
                    users: this.apiService.loadUserExtendedNamebookListForNotification(this.modelId),
                  }).subscribe(({ notification, users }) => {
                    this.init(new Notification(notification));
                    this.selectedUsers.setValue(
                        users.map(user => ({ label: user.displayName, value: user.id }))
                    );
                  });
            }
            else{
                this.init(new Notification({id:0}));
            }
        });
    }

    init(model: Notification){
        this.initFormGroup(model);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    searchUsers(event: AutoCompleteCompleteEvent){ 
        this.apiService.loadUserListForAutocomplete(50, event?.query).subscribe(nl => {
            this.userOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }

    clg(event){
        console.log(event)
    }

    override onBeforeSave(): void {
        this.saveBody = new NotificationSaveBody();
        this.saveBody.selectedUserIds = this.selectedUsers.value?.map(x => x.value);
        this.saveBody.isMarkedAsRead = this.isMarkedAsRead;
        this.saveBody.notificationDTO = this.model;
    }
}
