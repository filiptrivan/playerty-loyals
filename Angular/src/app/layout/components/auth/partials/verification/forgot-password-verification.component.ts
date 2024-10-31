import { TranslocoService } from '@jsverse/transloco';
import { SoftMessageService } from '../../../../../core/services/soft-message.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../service/app.layout.service';
import { VerificationWrapperComponent } from './verification-wrapper.component';

@Component({
    selector: 'forgot-password-verification',
    templateUrl: './forgot-password-verification.component.html',
    standalone: true,
    imports: [
        VerificationWrapperComponent
    ]
})
export class ForgotPasswordVerificationComponent implements OnInit {
    @Input() email: string;
    @Input() newPassword: string
    @Input() userId: number;

    constructor(
      public layoutService: LayoutService, 
      private authService: AuthService, 
      private messageService: SoftMessageService,
      private translocoService: TranslocoService
    ) { 
    }

    ngOnInit(){
    }
    
    resendVerificationToken(){
        this.authService.sendForgotPasswordVerificationEmail({email: this.email, newPassword: this.newPassword}).subscribe((res) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfullySentVerificationCode'));
        });
    }

    onCodeSubmit(event: string){
        this.authService.forgotPassword({email: this.email, verificationCode: event}).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('YouHaveSuccessfullyChangedYourPassword'));
            this.authService.navigateToDashboard();
        });
    }
}

