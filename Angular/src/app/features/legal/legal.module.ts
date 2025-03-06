import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { UserAgreementComponent } from "./user-agreement/user-agreement.component";

const routes: Routes = [
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
