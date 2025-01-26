import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from "./app.layout.component";
import { BrowserModule } from '@angular/platform-browser';
import { TranslocoDirective } from '@jsverse/transloco';
import { AppMenuComponent } from '../sidebar/app.menu.component';
import { AppMenuitemComponent } from '../sidebar/app.menuitem.component';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import { AppTopBarComponent } from '../topbar/app.topbar.component';
import { AppFooterComponent, PrimengModule, SpiderAutocompleteComponent } from '@playerty/spider';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
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
        AppFooterComponent,
    ],
    exports: [
        FormsModule,
        AppLayoutComponent,
        PrimengModule,
    ]
})
export class AppLayoutModule { }
