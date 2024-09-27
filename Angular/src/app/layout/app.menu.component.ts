import { ApiService } from './../business/services/api/api.service';
import { AuthService } from './../core/services/auth.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { PermissionCodes } from '../business/enums/generated/business-enums.generated';

export interface SoftMenuItem extends MenuItem{
    hasPermission?: (permissionCodes: string[]) => boolean;
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    currentUserPermissions: string[];
    model: SoftMenuItem[] = [];

    constructor(
        public layoutService: LayoutService, 
        private authService: AuthService,
        private apiService: ApiService
    ) {
        this.apiService.getCurrentUserPermissionCodes().subscribe((permissionCodes: string[]) => {
            this.authService._currentUserPermissions.next(permissionCodes);
            console.log(permissionCodes)
            this.currentUserPermissions = permissionCodes;
        });
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { 
                        label: 'Dashboard', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/'],
                        visible: true,
                    }
                ],
                visible: true,
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                visible: true,
                items: [
                    {
                        label: 'Tiers',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/tiers'],
                        visible: true
                    },
                    {
                        label: 'Notifications',
                        icon: 'pi pi-fw pi-bell',
                        routerLink: ['/notifications'],
                        visible: true
                    },
                    {
                        label: 'Points',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/points'],
                        visible: true
                    },
                    {
                        label: 'Administration',
                        icon: 'pi pi-fw pi-cog',
                        hasPermission: (permissionCodes: string[]): boolean => { 
                            return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]) ||
                                    permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]) ||
                                    permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]) || 
                                    permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification])) 
                        },
                        items: [
                            {
                                label: 'Users',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/administration/users'],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                } 
                            },
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/administration/roles'],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                }
                            },
                            {
                                label: 'Tiers',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/administration/tiers'],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]))
                                }
                            },
                            {
                                label: 'Notifications',
                                icon: 'pi pi-fw pi-bell',
                                routerLink: ['/administration/notifications'],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                }
                            },
                        ]
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/not-found'],
                        visible: true
                    },
                ]
            },
        ];
    }
}
