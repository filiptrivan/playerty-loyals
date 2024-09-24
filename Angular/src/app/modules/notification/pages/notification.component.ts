import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Notification } from 'src/app/business/entities/generated/security-entities.generated';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TableFilter } from 'src/app/business/entities/generated/table-filter.generated';
import { TableFilterContext } from 'src/app/core/entities/table-filter-context';
import { TableResult } from 'src/app/core/entities/table-result';

@Component({
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  currentUserNotifications: TableResult;

  crudMenu: MenuItem[] = [
    {label: $localize`:@@Delete:Delete`, icon: 'pi pi-trash'},
    {label: $localize`:@@MarkAsRead:Mark as read`, icon: 'pi pi-eye'},
    {label: $localize`:@@MarkAsUnread:Mark as unread`, icon: 'pi pi-eye-slash'},
  ];

  tableFilter: TableFilter = new TableFilter({
    first: 0,
    rows: 10,
    filters: new Map<string, TableFilterContext[]>()
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.apiService.loadNotificationListForTheCurrentUser(this.tableFilter).subscribe((res) => {
      console.log(res)
      this.currentUserNotifications = res;
    });
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.apiService.loadNotificationListForTheCurrentUser(this.tableFilter).subscribe((res) => {
      this.currentUserNotifications = res;
    });
  }

}
