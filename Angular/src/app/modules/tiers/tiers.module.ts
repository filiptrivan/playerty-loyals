import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/core/modules/primeng.module";
import { SpiderDataTableComponent } from "src/app/core/components/spider-data-table/spider-data-table.component";
import { SpiderControlsModule } from "src/app/core/controls/spider-controls.module";
import { CardSkeletonComponent } from "src/app/core/components/card-skeleton/card-skeleton.component";
import { TiersComponent } from "./pages/tiers.component";
import { TimelineIndexProgressbarComponent } from "src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component";

const routes: Routes = [
    {
        path: 'tiers',
        component: TiersComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PrimengModule,
        SpiderDataTableComponent,
        SpiderControlsModule,
        CardSkeletonComponent,
        TimelineIndexProgressbarComponent
    ],
    declarations: [
        // TiersComponent,
    ],
    providers:[]
})
export class TiersModule { }
