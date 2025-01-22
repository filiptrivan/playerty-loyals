import { RouterModule, Routes } from "@angular/router";
import { PartnerSelectComponent } from "./pages/partner-select.component";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/core/modules/primeng.module";
import { SpiderDataTableComponent } from "src/app/core/components/spider-data-table/spider-data-table.component";
import { SpiderControlsModule } from "src/app/core/controls/spider-controls.module";
import { CardSkeletonComponent } from "src/app/core/components/card-skeleton/card-skeleton.component";
import { IntermediateStepWrapperComponent } from "./partials/intermediate-step-wrapper.component";
import { SpiderAutocompleteComponent } from "../../core/controls/spider-autocomplete/spider-autocomplete.component";
import { TranslocoDirective } from "@jsverse/transloco";

const routes: Routes = [
    {
        path: 'partner-select',
        component: PartnerSelectComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
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
