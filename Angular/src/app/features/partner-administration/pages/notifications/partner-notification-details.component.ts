import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerNotification } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderFormControl, SpiderButton, SpiderMessageService, BaseFormService } from '@playerty/spider';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseFormCopy implements OnInit {
    partnerNotificationFormGroup = new SpiderFormGroup<PartnerNotification>({});

    isMarkedAsRead = new SpiderFormControl<boolean>(true, {updateOn: 'change'})

    additionalButtons: SpiderButton[];
    isAuthorizedForSave: boolean = false;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute,
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        this.additionalButtons = [
            {label: this.translocoService.translate('SendEmailNotification'), onClick: this.sendEmailNotification, icon: 'pi pi-send'}
        ];
    }

    // FT: Needs to do it like arrow function
    sendEmailNotification = () => {
        this.apiService.sendPartnerNotificationEmail(this.partnerNotificationFormGroup.getRawValue().id, this.partnerNotificationFormGroup.getRawValue().version).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));
        });
    }

    isAuthorizedForSaveChange = ($event: boolean) => {
        if ($event === false) {
            this.isMarkedAsRead.disable();
        }
    }

    override onBeforeSave = (): void => {
        this.saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
    }
}
