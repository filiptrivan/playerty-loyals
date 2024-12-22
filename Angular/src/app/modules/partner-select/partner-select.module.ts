import { RouterModule, Routes } from "@angular/router";
import { PartnerSelectComponent } from "./pages/partner-select.component";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/core/modules/primeng.module";
import { SoftDataTableComponent } from "src/app/core/components/soft-data-table/soft-data-table.component";
import { SoftControlsModule } from "src/app/core/controls/soft-controls.module";
import { CardSkeletonComponent } from "src/app/core/components/card-skeleton/card-skeleton.component";
import { IntermediateStepWrapperComponent } from "./partials/intermediate-step-wrapper.component";
import { SoftAutocompleteComponent } from "../../core/controls/soft-autocomplete/soft-autocomplete.component";
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
        SoftDataTableComponent,
        SoftControlsModule,
        CardSkeletonComponent,
        IntermediateStepWrapperComponent,
        SoftAutocompleteComponent,
        TranslocoDirective,
    ],
    declarations: [
        PartnerSelectComponent,
    ],
    providers:[]
})
export class PartnerSelectModule { }
