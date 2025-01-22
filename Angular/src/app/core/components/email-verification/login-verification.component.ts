import { Component, Input, OnInit } from '@angular/core';
import { VerificationWrapperComponent } from './verification-wrapper.component';
import { TranslocoService } from '@jsverse/transloco';
import { LayoutService } from 'src/app/layout/services/app.layout.service';
import { AuthService } from '../../../business/services/auth/auth.service';
import { SpiderMessageService } from '../../services/spider-message.service';

@Component({
    selector: 'login-verification',
    templateUrl: './login-verification.component.html',
    standalone: true,
    imports: [
        VerificationWrapperComponent
    ]
})
export class LoginVerificationComponent implements OnInit {
    @Input() email: string;
    @Input() userId: number;

    constructor(
      public layoutService: LayoutService, 
      private authService: AuthService, 
      private messageService: SpiderMessageService,
      private translocoService: TranslocoService,
    ) { 
    }

    ngOnInit(){
    }
    
    resendVerificationToken(){
        this.authService.sendLoginVerificationEmail({email: this.email}).subscribe((res) => {
            this.messageService.successMessage(this.translocoService.translate('SuccessfullySentVerificationCode'));
        });
    }

    onCodeSubmit(event: string){
        this.authService.login({email: this.email, verificationCode: event}).subscribe(() => {
            this.messageService.successMessage(this.translocoService.translate('YouHaveSuccessfullyVerifiedYourAccount'));
            this.authService.navigateToDashboard();
        });
    }
}

