import { RouterModule, Routes } from "@angular/router";
import { PartnerSelectComponent } from "./pages/partner-select.component";
import { NgModule } from "@angular/core";
import { IntermediateStepWrapperComponent } from "./partials/intermediate-step-wrapper.component";
import { TranslocoDirective } from "@jsverse/transloco";
import { CommonModule } from "@angular/common";
import { PrimengModule, SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, SpiderlyAutocompleteComponent } from 'spiderly';

const routes: Routes = [
    {
        path: 'partner-select',
        component: PartnerSelectComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        PrimengModule,
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        IntermediateStepWrapperComponent,
        SpiderlyAutocompleteComponent,
        TranslocoDirective,
    ],
    declarations: [
        PartnerSelectComponent,
    ],
    providers:[]
})
export class PartnerSelectModule { }
