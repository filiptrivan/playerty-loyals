import { TranslocoService } from '@jsverse/transloco';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from 'src/app/business/services/config.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent, LayoutBaseComponent, AppSidebarComponent, AppTopBarComponent, LayoutBaseService, PrimengModule, SpiderMenuItem} from '@playerty/spider';
import { CommonModule } from '@angular/common';
import { BusinessPermissionCodes } from '../../enums/business-enums.generated';
import { SecurityPermissionCodes } from '@playerty/spider';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        PrimengModule,
        FooterComponent,
        AppSidebarComponent,
        AppTopBarComponent,
    ]
})
export class LayoutComponent extends LayoutBaseComponent implements OnInit, OnDestroy {
    private partnerSubscription: Subscription | null = null;

    menu: SpiderMenuItem[];

    constructor(
        protected override layoutService: LayoutBaseService, 
        protected override renderer: Renderer2, 
        protected override router: Router,
        private authService: AuthService,
        private config: ConfigService,
        private translocoService: TranslocoService
    ) {
        super(layoutService, renderer, router);
    }

    ngOnInit(): void {
        this.partnerSubscription = this.authService.partner$.subscribe(partner => {
            this.menu = [
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
                            visible: partner != null
                        },
                        {
                            label: this.translocoService.translate('PartnerList'),
                            icon: 'pi pi-fw pi-at',
                            routerLink: [`/partner-select`],
                            visible: partner != null
                        },
                        {
                            label: this.translocoService.translate('SuperAdministration'),
                            icon: 'pi pi-fw pi-cog',
                            visible: true,
                            hasPermission: (permissionCodes: string[]): boolean => { 
                                return (permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended) ||
                                        permissionCodes?.includes(SecurityPermissionCodes.ReadRole) ||
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadTier) || 
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadNotification))
                            },
                            items: [
                                {
                                    label: this.translocoService.translate('UserList'),
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${this.config.administrationSlug}/users`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended))
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('RoleList'),
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${this.config.administrationSlug}/roles`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(SecurityPermissionCodes.ReadRole))
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('NotificationList'),
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${this.config.administrationSlug}/notifications`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(BusinessPermissionCodes.ReadNotification))
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('PartnerList'),
                                    icon: 'pi pi-fw pi-at',
                                    routerLink: [`/${this.config.administrationSlug}/partners`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (permissionCodes?.includes(BusinessPermissionCodes.ReadPartner))
                                    },
                                    visible: true
                                },
                            ]
                        },
                        {
                            label: this.translocoService.translate('Administration'),
                            icon: 'pi pi-fw pi-cog',
                            hasPermission: (permissionCodes: string[]): boolean => { 
                                return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadPartner) ||
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerUser) ||
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerRole) ||
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerNotification) || 
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadCurrentPartner) || 
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadSegmentation) || 
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadBusinessSystem) || 
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadTier)
                                    ) &&
                                    partner != null
                            },
                            visible: partner != null,
                            items: [
                                {
                                    label: this.translocoService.translate('PartnerProfile'),
                                    icon: 'pi pi-fw pi-at',
                                    routerLink: [`/${this.config.administrationSlug}/partners/${partner?.id}`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadCurrentPartner) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true
                                },
                                {
                                    label: this.translocoService.translate('UserList'),
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/users`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerUser) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('RoleList'),
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/roles`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerRole) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('NotificationList'),
                                    icon: 'pi pi-fw pi-bell',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/notifications`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartnerNotification) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('SegmentationList'),
                                    icon: 'pi pi-fw pi-hashtag',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/segmentations`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadSegmentation) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('BusinessSystemList'),
                                    icon: 'pi pi-fw pi-shop',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/business-systems`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadBusinessSystem) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                                {
                                    label: this.translocoService.translate('TierList'),
                                    icon: 'pi pi-fw pi-crown',
                                    routerLink: [`/${this.config.partnerAdministrationSlug}/tiers`],
                                    hasPermission: (permissionCodes: string[]): boolean => { 
                                        return (
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadTier) ||
                                            permissionCodes?.includes(BusinessPermissionCodes.ReadPartner)
                                        )
                                    },
                                    visible: true,
                                },
                            ]
                        },
                    ]
                },
            ];
        });
    }

    override onAfterNgDestroy = () => {
        if (this.partnerSubscription) {
            this.partnerSubscription.unsubscribe();
        }
    }
}
