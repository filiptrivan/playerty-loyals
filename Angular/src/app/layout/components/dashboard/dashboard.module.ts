import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ProductsRecommendationComponent } from 'src/app/business/components/products-recommendation/products-recommendation.component';
import { UserProgressbarComponent } from 'src/app/business/components/user-progressbar/user-progressbar.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterModule, Routes } from '@angular/router';
import { InfoCardComponent } from '@playerty/spider';

const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    ProductsRecommendationComponent,
    UserProgressbarComponent,
    TranslocoDirective,
    InfoCardComponent,
],
    declarations: [DashboardComponent],
    providers:[]
})
export class DashboardModule { }
