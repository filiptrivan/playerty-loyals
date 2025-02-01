import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Notification } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseFormCopy, SpiderFormGroup, SpiderFormControl, SpiderButton, SpiderMessageService, BaseFormService } from '@playerty/spider';

@Component({
    selector: 'notification-details',
    templateUrl: './notification-details.component.html',
    styles: [],
})
export class NotificationDetailsComponent extends BaseFormCopy implements OnInit {
    notificationFormGroup = new SpiderFormGroup<Notification>({});

    isMarkedAsRead = new SpiderFormControl<boolean>(true, {updateOn: 'change'})

    additionalButtons: SpiderButton[];

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

    // FT: We must to do it like arrow function
    sendEmailNotification = () => {
        this.apiService.sendNotificationEmail(this.notificationFormGroup.controls.id.value, this.notificationFormGroup.controls.version.value).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfulAttempt'));
        });
    }

    override onBeforeSave = (): void => {
        this.saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
    }
}
