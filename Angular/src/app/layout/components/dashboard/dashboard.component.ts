import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  currentUser: PartnerUser;
  tierForTheCurrentUser: Tier;
  levelPercentForTheCurrentUser: number;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService,
    private messageService: SoftMessageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.apiService.getCurrentPartnerUser().subscribe(res => {
      this.currentUser = res;

      if(res == null){
        this.messageService.warningMessage($localize`:@@ThePartnerDoesNotExist:The partner doesn't exist.`)
        this.authService.navigateToSelectPartner();
      }
      else if(res.tierId == null){
        this.messageService.warningMessage($localize`:@@ThePartnerHasNotMadeAnyTiersYet:The partner has not made any tiers yet.`)
      }else{
        this.apiService.getTier(res.tierId).subscribe(res => {
          this.tierForTheCurrentUser = res;
          const levelPercentForTheCurrentUserHelper = Number((this.currentUser.points / res.validTo * 100).toFixed(2));
          if(levelPercentForTheCurrentUserHelper > 100){
            this.levelPercentForTheCurrentUser = 100;
          }else{
            this.levelPercentForTheCurrentUser = levelPercentForTheCurrentUserHelper;
          }
        })
      }

    });
  }

}
