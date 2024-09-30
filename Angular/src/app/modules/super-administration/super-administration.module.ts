import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/users/user-list.component';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { UserDetailsComponent } from './pages/users/user-details.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from "../../core/components/card-skeleton/card-skeleton.component";
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { RoleListComponent } from './pages/roles/role-list.component';
import { RoleDetailsComponent } from './pages/roles/role-details.component';
import { TierListComponent } from './pages/tiers/tier-list.component';
import { TierDetailsComponent } from './pages/tiers/tier-details.component';
import { NotificationDetailsComponent } from './pages/notifications/notification-details.component';
import { NotificationListComponent } from './pages/notifications/notification-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent,
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'roles',
        component: RoleListComponent,
    },
    {
        path: 'roles/:id',
        component: RoleDetailsComponent,
    },
    // {
    //     path: 'tiers', // Add partner tiers here
    //     component: TierListComponent,
    // },
    // {
    //     path: 'tiers/:id',
    //     component: TierDetailsComponent,
    // },
    {
        path: 'notifications',
        component: NotificationListComponent,
    },
    {
        path: 'notifications/:id',
        component: NotificationDetailsComponent,
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
        UserListComponent,
        UserDetailsComponent, 
        RoleListComponent,
        RoleDetailsComponent,
        TierListComponent,
        TierDetailsComponent,
        NotificationListComponent,
        NotificationDetailsComponent,
    ],
    providers:[]
})
export class SuperAdministrationModule { }
