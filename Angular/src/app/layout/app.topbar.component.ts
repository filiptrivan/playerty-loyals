import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { environment } from 'src/environments/environment';
import { filter, Subscription, switchMap } from 'rxjs';
import { ApiService } from '../business/services/api/api.service';
import { PartnerUser, UserExtended } from '../business/entities/generated/business-entities.generated';
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
    private partnerUserSubscription: Subscription | null = null;

    currentUser: UserExtended;
    currentPartnerUser: PartnerUser;
    currentUserNotificationsCount: number;
    menuItems: SoftMenuItem[] = [
      {
        label: $localize`:@@Profile:Profile`,
        icon: 'pi-user',
        showSeparator: true,
        onClick: () => {
          this.routeToUserPage();
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
      // {
      //   label: $localize`:@@Settings:Settings`,
      //   icon: 'pi-cog'
      // },
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
    showProfileIcon: boolean = false;

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

  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(currentUser => {
        this.currentUser = currentUser;
        this.avatarLabel = currentUser?.email.charAt(0).toLocaleUpperCase();
    });
    
    this.partnerUserSubscription = this.partnerService.currentPartnerUser$.subscribe(currentPartnerUser => {
      this.currentPartnerUser = currentPartnerUser;
    });

    this.partnerSubscription = this.partnerService.partner$.subscribe(currentPartner => {
      this.companyName = currentPartner?.name ?? environment.companyName;

      if (currentPartner !== undefined) {
        this.apiService.getUnreadNotificationCountForTheCurrentPartnerUser().subscribe(count => {
          this.currentUserNotificationsCount = count;
        });
      }

      // FT: Because user loads first we would always have small flick with profile color if don't do this
      if (currentPartner === null) { 
        this.showProfileIcon = this.currentUser != null;
      }else if (currentPartner !== undefined){
        this.showProfileIcon = true;
      }
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

  routeToUserPage(){
    if (this.currentPartnerUser == null) {
      this.router.navigateByUrl(`/administration/users/${this.currentUser.id}`);
    }else{
      this.router.navigateByUrl(`/partner-administration/users/${this.currentPartnerUser.id}`);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.partnerSubscription) {
      this.partnerSubscription.unsubscribe();
    }
    if (this.partnerUserSubscription) {
      this.partnerUserSubscription.unsubscribe();
    }
  }

}