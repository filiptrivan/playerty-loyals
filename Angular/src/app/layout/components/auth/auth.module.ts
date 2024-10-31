import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AccessComponent } from './access/access.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PrimengModule } from '../../modules/primeng.module';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { AuthComponent } from './partials/auth.compoment';
import { RegistrationVerificationComponent } from './partials/verification/registration-verification.component';
import { LoginVerificationComponent } from './partials/verification/login-verification.component';
import { ForgotPasswordVerificationComponent } from './partials/verification/forgot-password-verification.component';
import { TranslocoDirective } from '@jsverse/transloco';

const routes: Routes = [
    { 
        path: 'error', 
        component: ErrorComponent,
    },
    { 
        path: 'access', 
        component: AccessComponent,
    },
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
        ErrorComponent,
        AccessComponent,
        ForgotPasswordComponent,
        RegistrationComponent,
        LoginComponent,
    ]
})
export class AuthModule { }
