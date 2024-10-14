import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TableFilter } from 'src/app/business/entities/generated/security-entities.generated';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TableFilterContext } from 'src/app/core/entities/table-filter-context';
import { TableResponse } from 'src/app/core/entities/table-response';

@Component({
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  currentUserNotifications: TableResponse;

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
    this.loadNotifications();
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.loadNotifications();
  }
  
  loadNotifications(){
    this.apiService.loadNotificationListForTheCurrentPartnerUser(this.tableFilter).subscribe((res) => {
      this.currentUserNotifications = res;
    });
  }

}
