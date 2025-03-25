import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './pages/users/user-table.component';
import { UserDetailsComponent } from './pages/users/user-details.component';
import { RoleTableComponent } from './pages/roles/role-table.component';
import { RoleDetailsComponent } from './pages/roles/role-details.component';
import { NotificationDetailsComponent } from './pages/notifications/notification-details.component';
import { NotificationTableComponent } from './pages/notifications/notification-table.component';
import { SegmentationSelectComponent } from './partials/segmentation-select.component';
import { PartnerListComponent } from './pages/partners/partner-list.component';
import { PartnerDetailsComponent } from './pages/partners/partner-details.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationBaseDetailsComponent, PartnerBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule, SpiderDataTableComponent, SpiderControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from '@playerty/spider';

const routes: Routes = [
    {
        path: 'users',
        component: UserTableComponent,
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'roles',
        component: RoleTableComponent,
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SpiderDataTableComponent,
    SpiderControlsModule,
    CardSkeletonComponent,
    SegmentationSelectComponent,
    TranslocoDirective,
    PartnerBaseDetailsComponent,
    NotificationBaseDetailsComponent,
    UserExtendedBaseDetailsComponent,
    RoleBaseDetailsComponent,
],
declarations: [
        UserTableComponent,
        UserDetailsComponent, 
        RoleTableComponent,
        RoleDetailsComponent,
        NotificationTableComponent,
        NotificationDetailsComponent,
        PartnerListComponent,
        PartnerDetailsComponent,
    ],
    providers:[]
})
export class AdministrationModule { }
