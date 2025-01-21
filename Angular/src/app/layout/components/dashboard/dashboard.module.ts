import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ApiService } from '../../../business/services/api/api.service';
import { PrimengModule } from '../../../core/modules/primeng.module';
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from 'src/app/core/components/card-skeleton/card-skeleton.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TiersComponent } from "../../../modules/tiers/pages/tiers.component";
import { TimelineIndexProgressbarComponent } from 'src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component';
import { ProductsRecommendationComponent } from 'src/app/business/components/products-recommendation/products-recommendation.component';
import { UserProgressbarComponent } from 'src/app/business/components/user-progressbar/user-progressbar.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { InfoCardComponent } from "../../../core/components/info-card/info-card.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    PrimengModule,
    QRCodeModule,
    SoftDataTableComponent,
    SoftControlsModule,
    CardSkeletonComponent,
    TiersComponent,
    TimelineIndexProgressbarComponent,
    ProductsRecommendationComponent,
    UserProgressbarComponent,
    TranslocoDirective,
    InfoCardComponent,
],
    declarations: [DashboardComponent],
    providers:[ApiService]
})
export class DashboardModule { }
