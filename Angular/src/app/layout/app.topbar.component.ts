import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { environment } from 'src/environments/environment';
import { filter, Subscription } from 'rxjs';
import { ApiService } from '../business/services/api/api.service';
import { CacheService } from '../core/services/cache.service';
import { PartnerUser, UserExtended } from '../business/entities/generated/business-entities.generated';
import { adjustColor } from '../core/services/helper-functions';
import { PartnerService } from '../business/services/helper/partner.service';

interface SoftMenuItem {
  label?: string;
  icon?: string;
  showSeparator?: boolean;
  onClick?: () => void;
  showNotificationBadge?: boolean;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
    ]
})
export class AppTopBarComponent implements OnDestroy {
    private userSubscription: Subscription | null = null;
    private partnerSubscription: Subscription | null = null;
    currentUser: UserExtended;
    currentPartnerUser: PartnerUser;
    currentUserNotificationsCount: number;
    menuItems: SoftMenuItem[] = [
      {
        label: $localize`:@@Profile:Profile`,
        icon: 'pi-user',
        showSeparator: true,
        onClick: () => {
          this.router.navigateByUrl(`/partner-administration/users/${this.currentPartnerUser.id}`);
        }
      },
      {
        label: $localize`:@@Notifications:Notifications`,
        icon: 'pi-bell',
        showNotificationBadge: true,
        onClick: () => {
          this.router.navigateByUrl(`/notifications`);
        },
      },
      {
        label: $localize`:@@Settings:Settings`,
        icon: 'pi-cog'
      },
      {
        label: $localize`:@@Logout:Logout`,
        icon: 'pi-sign-out',
        showSeparator: true,
        onClick: () => {
          this.authService.logout();
        }
      },
    ];
    avatarLabel: string;
    companyName: string;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @ViewChild('topbarprofiledropdownmenubutton') topbarProfileDropdownMenuButton!: ElementRef;

    constructor(
      public layoutService: LayoutService, 
      private authService: AuthService, 
      private apiService: ApiService,
      protected router: Router,
      private partnerService: PartnerService,
    ) { 
    }

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(res => {
        this.currentUser = res;
        this.avatarLabel = res?.email.charAt(0).toLocaleUpperCase();
    });
    
    this.partnerSubscription = this.partnerService.partner$.subscribe(partner => {
      this.companyName = partner?.name ?? environment.companyName;

      this.partnerService.adjustPartnerColor(partner);
    });

    this.apiService.getCurrentPartnerUser().subscribe(res => {
        this.currentPartnerUser = res;
    });


    this.apiService.getUnreadNotificationCountForTheCurrentPartnerUser().subscribe((count) => {
      this.currentUserNotificationsCount = count;
    });


    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.layoutService.state.profileDropdownSidebarVisible = false;
      });
  }

  onDocumentClick(event: any) {
    if (
      !this.menu.nativeElement.contains(event.target) 
    ) {
      if (this.layoutService.state.profileDropdownSidebarVisible == true) {
        this.layoutService.state.profileDropdownSidebarVisible = false;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.partnerSubscription) {
      this.partnerSubscription.unsubscribe();
    }
  }
}