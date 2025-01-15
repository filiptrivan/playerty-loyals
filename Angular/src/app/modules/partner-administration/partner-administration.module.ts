import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerUserListComponent } from './pages/users/partner-user-list.component';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { PartnerUserDetailsComponent } from './pages/users/partner-user-details.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from "../../core/components/card-skeleton/card-skeleton.component";
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { PartnerRoleListComponent } from './pages/roles/partner-role-list.component';
import { PartnerRoleDetailsComponent } from './pages/roles/partner-role-details.component';
import { TierListComponent } from './pages/tiers/tier-list.component';
import { PartnerNotificationDetailsComponent } from './pages/notifications/partner-notification-details.component';
import { PartnerNotificationListComponent } from './pages/notifications/partner-notification-list.component';
import { IndexCardComponent } from 'src/app/core/components/index-card/index-card.component';
import { SegmentationListComponent } from './pages/segmentations/segmentation-list.component';
import { SegmentationDetailsComponent } from './pages/segmentations/segmentation-details.component';
import { SegmentationSelectComponent } from '../administration/partials/segmentation-select.component';
import { UserProgressbarComponent } from "../../business/components/user-progressbar/user-progressbar.component";
import { TranslocoDirective } from '@jsverse/transloco';
import { BusinessSystemTableComponent } from './pages/business-systems/business-system-list.component';
import { BusinessSystemDetailsComponent } from './pages/business-systems/business-system-details.component';
import { CommonModule } from '@angular/common';
import { SegmentationBaseComponent, PartnerRoleBaseComponent, PartnerNotificationBaseComponent } from 'src/app/business/components/base-details/business-base-details.generated';

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
        path: 'notifications',
        component: PartnerNotificationListComponent,
    },
    {
        path: 'notifications/:id',
        component: PartnerNotificationDetailsComponent,
    },
    {
        path: 'segmentations',
        component: SegmentationListComponent,
    },
    {
        path: 'segmentations/:id',
        component: SegmentationDetailsComponent,
    },
    {
        path: 'business-systems',
        component: BusinessSystemTableComponent,
    },
    {
        path: 'business-systems/:id',
        component: BusinessSystemDetailsComponent,
    },
    {
        path: 'tiers',
        component: TierListComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        PrimengModule,
        TranslocoDirective,
        SoftDataTableComponent,
        SoftControlsModule,
        CardSkeletonComponent,
        IndexCardComponent,
        SegmentationSelectComponent,
        UserProgressbarComponent,
        SegmentationBaseComponent,
        PartnerRoleBaseComponent,
        PartnerNotificationBaseComponent
    ],
    declarations: [
        PartnerUserListComponent,
        PartnerUserDetailsComponent, 
        PartnerRoleListComponent,
        PartnerRoleDetailsComponent,
        TierListComponent,
        PartnerNotificationListComponent,
        PartnerNotificationDetailsComponent,
        SegmentationListComponent,
        SegmentationDetailsComponent,
        BusinessSystemTableComponent,
        BusinessSystemDetailsComponent,
    ],
    providers:[]
})
export class PartnerAdministrationModule { }
