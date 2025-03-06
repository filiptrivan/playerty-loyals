import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CookiePolicyComponent } from "./cookie-policy/cookie-policy.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { UserAgreementComponent } from "./user-agreement/user-agreement.component";

const routes: Routes = [
    {
        path: 'cookie-policy',
        component: CookiePolicyComponent,
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
    },
    {
        path: 'user-agreement',
        component: UserAgreementComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations: [
    ],
    providers:[]
})
export class LegalModule { }
