import { RouterModule, Routes } from "@angular/router";
import { NotificationComponent } from "./pages/notification.component";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/core/modules/primeng.module";
import { SpiderDataTableComponent } from "src/app/core/components/spider-data-table/spider-data-table.component";
import { SpiderControlsModule } from "src/app/core/controls/spider-controls.module";
import { CardSkeletonComponent } from "src/app/core/components/card-skeleton/card-skeleton.component";
import { TranslocoDirective } from "@jsverse/transloco";

const routes: Routes = [
    {
        path: 'notifications',
        component: NotificationComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PrimengModule,
        SpiderDataTableComponent,
        SpiderControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
    ],
    declarations: [
        NotificationComponent,
    ],
    providers:[]
})
export class NotificationModule { }
