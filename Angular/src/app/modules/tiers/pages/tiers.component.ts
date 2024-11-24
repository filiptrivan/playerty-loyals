import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { forkJoin } from 'rxjs';
import { TimelineIndexProgressbarComponent } from 'src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { PartnerService } from 'src/app/business/services/helper/partner.service';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'tiers',
  templateUrl: './tiers.component.html',
  standalone: true,
  imports: [
    PrimengModule,
    SoftControlsModule,
    TimelineIndexProgressbarComponent,
    TranslocoDirective,
  ]
})
export class TiersComponent implements OnInit {
  tiers: TierWithIndex[];
  tierForTheCurrentPartnerUser: Tier;
  currentPartnerUser: PartnerUser;
  @ViewChild('timeline') timelineIndexProgressbarComponent!: TimelineIndexProgressbarComponent;
  
  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    private partnerService: PartnerService
  ) {}

  async ngOnInit() {
    forkJoin({
      tiers: this.apiService.loadTierListForDisplay(),
      tierForTheCurrentPartnerUser: this.apiService.getTierForTheCurrentPartnerUser(),
      currentPartnerUser: this.apiService.getCurrentPartnerUser(),
    }).subscribe(({ tiers, tierForTheCurrentPartnerUser, currentPartnerUser }) => {
      this.currentPartnerUser = currentPartnerUser;
      this.tiers = tiers;
      this.assignIndexesToTiers(tiers);
      this.tierForTheCurrentPartnerUser = tierForTheCurrentPartnerUser;
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

  connectorMethod = (connector: Element, index: number) => {
    const fromTier = this.tiers.find(x => x.index === index + 1);

    let levelPercentForTheCurrentUserHelper: number = 0;
    
    if (this.currentPartnerUser.points >= fromTier.validFrom) {
      levelPercentForTheCurrentUserHelper = Math.round(this.currentPartnerUser.points / fromTier.validTo * 100);
    }
    
    const percent = Math.min(levelPercentForTheCurrentUserHelper, 100);

    if (!connector.classList.contains(`custom-connector-${percent}`)) {
      this.renderer.addClass(connector, `custom-connector-${percent}`);
    }
  }

  ngOnDestroy(): void {
  }

}

export class TierWithIndex extends Tier {
  index?: number;
  displayName?: number;
}
