import { ActivatedRoute, Router } from '@angular/router';
import { SoftMessageService } from '../../../../core/services/soft-message.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/app.layout.service';
import { BaseForm } from '../../../../core/components/base-form/base-form';
import { HttpClient } from '@angular/common/http';
import { VerificationTypeCodes } from 'src/app/core/enums/verification-type-codes';
import { Registration } from 'src/app/business/entities/security-entities.generated';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent extends BaseForm<Registration> implements OnInit {
    companyName: string;
    showEmailSentDialog: boolean = false;
    verificationType: VerificationTypeCodes = VerificationTypeCodes.Login;

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
        this.init(new Registration());
    }
    
    init(model: Registration){
        this.initFormGroup(model);
    }

    companyNameChange(companyName: string){
        this.companyName = companyName;
    }

    sendRegistrationVerificationEmail() {
        let isFormGroupValid: boolean = this.checkFormGroupValidity();
        if (isFormGroupValid == false) return;
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        this.authService.sendRegistrationVerificationEmail(this.model).subscribe(registrationVerificationResult => {
            this.showEmailSentDialog = true;
        });
    }

}
