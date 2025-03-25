import { PartnerUser, Tier } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from '../../business/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private partnerUserSubscription: Subscription | null = null;
  
  currentPartnerUser: PartnerUser;
  currentPartnerUserTier: Tier;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.partnerUserSubscription = this.authService.currentPartnerUser$.subscribe(currentPartnerUser => {
      this.currentPartnerUser = currentPartnerUser;
      
      if (currentPartnerUser?.tierId) {
        this.apiService.getTierForCurrentPartnerUser().subscribe(tier => {
          this.currentPartnerUserTier = tier;
        });
      } else {
        this.currentPartnerUserTier = null; // FT: This line is mandatory.
      }
    });
  }

  ngOnDestroy(): void {
    if (this.partnerUserSubscription) {
      this.partnerUserSubscription.unsubscribe();
    }
  }

}
