import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin } from 'rxjs';
import { PartnerNotification, PartnerNotificationSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { isArrayEmpty } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseForm<PartnerNotification> implements OnInit {
    partnerUserOptions: PrimengOption[];
    selectedPartnerUsersForAppNotification = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})
    selectedPartnerUsersForEmailNotification = new SoftFormControl<PrimengOption[]>(null, {updateOn: 'change'})
    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

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
        this.selectedPartnerUsersForAppNotification.validator = isArrayEmpty(this.selectedPartnerUsersForAppNotification);
        this.selectedPartnerUsersForEmailNotification.validator = isArrayEmpty(this.selectedPartnerUsersForEmailNotification);
        
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    partnerNotification: this.apiService.getPartnerNotification(this.modelId),
                    partnerUsers: this.apiService.loadPartnerUserNamebookListForPartnerNotification(this.modelId),
                  }).subscribe(({ partnerNotification, partnerUsers }) => {
                    this.init(new PartnerNotification(partnerNotification));
                    this.selectedPartnerUsersForAppNotification.setValue(
                        partnerUsers.map(partnerUser => ({ label: partnerUser.displayName, value: partnerUser.id }))
                    );
                    this.selectedPartnerUsersForEmailNotification.setValue(
                        partnerUsers.map(partnerUser => ({ label: partnerUser.displayName, value: partnerUser.id }))
                    );
                  });
            }
            else{
                this.init(new PartnerNotification({id:0}));
            }
        });
    }

    init(model: PartnerNotification){
        this.initFormGroup(model);
    }

    searchPartnerUsers(event: AutoCompleteCompleteEvent){ 
        this.apiService.loadPartnerUserListForAutocomplete(50, event?.query).subscribe(nl => {
            this.partnerUserOptions = nl.map(n => { return { label: n.displayName, value: n.id }});
        })
    }

    clg(event){
        console.log(event)
    }

    sendEmailNotification(){

    }

    override onBeforeSave(): void {
        let saveBody: PartnerNotificationSaveBody = new PartnerNotificationSaveBody();
        saveBody.selectedPartnerUserIds = this.selectedPartnerUsersForAppNotification.value?.map(x => x.value);
        saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
        saveBody.partnerNotificationDTO = this.model;
        this.saveBody = saveBody;
    }
}
