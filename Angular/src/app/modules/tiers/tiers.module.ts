import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/layout/modules/primeng.module";
import { SoftDataTableComponent } from "src/app/core/components/soft-data-table/soft-data-table.component";
import { SoftControlsModule } from "src/app/core/controls/soft-controls.module";
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
        SoftDataTableComponent,
        SoftControlsModule,
        CardSkeletonComponent,
        TimelineIndexProgressbarComponent
    ],
    declarations: [
        // TiersComponent,
    ],
    providers:[]
})
export class TiersModule { }
