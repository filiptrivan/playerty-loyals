import { ApiService } from './../business/services/api/api.service';
import { AuthService } from './../core/services/auth.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';
import { PermissionCodes } from '../business/enums/generated/business-enums.generated';
import { PartnerService } from '../business/services/helper/partner.service';
import { environment } from 'src/environments/environment';

export interface SoftMenuItem extends MenuItem{
    hasPermission?: (permissionCodes: string[]) => boolean;
    showPartnerDialog?: boolean; 
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
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        this.apiService.getCurrentUserPermissionCodes().subscribe((permissionCodes: string[]) => {
            this.authService._currentUserPermissions.next(permissionCodes);
            this.currentUserPermissions = permissionCodes;
        });
    }

    ngOnInit() {
        this.apiService.getCurrentPartner().subscribe(res => {
            if (res == null)
                this.authService.navigateToSelectPartner();

            this.model = [
                {
                    label: 'Partner',
                    items: [
                        {
                            // pi-shield ; pi-users ; pi-briefcase ; pi-at
                            label: `${res?.name ?? ''}`,
                            icon: 'pi pi-fw pi-at', 
                            // command: (event) => {
                            //     event.item['showPartnerDialog'] = !event.item['showPartnerDialog'];
                            // },
                            visible: true,
                            items: [
                                {
                                    showPartnerDialog: true,
                                }
                                // routerLink: [''],
                            ]
                        }
                    ],
                    visible: true,
                },
                {
                    label: 'Home',
                    items: [
                        { 
                            label: 'Dashboard', 
                            icon: 'pi pi-fw pi-home', 
                            routerLink: [''],
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
                            routerLink: [`/tiers`],
                            visible: true
                        },
                        {
                            label: 'Notifications',
                            icon: 'pi pi-fw pi-bell',
                            routerLink: [`/notifications`],
                            visible: true
                        },
                        {
                            label: 'Points',
                            icon: 'pi pi-fw pi-heart',
                            routerLink: [`/points`],
                            visible: true
                        },
                        {
                            label: 'Super administration',
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
                                    routerLink: [`/${environment.superAdministrationSlug}/users`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    } 
                                },
                                {
                                    label: 'Roles',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${environment.superAdministrationSlug}/roles`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    }
                                },
                                {
                                    label: 'Notifications',
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${environment.superAdministrationSlug}/notifications`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    }
                                },
                            ]
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
                                    routerLink: [`/${environment.administrationSlug}/users`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    } 
                                },
                                {
                                    label: 'Roles',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${environment.administrationSlug}/roles`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    }
                                },
                                {
                                    label: 'Tiers',
                                    icon: 'pi pi-fw pi-sitemap',
                                    routerLink: [`/${environment.administrationSlug}/tiers`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]))
                                    }
                                },
                                {
                                    label: 'Notifications',
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${environment.administrationSlug}/notifications`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    }
                                },
                            ]
                        },
                        {
                            label: 'Not Found',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            routerLink: [`/not-found`],
                            visible: true
                        },
                    ]
                },
            ];
        });
    }
}
