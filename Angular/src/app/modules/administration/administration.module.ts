import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/users/user-list.component';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { UserDetailsComponent } from './pages/users/user-details.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from "../../core/components/card-skeleton/card-skeleton.component";
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { RoleListComponent } from './pages/roles/role-list.component';
import { RoleDetailsComponent } from './pages/roles/role-details.component';
import { NotificationDetailsComponent } from './pages/notifications/notification-details.component';
import { NotificationTableComponent } from './pages/notifications/notification-table.component';
import { SegmentationSelectComponent } from './partials/segmentation-select.component';
import { PartnerListComponent } from './pages/partners/partner-list.component';
import { PartnerDetailsComponent } from './pages/partners/partner-details.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationBaseDetailsComponent, PartnerBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';

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
    {
        path: 'notifications',
        component: NotificationTableComponent,
    },
    {
        path: 'notifications/:id',
        component: NotificationDetailsComponent,
    },
    {
        path: 'partners',
        component: PartnerListComponent,
    },
    {
        path: 'partners/:id',
        component: PartnerDetailsComponent,
    },
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    PrimengModule,
    SoftDataTableComponent,
    SoftControlsModule,
    CardSkeletonComponent,
    SegmentationSelectComponent,
    TranslocoDirective,
    PartnerBaseDetailsComponent,
    NotificationBaseDetailsComponent,
    UserExtendedBaseDetailsComponent
],
    declarations: [
        UserListComponent,
        UserDetailsComponent, 
        RoleListComponent,
        RoleDetailsComponent,
        NotificationTableComponent,
        NotificationDetailsComponent,
        PartnerListComponent,
        PartnerDetailsComponent,
    ],
    providers:[]
})
export class AdministrationModule { }
