import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs';
import { User } from '../business/entities/generated/security-entities.generated';
import { Namebook } from '../business/entities/generated/namebook.generated';

interface SoftMenuItem {
  label?: string;
  icon?: string;
  showSeparator?: boolean;
  onClick?: () => void
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    currentUser: User;
    currentUserNotifications: Namebook[];
    menuItems: SoftMenuItem[] = [
      {
        label: $localize`:@@Profile:Profile`,
        icon: 'pi-user',
        showSeparator: true,
        onClick: () => {
          this.goToUser();
        }
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
          this.logout();
        }
      },
    ];
    avatarLabel: string;
    companyName: string = environment.companyName;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @ViewChild('topbarprofiledropdownmenubutton') topbarProfileDropdownMenuButton!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService, protected router: Router) { }

  ngOnInit(){
    this.authService.user$.subscribe(res => {
        this.currentUser = res;
        this.avatarLabel = res?.email.charAt(0).toLocaleUpperCase();
    });
    this.authService.notifications$.subscribe(res => {
      console.log(res)
        this.currentUserNotifications = res;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.layoutService.state.profileDropdownSidebarVisible = false;
      });
  }
    
  logout(){
    this.authService.logout();
  }

  goToUser(){
    this.router.navigateByUrl(`/administration/users/${this.currentUser.id}`);
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
}