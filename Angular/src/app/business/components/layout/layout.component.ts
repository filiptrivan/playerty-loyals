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

    override onAfterNgDestroy = () => {
        if (this.partnerSubscription) {
            this.partnerSubscription.unsubscribe();
        }
    }
}
