import { Router, ActivatedRoute } from '@angular/router';
import { SoftMessageService } from '../../../../core/services/soft-message.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { LayoutService } from '../../../service/app.layout.service';
import { BaseForm } from '../../../../core/components/base-form/base-form';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForgotPassword } from 'src/app/business/entities/generated/security-entities.generated';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent extends BaseForm<ForgotPassword> implements OnInit {
    private subscription: Subscription | null = null;
    showEmailSentDialog: boolean = false;

    constructor(
      protected override differs: KeyValueDiffers,
      protected override http: HttpClient,
      protected override messageService: SoftMessageService, 
      protected override changeDetectorRef: ChangeDetectorRef,
      protected override router: Router,
      protected override route: ActivatedRoute,
      public layoutService: LayoutService, 
      private authService: AuthService, 
    ) { 
      super(differs, http, messageService, changeDetectorRef, router, route);
    }

    override ngOnInit(){
        this.subscription = this.authService.navigateToDashboardIfLoggedIn();
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

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
