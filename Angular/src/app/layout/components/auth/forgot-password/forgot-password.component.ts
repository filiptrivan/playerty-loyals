import { Router, ActivatedRoute } from '@angular/router';
import { SoftMessageService } from '../../../../core/services/soft-message.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { LayoutService } from '../../../service/app.layout.service';
import { BaseForm } from '../../../../core/components/base-form/base-form';
import { HttpClient } from '@angular/common/http';
import { ForgotPassword } from 'src/app/business/entities/generated/security-entities.generated';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent extends BaseForm<ForgotPassword> implements OnInit {
    showEmailSentDialog: boolean = false;

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
      public layoutService: LayoutService, 
      private authService: AuthService, 
    ) { 
      super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }

    override ngOnInit(){
        this.init(new ForgotPassword());
    }
    
    init(model: ForgotPassword){
        this.initFormGroup(model);
    }

    sendForgotPassworVerificationEmail() {
        let isFormGroupValid: boolean = this.checkFormGroupValidity();
        if (isFormGroupValid == false) return;
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        this.authService.sendForgotPasswordVerificationEmail(this.model).subscribe(()=>{
            this.showEmailSentDialog = true;
        });
    }
}
