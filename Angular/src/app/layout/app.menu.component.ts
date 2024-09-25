import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {

    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Tiers',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/tiers']
                    },
                    {
                        label: 'Notifications',
                        icon: 'pi pi-fw pi-bell',
                        routerLink: ['/notifications']
                    },
                    {
                        label: 'Points',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/points']
                    },
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'Login',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login']
                    //         },
                    //         {
                    //             label: 'Error',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/error']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/access']
                    //         }
                    //     ]
                    // },
                    {
                        label: 'Administration',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Users',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/administration/users']
                            },
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/administration/roles']
                            },
                            {
                                label: 'Tiers',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/administration/tiers']
                            },
                            {
                                label: 'Notifications',
                                icon: 'pi pi-fw pi-bell',
                                routerLink: ['/administration/notifications']
                            },
                        ]
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/not-found']
                    },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // },
                ]
            },
        ];
    }
}
