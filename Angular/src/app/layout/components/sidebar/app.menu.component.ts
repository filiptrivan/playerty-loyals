import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { MenuItem } from 'primeng/api';
import { PartnerService } from '../../../business/services/helpers/partner.service';
import { ConfigService } from 'src/app/business/services/config.service';

export interface SpiderMenuItem extends MenuItem{
    hasPermission?: (permissionCodes: string[]) => boolean;
    showPartnerDialog?: boolean; 
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    private partnerSubscription: Subscription | null = null;
    
    model: SpiderMenuItem[] = [];

    constructor(
        public layoutService: LayoutService, 
        private partnerService: PartnerService,
        private translocoService: TranslocoService,
        private config: ConfigService
    ) {
        
    }

    ngOnInit() {
        this.partnerSubscription = this.partnerService.partner$.subscribe(partner => {
            this.model = [
                {
                    items: [
                        {
                            label: `${partner?.name ?? this.config.companyName}`,
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
                    separator: true,
                    visible: true,
                },
                {
                    visible: true,
                    items: [
                        { 
                            label: this.translocoService.translate('Home'), 
                            icon: 'pi pi-fw pi-home', 
                            routerLink: [''],
                            visible: true,
                        },
                        {
                            label: this.translocoService.translate('TierList'),
                            icon: 'pi pi-fw pi-crown',
                            routerLink: [`/tiers`],
                            visible: partner != null
                        },
                        {
                            label: this.translocoService.translate('TransactionList'),
                            icon: 'pi pi-fw pi-wallet',
                            routerLink: [`/transactions`],
                            visible: true
                        },
                        {
                            label: this.translocoService.translate('PartnerList'),
                            icon: 'pi pi-fw pi-at',
                            routerLink: [`/partner-select`],
                            visible: true
                        },
                        {
                            label: this.translocoService.translate('SuperAdministration'),
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
                                    label: this.translocoService.translate('UserList'),
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${this.config.administrationSlug}/users`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    // } 
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('RoleList'),
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${this.config.administrationSlug}/roles`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('NotificationList'),
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${this.config.administrationSlug}/notifications`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('PartnerList'),
                                    icon: 'pi pi-fw pi-at',
                                    routerLink: [`/${this.config.administrationSlug}/partners`],
                                    visible: true
                                },
                            ]
                        },
                        {
                            label: this.translocoService.translate('Administration'),
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
                                    label: this.translocoService.translate('UserList'),
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/users`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                    // } 
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('RoleList'),
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/roles`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('NotificationList'),
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/notifications`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                    // }
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('SegmentationList'),
                                    icon: 'pi pi-fw pi-hashtag',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/segmentations`],
                                    visible: true,
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadSegmentation]))
                                    // }
                                },
                                {
                                    label: this.translocoService.translate('BusinessSystemList'),
                                    icon: 'pi pi-fw pi-shop',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/business-systems`],
                                    visible: true,
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadSegmentation]))
                                    // }
                                },
                                {
                                    label: this.translocoService.translate('TierList'),
                                    icon: 'pi pi-fw pi-crown',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/tiers`],
                                    // hasPermission: (permissionCodes: string[]): boolean => { 
                                    //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadTier]))
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
