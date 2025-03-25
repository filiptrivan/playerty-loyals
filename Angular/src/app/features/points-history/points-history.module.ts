import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PointsHistoryComponent } from "./pages/points-history.component";

const routes: Routes = [
    {
        path: 'points-history',
        component: PointsHistoryComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    declarations: [
    ],
    providers:[]
})
export class PointsHistoryModule { }
