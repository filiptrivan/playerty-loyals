import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './tiers.component.html',
})
export class TiersComponent implements OnInit {
  tiers: TierWithIndex[] = [];
  tierForTheCurrentPartnerUser: Tier;
  currentPartnerUser: PartnerUser;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    forkJoin({
      tiers: this.apiService.loadTierList(),
      tierForTheCurrentPartnerUser: this.apiService.getTierForTheCurrentPartnerUser(),
      currentPartnerUser: this.apiService.getCurrentPartnerUser(),
    }).subscribe(({ tiers, tierForTheCurrentPartnerUser, currentPartnerUser }) => {
        this.tiers = tiers;
        this.assignIndexesToTiers(tiers);
        this.tierForTheCurrentPartnerUser = tierForTheCurrentPartnerUser;
        this.currentPartnerUser = currentPartnerUser;
        // this.assignPercentsToConnectors();
    });
  }

  assignIndexesToTiers(tiers: TierWithIndex[]){
    for (let i = 0; i < tiers.length; i++) {
      tiers[i].index = i;
    }
  }

  connectorMethod = (connector: Element, index: number) => {
    const fromTier = this.tiers.find(x => x.index === index);
    const levelPercentForTheCurrentUserHelper = Math.round(this.currentPartnerUser.points / fromTier.validTo * 100);

    const percent = Math.min(levelPercentForTheCurrentUserHelper, 100);

    if (!connector.classList.contains(`custom-connector-${percent}`)) {
      this.renderer.addClass(connector, `custom-connector-${percent}`);
    }
  }

}

export class TierWithIndex extends Tier {
  index?: number;
}
