import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { firstValueFrom, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from '../../../business/services/auth/auth.service';
import { SpiderMenuItem } from './app.menu.component';
import { ApiService } from '../../../business/services/api/api.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { PartnerService } from '../../../business/services/helpers/partner.service';
import { ConfigService } from 'src/app/business/services/config.service';
import { SpiderFormControl, PrimengOption, getPrimengCodebookListForAutocomplete } from '@playerty/spider';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-menuitem]',
    templateUrl: './app.menuitem.component.html',
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: SpiderMenuItem;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    active = false;

    private menuSourceSubscription: Subscription;

    private menuResetSubscription: Subscription;

    private permissionSubscription: Subscription | null = null;

    key: string = "";

    selectedPartner: SpiderFormControl = new SpiderFormControl<string>(null, { updateOn: 'change' });

    partnerOptions: PrimengOption[];

    constructor(
        public layoutService: LayoutService, 
        private cd: ChangeDetectorRef, 
        public router: Router, 
        private menuService: MenuService, 
        private authService: AuthService,
        private apiService: ApiService,
        private partnerService: PartnerService,
        private config: ConfigService
    ) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
                }
                else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.permissionSubscription = this.authService.currentPartnerUserPermissions$.subscribe((currentUserPermissionCodes: string[]) => {
            if (this.item && typeof this.item.hasPermission === 'function') {
                this.item.visible = this.item.hasPermission(currentUserPermissionCodes);
            }
        });
        
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

        if (activeRoute) {
            this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
        }
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled || event === null) {
            event.preventDefault();
            return;
        }

        // execute command
        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        }
        
        this.menuService.onMenuStateChange({ key: this.key });
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
    }

    @HostBinding('class.active-menuitem') 
    get activeClass() {
        return this.active && !this.root;
    }

    searchPartners(event: AutoCompleteCompleteEvent) {
        getPrimengCodebookListForAutocomplete(this.apiService.getPartnerWithSlugListForAutocomplete, 50, event.query).subscribe(po => {
            this.partnerOptions = po;
        });
    }

    async moreOptionsClick(){
        if (this.selectedPartner.value) {
            localStorage.setItem(this.config.partnerSlugKey, this.selectedPartner.value);
            await firstValueFrom(this.partnerService.getCurrentPartner());
            await firstValueFrom(this.partnerService.getCurrentPartnerUser());
            this.router.navigate(['/'], { queryParams: { [this.config.partnerParamKey]: this.selectedPartner.value } });
        }
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }

        if (this.permissionSubscription) {
            this.permissionSubscription.unsubscribe();
        }
    }
}
