import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { PartnerUserListComponent } from './pages/users/partner-user-list.component';
import { PartnerUserDetailsComponent } from './pages/users/partner-user-details.component';
import { PartnerRoleListComponent } from './pages/roles/partner-role-list.component';
import { PartnerRoleDetailsComponent } from './pages/roles/partner-role-details.component';
import { TierListComponent } from './pages/tiers/tier-list.component';
import { PartnerNotificationDetailsComponent } from './pages/notifications/partner-notification-details.component';
import { PartnerNotificationListComponent } from './pages/notifications/partner-notification-list.component';
import { SegmentationListComponent } from './pages/segmentations/segmentation-list.component';
import { SegmentationDetailsComponent } from './pages/segmentations/segmentation-details.component';
import { SegmentationSelectComponent } from '../administration/partials/segmentation-select.component';
import { UserProgressbarComponent } from "../../business/components/user-progressbar/user-progressbar.component";
import { BusinessSystemTableComponent } from './pages/business-systems/business-system-list.component';
import { BusinessSystemDetailsComponent } from './pages/business-systems/business-system-details.component';
import { SegmentationBaseDetailsComponent, PartnerRoleBaseDetailsComponent, PartnerNotificationBaseDetailsComponent, BusinessSystemBaseDetailsComponent, PartnerUserBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule, SpiderDataTableComponent, SpiderControlsModule, CardSkeletonComponent, IndexCardComponent } from '@playerty/spider';
import { ExcelUpdatePointsBodyComponent } from './partials/business-system/excel-update-points/body/excel-update-points-body.component';
import { ManualUpdatePointsBodyComponent } from './partials/business-system/manual-update-points/body/manual-update-points-body.component';
import { AutomaticUpdatePointsBodyComponent } from './partials/business-system/automatic-update-points/body/automatic-update-points-body.component';
import { AutomaticUpdatePointsFooterComponent } from './partials/business-system/automatic-update-points/footer/automatic-update-points-footer.component';
import { ExcelUpdatePointsFooterComponent } from './partials/business-system/excel-update-points/footer/excel-update-points-footer.component';
import { ManualUpdatePointsFooterComponent } from './partials/business-system/manual-update-points/footer/manual-update-points-footer.component';

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
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    TranslocoDirective,
    SpiderDataTableComponent,
    SpiderControlsModule,
    CardSkeletonComponent,
    IndexCardComponent,
    SegmentationSelectComponent,
    UserProgressbarComponent,
    SegmentationBaseDetailsComponent,
    PartnerRoleBaseDetailsComponent,
    PartnerNotificationBaseDetailsComponent,
    BusinessSystemBaseDetailsComponent,
    PartnerUserBaseDetailsComponent,
    AutomaticUpdatePointsBodyComponent,
    ExcelUpdatePointsBodyComponent,
    ManualUpdatePointsBodyComponent,
    AutomaticUpdatePointsFooterComponent,
    ExcelUpdatePointsFooterComponent,
    ManualUpdatePointsFooterComponent,
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
