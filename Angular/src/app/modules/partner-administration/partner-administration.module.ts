import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerUserListComponent } from './pages/users/partner-user-list.component';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { PartnerUserDetailsComponent } from './pages/users/partner-user-details.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from "../../core/components/card-skeleton/card-skeleton.component";
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { PartnerRoleListComponent } from './pages/roles/partner-role-list.component';
import { PartnerRoleDetailsComponent } from './pages/roles/partner-role-details.component';
import { TierListComponent } from './pages/tiers/tier-list.component';
import { TierDetailsComponent } from './pages/tiers/tier-details.component';
import { PartnerNotificationDetailsComponent } from './pages/notifications/partner-notification-details.component';
import { PartnerNotificationListComponent } from './pages/notifications/partner-notification-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: PartnerUserListComponent,
    },
    {
        path: 'users/:id',
        component: PartnerUserDetailsComponent,
    },
    {
        path: 'roles',
        component: PartnerRoleListComponent,
    },
    {
        path: 'roles/:id',
        component: PartnerRoleDetailsComponent,
    },
    {
        path: 'tiers',
        component: TierListComponent,
    },
    {
        path: 'tiers/:id',
        component: TierDetailsComponent,
    },
    {
        path: 'notifications',
        component: PartnerNotificationListComponent,
    },
    {
        path: 'notifications/:id',
        component: PartnerNotificationDetailsComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PrimengModule,
        SoftDataTableComponent,
        SoftControlsModule,
        CardSkeletonComponent,
    ],
    declarations: [
        PartnerUserListComponent,
        PartnerUserDetailsComponent, 
        PartnerRoleListComponent,
        PartnerRoleDetailsComponent,
        TierListComponent,
        TierDetailsComponent,
        PartnerNotificationListComponent,
        PartnerNotificationDetailsComponent,
    ],
    providers:[]
})
export class PartnerAdministrationModule { }
