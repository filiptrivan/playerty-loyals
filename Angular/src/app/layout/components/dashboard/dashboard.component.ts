import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { PartnerService } from 'src/app/business/services/helper/partner.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private partnerSubscription: Subscription | null = null;
  private partnerUserSubscription: Subscription | null = null;
  private permissionsSubscription: Subscription | null = null;
  
  currentPartnertUser: PartnerUser;
  tierForTheCurrentUser: Tier;
  levelPercentForTheCurrentUser: number;

  currentPartnerUser: PartnerUser;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService,
    private messageService: SoftMessageService,
    private authService: AuthService,
    private partnerService: PartnerService,
  ) {}

  ngOnInit() {
    this.partnerUserSubscription = this.partnerService.currentPartnerUser$.subscribe(currentPartnerUser => {
      this.currentPartnerUser = currentPartnerUser;

      if (currentPartnerUser) {
        this.handleCurrentPartnerUser(currentPartnerUser);
      }
    });

    this.partnerSubscription = this.partnerService.partner$.subscribe(currentPartner => {
      if (currentPartner === null) {
        this.handleMissingPartner();
      } 
    });
  }

  private async handleMissingPartner() {
    const permissionCodes: string[] = await firstValueFrom(this.authService.currentUserPermissions$);
    if (permissionCodes != null && permissionCodes.length === 0) {
      this.authService.navigateToSelectPartner();
    }
  }
  
  private handleCurrentPartnerUser(currentPartnerUser: PartnerUser) {
    if (currentPartnerUser.tierId === null) {
      // FT: Commented it out because, on every user change (refresh token) this is getting displayed
      // this.messageService.warningMessage($localize`:@@ThePartnerHasNotMadeAnyTiersYet:The partner has not made any tiers yet.`);
      this.tierForTheCurrentUser = null;
      this.levelPercentForTheCurrentUser = 0;
    } else {
      this.apiService.getTier(currentPartnerUser.tierId).subscribe(tier => {
        this.tierForTheCurrentUser = tier;
        const levelPercentForTheCurrentUserHelper = Number((currentPartnerUser.points / tier.validTo * 100).toFixed(2));
        this.levelPercentForTheCurrentUser = Math.min(levelPercentForTheCurrentUserHelper, 100);
      });
    }
  }

  // FT HACK: https://stackoverflow.com/questions/51682170/angular-interpolated-value-display-not-updating-when-changed-in-timeout
  currentPartnerUserPoints(){
    return this.currentPartnerUser.points;
  }

  ngOnDestroy(): void {
    if (this.partnerSubscription) {
      this.partnerSubscription.unsubscribe();
    }
    if (this.partnerUserSubscription) {
      this.partnerUserSubscription.unsubscribe();
    }
    if (this.permissionsSubscription) {
      this.permissionsSubscription.unsubscribe();
    }
  }
}
