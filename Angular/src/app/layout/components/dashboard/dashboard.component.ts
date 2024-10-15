import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { forkJoin } from 'rxjs';
import { TimelineIndexProgressbarComponent } from 'src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component';
import { TierWithIndex } from 'src/app/modules/tiers/pages/tiers.component';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  currentUser: PartnerUser;
  tierForTheCurrentUser: Tier;
  levelPercentForTheCurrentUser: number;

  currentPartnerUser: PartnerUser;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService,
    private messageService: SoftMessageService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    forkJoin({
      tiers: this.apiService.loadTierListFromLargestToSmallest(),
      tierForTheCurrentPartnerUser: this.apiService.getTierForTheCurrentPartnerUser(),
      currentPartnerUser: this.apiService.getCurrentPartnerUser(),
    }).subscribe(({ tiers, tierForTheCurrentPartnerUser, currentPartnerUser }) => {
      this.currentUser = currentPartnerUser;

      if(currentPartnerUser == null){
        this.messageService.warningMessage($localize`:@@ThePartnerDoesNotExist:The partner doesn't exist.`)
        this.authService.navigateToSelectPartner();
      }
      else if(currentPartnerUser.tierId == null){
        this.messageService.warningMessage($localize`:@@ThePartnerHasNotMadeAnyTiersYet:The partner has not made any tiers yet.`)
      }else{
        this.apiService.getTier(currentPartnerUser.tierId).subscribe(currentPartnerUser => {
          this.tierForTheCurrentUser = currentPartnerUser;
          const levelPercentForTheCurrentUserHelper = Number((this.currentUser.points / currentPartnerUser.validTo * 100).toFixed(2));

          this.levelPercentForTheCurrentUser = Math.min(levelPercentForTheCurrentUserHelper, 100);
        })
      }
    });
  }
}
