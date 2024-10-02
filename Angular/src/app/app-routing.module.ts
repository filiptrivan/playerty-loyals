import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { PartnerGuard } from './core/guards/partner.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', 
                component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./layout/components/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard, PartnerGuard]
                    },
                    { 
                        path: 'documentation',
                        loadChildren: () => import('./layout/components/documentation/documentation.module').then(m => m.DocumentationModule),
                        canActivate: [AuthGuard, PartnerGuard]
                    },
                    { 
                        path: 'administration',
                        loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: 'partner-administration',
                        loadChildren: () => import('./modules/partner-administration/partner-administration.module').then(m => m.PartnerAdministrationModule),
                        canActivate: [AuthGuard, PartnerGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./modules/notification/notification.module').then(m => m.NotificationModule),
                        canActivate: [AuthGuard, PartnerGuard]
                    },
                ],
            },
            {
                path: '',
                children: [
                    { 
                        path: 'auth',
                        loadChildren: () => import('./layout/components/auth/auth.module').then(m => m.AuthModule),
                        canActivate: [NotAuthGuard],
                    },
                ],
            },
            {
                path: '',
                loadChildren: () => import('./modules/partner-select/partner-select.module').then(m => m.PartnerSelectModule),
                canActivate: [AuthGuard]
            },
            // { path: 'landing', loadChildren: () => import('./layout/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotfoundComponent },
            { path: '**', redirectTo: 'not-found' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
