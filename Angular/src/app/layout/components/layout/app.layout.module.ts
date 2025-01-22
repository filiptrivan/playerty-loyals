import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from "./app.layout.component";
import { PrimengModule } from '../../../core/modules/primeng.module';
import { BrowserModule } from '@angular/platform-browser';
import { SpiderAutocompleteComponent } from "../../../core/controls/spider-autocomplete/spider-autocomplete.component";
import { TranslocoDirective } from '@jsverse/transloco';
import { AppFooterComponent } from '../../../core/components/footer/app.footer.component';
import { AppMenuComponent } from '../sidebar/app.menu.component';
import { AppMenuitemComponent } from '../sidebar/app.menuitem.component';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import { AppTopBarComponent } from '../topbar/app.topbar.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule,
        PrimengModule,
        TranslocoDirective,
        SpiderAutocompleteComponent,
    ],
    exports: [
        FormsModule,
        AppLayoutComponent,
        PrimengModule,
    ]
})
export class AppLayoutModule { }
