import { NgModule } from "@angular/core";
import { SoftCalendarComponent } from "./soft-calendar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "src/app/layout/modules/primeng.module";

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
    ],
    declarations: [
        SoftCalendarComponent
    ],
    exports: [
        SoftCalendarComponent
    ],
    providers:[]
})
export class SoftCalendarModule { }
