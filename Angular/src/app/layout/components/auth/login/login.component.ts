import { BaseFormService } from 'src/app/core/services/base-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpiderMessageService } from '../../../../core/services/spider-message.service';
import { AuthService } from '../../../../business/services/auth/auth.service';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/core/entities/security-entities.generated';
import { TranslocoService } from '@jsverse/transloco';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SpiderFormGroup } from 'src/app/core/components/spider-form-control/spider-form-control';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent extends BaseFormCopy implements OnInit {
    loginFormGroup = new SpiderFormGroup<Login>({});

    companyName: string;
    showEmailSentDialog: boolean = false;
    usersCanRegister: boolean = this.config.usersCanRegister;

    constructor(
      protected override differs: KeyValueDiffers,
      protected override http: HttpClient,
      protected override messageService: SpiderMessageService, 
      protected override changeDetectorRef: ChangeDetectorRef,
      protected override router: Router, 
      protected override route: ActivatedRoute,
      protected override translocoService: TranslocoService,
      protected override baseFormService: BaseFormService,
      public layoutService: LayoutService, 
      private authService: AuthService, 
      private config: ConfigService
    ) { 
      super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit(){
        this.initLoginFormGroup(new Login({}));
    }
    
    initLoginFormGroup(model: Login){
      this.initFormGroup(this.loginFormGroup, this.formGroup, model, model.typeName, []);
    }

    companyNameChange(companyName: string){
      this.companyName = companyName;
    }

    sendLoginVerificationEmail() {
        let isFormGroupValid: boolean = this.checkFormGroupValidity();
        if (isFormGroupValid == false) return;
        this.authService.sendLoginVerificationEmail(this.loginFormGroup.getRawValue()).subscribe(()=>{
            this.showEmailSentDialog = true;
        });
    }

}
