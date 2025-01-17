import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { SoftFormControl, SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { PartnerNotification } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { BaseFormService } from 'src/app/core/services/base-form.service';
import { SoftButton } from 'src/app/core/entities/soft-button';

@Component({
    selector: 'partner-notification-details',
    templateUrl: './partner-notification-details.component.html',
    styles: [],
})
export class PartnerNotificationDetailsComponent extends BaseFormCopy implements OnInit {
    partnerNotificationFormGroup = new SoftFormGroup<PartnerNotification>({});

    isMarkedAsRead = new SoftFormControl<boolean>(true, {updateOn: 'change'})

    additionalButtons: SoftButton[];

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
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService, baseFormService);
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

    override onBeforeSave = (): void => {
        this.saveBody.isMarkedAsRead = this.isMarkedAsRead.value;
    }
}
