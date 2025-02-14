import { LayoutService } from './../../../business/services/layout/layout.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TranslocoService } from '@jsverse/transloco';
import { Notification } from 'src/app/business/entities/business-entities.generated';
import { Menu } from 'primeng/menu';
import { NotificationDiscriminatorCodes } from 'src/app/business/enums/business-enums.generated';
import { TableResponse, TableFilter, TableFilterContext, SpiderMessageService } from '@playerty/spider';

@Component({
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  currentUserNotifications: TableResponse<Notification>;

  crudMenu: MenuItem[] = [];
  @ViewChild('menu') menu: Menu;
  lastMenuToggledNotification: Notification;

  tableFilter: TableFilter = new TableFilter({
    first: 0,
    rows: 10,
    filters: new Map<string, TableFilterContext[]>()
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private messageService: SpiderMessageService,
    private layoutService: LayoutService,
  ) {}

  ngOnInit() {
    this.crudMenu = [
      {label: this.translocoService.translate('Delete'), command: this.deleteNotificationForCurrentUser, icon: 'pi pi-trash'},
      {label: this.translocoService.translate('MarkAsRead'), command: this.markNotificationAsReadForCurrentUser, icon: 'pi pi-eye'},
      {label: this.translocoService.translate('MarkAsUnread'), command: this.markNotificationAsUnreadForCurrentUser, icon: 'pi pi-eye-slash'},
    ]

    this.getNotificationsForCurrentPartnerUser();
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.getNotificationsForCurrentPartnerUser();
  }
  
  getNotificationsForCurrentPartnerUser(){
    this.apiService.getNotificationsForCurrentPartnerUser(this.tableFilter).subscribe((res) => {
      this.currentUserNotifications = res;
    });
  }

  menuToggle($event: MouseEvent, notification: Notification) {
    this.menu.toggle($event);
    this.lastMenuToggledNotification = notification;
  }

  deleteNotificationForCurrentUser = () => {
    if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.Notification) {
      this.apiService.deleteNotificationForCurrentUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
    else if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.PartnerNotification) {
      this.apiService.deletePartnerNotificationForCurrentPartnerUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
  }

  markNotificationAsReadForCurrentUser = () => {
    if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.Notification) {
      this.apiService.markNotificationAsReadForCurrentUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
    else if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.PartnerNotification) {
      this.apiService.markPartnerNotificationAsReadForCurrentPartnerUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
  }

  markNotificationAsUnreadForCurrentUser = () => {
    if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.Notification) {
      this.apiService.markNotificationAsUnreadForCurrentUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
    else if (this.lastMenuToggledNotification.discriminator == NotificationDiscriminatorCodes.PartnerNotification) {
      this.apiService.markPartnerNotificationAsUnreadForCurrentPartnerUser(this.lastMenuToggledNotification.id, this.lastMenuToggledNotification.version).subscribe(() => {
        this.messageService.successMessage(this.translocoService.translate('SuccessfulAction'));
        this.onAfterNotificationCrudOperation();
      });
    }
  }

  onAfterNotificationCrudOperation = () => {
    this.getNotificationsForCurrentPartnerUser();
    this.layoutService.setUnreadNotificationsCountForCurrentUser();
  }

}
