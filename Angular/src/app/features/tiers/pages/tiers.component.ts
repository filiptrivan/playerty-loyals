import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerUser, Tier } from 'src/app/business/entities/business-entities.generated';
import { forkJoin, Subscription } from 'rxjs';
import { TranslocoDirective } from '@jsverse/transloco';
import { TimelineIndexProgressbarComponent } from 'src/app/features/tiers/partials/tier-timeline-index-progressbar.component';
import { CommonModule } from '@angular/common';
import { PrimengModule, SpiderControlsModule } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';

@Component({
  selector: 'tiers',
  templateUrl: './tiers.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PrimengModule,
    SpiderControlsModule,
    TimelineIndexProgressbarComponent,
    TranslocoDirective,
  ]
})
export class TiersComponent implements OnInit {
  currentPartnerUserSubscription: Subscription;

  tiers: TierWithIndex[]; // FT: Don't try to change this with Tier, p-timeline doesn't support let-index
  currentPartnerUser: PartnerUser;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    this.currentPartnerUserSubscription = this.authService.currentPartnerUser$.subscribe(currentPartnerUser => {
      this.currentPartnerUser = currentPartnerUser;
    })

    forkJoin({
      tiers: this.apiService.getTierListForDisplay(),
    }).subscribe(({ tiers }) => {
      this.tiers = tiers;
      this.assignIndexesToTiers(tiers);
    });

  }

  assignIndexesToTiers(tiers: TierWithIndex[]){
    let reverseIndex = 0;

    for (let i = tiers.length - 1; i >= 0; i--) {
      tiers[i].index = i;

      tiers[reverseIndex].displayName = i + 1;
      reverseIndex++;
    }
  }

  ngOnDestroy(): void {
    if (this.currentPartnerUserSubscription) {
      this.currentPartnerUserSubscription.unsubscribe();
    }
  }

}

export class TierWithIndex extends Tier {
  index?: number;
  displayName?: number;
}
