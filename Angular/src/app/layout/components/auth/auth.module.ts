import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PrimengModule } from '../../../core/modules/primeng.module';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { AuthComponent } from './partials/auth.compoment';
import { RegistrationVerificationComponent } from './partials/verification/registration-verification.component';
import { LoginVerificationComponent } from './partials/verification/login-verification.component';
import { ForgotPasswordVerificationComponent } from './partials/verification/forgot-password-verification.component';
import { TranslocoDirective } from '@jsverse/transloco';

const routes: Routes = [
    { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent
    },
    { 
        path: 'registration', 
        component: RegistrationComponent
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AuthComponent,
        PrimengModule,
        SoftControlsModule,
        LoginVerificationComponent,
        ForgotPasswordVerificationComponent,
        RegistrationVerificationComponent,
        TranslocoDirective,
    ],
    declarations: [
        ForgotPasswordComponent,
        RegistrationComponent,
        LoginComponent,
    ]
})
export class AuthModule { }
