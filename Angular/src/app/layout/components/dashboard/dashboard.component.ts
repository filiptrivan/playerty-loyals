import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  reportTypes: any[] = [
    { Icon: 'pi pi-user', Title: 'Administration', link: 'administration/users' },
    // { Icon: 'pi pi-folder', Title: 'Folder' }
  ];

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // throw Error("TEST")
  }

  auth(){
    this.apiService.getCurrentUser().subscribe();
  }
}
