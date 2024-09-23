import { Tier, UserExtended } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  currentUser: UserExtended;
  tierForTheCurrentUser: Tier;
  levelPercentForTheCurrentUser: number;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe(res => {
      this.currentUser = res;

      this.apiService.getTier(res.tierId).subscribe(res => {
        this.tierForTheCurrentUser = res;
        const levelPercentForTheCurrentUserHelper = Number((this.currentUser.points / res.validTo * 100).toFixed(2));
        if(levelPercentForTheCurrentUserHelper > 100){
          this.levelPercentForTheCurrentUser = 100;
        }else{
          this.levelPercentForTheCurrentUser = levelPercentForTheCurrentUserHelper;
        }
      })
    });
  }

}
