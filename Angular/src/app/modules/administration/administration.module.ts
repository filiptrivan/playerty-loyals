import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list.component';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { UserDetailsComponent } from './pages/user-details.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { CardSkeletonComponent } from "../../core/components/card-skeleton/card-skeleton.component";
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { RoleListComponent } from './pages/role-list.component';
import { RoleDetailsComponent } from './pages/role-details.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent,
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'roles',
        component: RoleListComponent,
    },
    {
        path: 'roles/:id',
        component: RoleDetailsComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PrimengModule,
        SoftDataTableComponent,
        SoftControlsModule,
        CardSkeletonComponent,
    ],
    declarations: [
        UserListComponent,
        UserDetailsComponent, 
        RoleListComponent,
        RoleDetailsComponent,
    ],
    providers:[]
})
export class AdministrationModule { }
