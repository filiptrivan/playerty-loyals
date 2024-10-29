import { firstValueFrom, Subscription } from 'rxjs';
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
    private partnerSubscription: Subscription | null = null;
    
    model: SoftMenuItem[] = [];

    constructor(
        public layoutService: LayoutService, 
        private authService: AuthService,
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        
    }

    ngOnInit() {
        this.partnerSubscription = this.partnerService.partner$.subscribe(partner => {            
            this.model = [
                {
                    label: 'Partner',
                    items: [
                        {
                            label: `${partner?.name ?? environment.companyName}`,
                            icon: 'pi pi-fw pi-at', 
                            visible: true,
                            items: [
                                {
                                    showPartnerDialog: true,
                                }
                            ]
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
                            label: 'Dashboard', 
                            icon: 'pi pi-fw pi-home', 
                            routerLink: [''],
                            visible: true,
                        },
                        {
                            label: 'Tiers',
                            icon: 'pi pi-fw pi-sitemap',
                            routerLink: [`/tiers`],
                            visible: partner != null
                        },
                        // {
                        //     label: 'Points',
                        //     icon: 'pi pi-fw pi-heart',
                        //     routerLink: [`/points`],
                        //     visible: true
                        // },
                        {
                            label: 'Super administration',
                            icon: 'pi pi-fw pi-cog',
                            visible: true,
                            // hasPermission: (permissionCodes: string[]): boolean => { 
                            //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]) ||
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]) ||
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]) || 
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                            // },
                            items: [
                                {
                                    label: 'Users',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${environment.administrationSlug}/users`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    // } 
                                    visible: true,
                                },
                                {
                                    label: 'Roles',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${environment.administrationSlug}/roles`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: 'Notifications',
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${environment.administrationSlug}/notifications`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: 'Partners',
                                    icon: 'pi pi-fw pi-at',
                                    routerLink: [`/${environment.administrationSlug}/partners`],
                                    visible: true
                                },
                            ]
                        },
                        {
                            label: 'Administration',
                            icon: 'pi pi-fw pi-cog',
                            // hasPermission: (permissionCodes: string[]): boolean => { 
                            //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]) ||
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]) ||
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]) || 
                            //             permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification])) &&
                            //             partner != null
                            // },
                            visible: true,
                            items: [
                                {
                                    label: 'Users',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${environment.partnerAdministrationSlug}/users`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    // } 
                                    visible: true,
                                },
                                {
                                    label: 'Roles',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${environment.partnerAdministrationSlug}/roles`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: 'Segmentations',
                                    icon: 'pi pi-fw pi-hashtag',
                                    routerLink: [`/${environment.partnerAdministrationSlug}/segmentations`],
                                    visible: true,
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadSegmentation]))
                                    // }
                                },
                                {
                                    label: 'Tiers',
                                    icon: 'pi pi-fw pi-sitemap',
                                    routerLink: [`/${environment.partnerAdministrationSlug}/tiers`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: 'Notifications',
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${environment.partnerAdministrationSlug}/notifications`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    // }
                                    visible: true,
                                },
                            ]
                        },
                    ]
                },
            ];
        });
    }


    ngOnDestroy(): void {
        if (this.partnerSubscription) {
          this.partnerSubscription.unsubscribe();
        }
    }

}
