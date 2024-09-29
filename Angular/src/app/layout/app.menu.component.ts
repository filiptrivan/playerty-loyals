import { ApiService } from './../business/services/api/api.service';
import { AuthService } from './../core/services/auth.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';
import { PermissionCodes } from '../business/enums/generated/business-enums.generated';
import { PartnerService } from '../business/services/helper/partner.service';

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
                                // queryParams: { [environment.partnerParamKey]: res?.slug },
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
                            // queryParams: { [environment.partnerParamKey]: res?.slug },
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
                            // queryParams: { [environment.partnerParamKey]: res?.slug },
                            visible: true
                        },
                        {
                            label: 'Notifications',
                            icon: 'pi pi-fw pi-bell',
                            routerLink: [`/notifications`],
                            // queryParams: { [environment.partnerParamKey]: res?.slug },
                            visible: true
                        },
                        {
                            label: 'Points',
                            icon: 'pi pi-fw pi-heart',
                            routerLink: [`/points`],
                            // queryParams: { [environment.partnerParamKey]: res?.slug },
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
                                    // queryParams: { [environment.partnerParamKey]: res?.slug },
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    } 
                                },
                                {
                                    label: 'Roles',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: ['/administration/roles'],
                                    // queryParams: { [environment.partnerParamKey]: res?.slug },
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    }
                                },
                                {
                                    label: 'Tiers',
                                    icon: 'pi pi-fw pi-sitemap',
                                    routerLink: ['/administration/tiers'],
                                    // queryParams: { [environment.partnerParamKey]: res?.slug },
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]))
                                    }
                                },
                                {
                                    label: 'Notifications',
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: ['/administration/notifications'],
                                    // queryParams: { [environment.partnerParamKey]: res?.slug },
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
                            // queryParams: { [environment.partnerParamKey]: res?.slug },
                            visible: true
                        },
                    ]
                },
            ];
        });
    }
}
