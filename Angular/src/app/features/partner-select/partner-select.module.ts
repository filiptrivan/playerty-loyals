import { RouterModule, Routes } from "@angular/router";
import { PartnerSelectComponent } from "./pages/partner-select.component";
import { NgModule } from "@angular/core";
import { IntermediateStepWrapperComponent } from "./partials/intermediate-step-wrapper.component";
import { TranslocoDirective } from "@jsverse/transloco";
import { CommonModule } from "@angular/common";
import { PrimengModule, SpiderDataTableComponent, SpiderControlsModule, CardSkeletonComponent, SpiderAutocompleteComponent } from '@playerty/spider';

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
        SpiderDataTableComponent,
        SpiderControlsModule,
        CardSkeletonComponent,
        IntermediateStepWrapperComponent,
        SpiderAutocompleteComponent,
        TranslocoDirective,
    ],
    declarations: [
        PartnerSelectComponent,
    ],
    providers:[]
})
export class PartnerSelectModule { }
