import { ActivatedRoute, Router } from '@angular/router';
import { SpiderMessageService } from '../../../../core/services/spider-message.service';
import { AuthService } from '../../../../business/services/auth/auth.service';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { Registration } from 'src/app/business/entities/security-entities.generated';
import { TranslocoService } from '@jsverse/transloco';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SpiderFormGroup } from 'src/app/core/components/spider-form-control/spider-form-control';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';
import { BaseFormService } from 'src/app/core/services/base-form.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent extends BaseFormCopy implements OnInit {
    registrationFormGroup = new SpiderFormGroup<Registration>({});

    companyName: string;
    showEmailSentDialog: boolean = false;

    constructor(
      protected override differs: KeyValueDiffers,
      protected override http: HttpClient,
      protected override messageService: SpiderMessageService, 
      protected override changeDetectorRef: ChangeDetectorRef,
      protected override router: Router, 
      protected override route: ActivatedRoute,
      protected override translocoService: TranslocoService,
      protected override baseFormService: BaseFormService,
      private translateLabelsService: TranslateLabelsService,
      private validatorService: ValidatorService,
      public layoutService: LayoutService, 
      private authService: AuthService, 
    ) { 
      super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit(){
        this.initRegistrationFormGroup(new Registration({}));
    }
    
    initRegistrationFormGroup(model: Registration){
        this.initFormGroup(this.registrationFormGroup, this.formGroup, model, model.typeName, []);
    }

    companyNameChange(companyName: string){
        this.companyName = companyName;
    }

    sendRegistrationVerificationEmail() {
        let isFormGroupValid: boolean = this.checkFormGroupValidity();
        if (isFormGroupValid == false) return;
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        this.authService.sendRegistrationVerificationEmail(this.registrationFormGroup.getRawValue()).subscribe(() => {
            this.showEmailSentDialog = true;
        });
    }

}
