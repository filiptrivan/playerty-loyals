import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TransactionsComponent } from "./pages/transactions.component";

const routes: Routes = [
    {
        path: 'transactions',
        component: TransactionsComponent,
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
export class TransactionsModule { }
