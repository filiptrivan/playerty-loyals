import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, NotAuthGuard, NotFoundComponent } from '@playerty/spider';
import { LayoutComponent } from './business/components/layout/layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', 
                component: LayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: 'administration',
                        loadChildren: () => import('./features/administration/administration.module').then(m => m.AdministrationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: 'partner-administration',
                        loadChildren: () => import('./features/partner-administration/partner-administration.module').then(m => m.PartnerAdministrationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/partner-select/partner-select.module').then(m => m.PartnerSelectModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/tiers/tiers.module').then(m => m.TiersModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule),
                        canActivate: [AuthGuard]
                    },
                ],
            },
            {
                path: '',
                children: [
                    { 
                        path: 'auth',
                        loadChildren: () => import('@playerty/spider').then(m => m.AuthModule),
                        canActivate: [NotAuthGuard],
                    },
                ],
            },
            // { path: 'landing', loadChildren: () => import('./layout/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotFoundComponent },
            { path: '**', redirectTo: 'not-found' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
