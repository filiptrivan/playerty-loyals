import { AdministrationModule } from './modules/administration/administration.module';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/guards/auth.guard';

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
                     canActivate: [AuthGuard]
                    },
                    { 
                     path: 'documentation',
                     loadChildren: () => import('./layout/components/documentation/documentation.module').then(m => m.DocumentationModule),
                     canActivate: [AuthGuard]
                    },
                    { 
                     path: 'administration',
                     loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
                     canActivate: [AuthGuard]
                    },
                    { 
                     path: '',
                     loadChildren: () => import('./modules/notification/notification.module').then(m => m.NotificationModule),
                     canActivate: [AuthGuard]
                    },
                ],
            },
            {
                path: '', 
                children: [
                    { path: 'auth', loadChildren: () => import('./layout/components/auth/auth.module').then(m => m.AuthModule) },
                ],
            },
            { path: 'landing', loadChildren: () => import('./layout/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotfoundComponent },
            { path: '**', redirectTo: '/not-found' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
