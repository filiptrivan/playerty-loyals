import { RouterModule, Routes } from "@angular/router";
import { NotificationComponent } from "./pages/notification.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { PrimengModule, SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent } from 'spiderly';

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
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
    ],
    declarations: [
        NotificationComponent,
    ],
    providers:[]
})
export class NotificationModule { }
