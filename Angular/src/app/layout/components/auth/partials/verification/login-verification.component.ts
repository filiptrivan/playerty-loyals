import { ActivatedRoute, Router } from '@angular/router';
import { SoftMessageService } from '../../../../../core/services/soft-message.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../service/app.layout.service';
import { ApiService } from 'src/app/business/services/api/api.service';
import { VerificationWrapperComponent } from './verification-wrapper.component';

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
    @Input() password: string
    @Input() userId: number;

    constructor(
      public layoutService: LayoutService, 
      private authService: AuthService, 
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private messageService: SoftMessageService, 
    ) { 
    }

    ngOnInit(){
    }
    
    resendVerificationToken(){
        this.authService.sendLoginVerificationEmail({email: this.email, password: this.password}).subscribe((res) => {
            this.messageService.successMessage("Successfully sent verification code.")
        });
    }

    onCodeSubmit(event: string){
        this.authService.login({email: this.email, verificationCode: event}).subscribe(() => {
            this.messageService.successMessage("You have successfully verified your account.")
            this.authService.navigateToDashboard();
        });
    }
}

