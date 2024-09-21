import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  cardTitle: string = $localize`:@@Homepage:Homepage`

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
