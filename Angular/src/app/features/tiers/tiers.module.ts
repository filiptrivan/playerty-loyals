import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TiersComponent } from "./pages/tiers.component";

const routes: Routes = [
    {
        path: 'tiers',
        component: TiersComponent,
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
export class TiersModule { }
