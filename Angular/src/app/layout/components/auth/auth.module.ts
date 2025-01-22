import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PrimengModule } from '../../../core/modules/primeng.module';
import { SpiderControlsModule } from 'src/app/core/controls/spider-controls.module';
import { AuthComponent } from './partials/auth.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { LoginVerificationComponent } from 'src/app/core/components/email-verification/login-verification.component';
import { RegistrationVerificationComponent } from 'src/app/core/components/email-verification/registration-verification.component';

const routes: Routes = [
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
        SpiderControlsModule,
        LoginVerificationComponent,
        RegistrationVerificationComponent,
        TranslocoDirective,
    ],
    declarations: [
        RegistrationComponent,
        LoginComponent,
    ]
})
export class AuthModule { }
