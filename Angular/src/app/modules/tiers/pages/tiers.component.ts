import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerUser, Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { forkJoin, Subscription } from 'rxjs';
import { CardSkeletonComponent } from 'src/app/core/components/card-skeleton/card-skeleton.component';
import { SoftDataTableComponent } from 'src/app/core/components/soft-data-table/soft-data-table.component';
import { TimelineIndexProgressbarComponent } from 'src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { PartnerService } from 'src/app/business/services/helper/partner.service';

@Component({
  selector: 'tiers',
  templateUrl: './tiers.component.html',
  standalone: true,
  imports: [
    PrimengModule,
    SoftDataTableComponent,
    SoftControlsModule,
    CardSkeletonComponent,
    TimelineIndexProgressbarComponent
  ]
})
export class TiersComponent implements OnInit {
  private partnerUserSubscription: Subscription | null = null;

  tiers: TierWithIndex[] = [];
  tierForTheCurrentPartnerUser: Tier;
  currentPartnerUser: PartnerUser;
  @ViewChild(TimelineIndexProgressbarComponent) timelineIndexProgressbarComponent!: TimelineIndexProgressbarComponent;
  
  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    private partnerService: PartnerService
  ) {}

  ngOnInit() {

    this.partnerUserSubscription = this.partnerService.currentPartnerUser$.subscribe(currentPartnerUser => {
      this.currentPartnerUser = currentPartnerUser;
    });

    forkJoin({
      tiers: this.apiService.loadTierListFromLargestToSmallest(),
      tierForTheCurrentPartnerUser: this.apiService.getTierForTheCurrentPartnerUser(),
    }).subscribe(({ tiers, tierForTheCurrentPartnerUser }) => {
        this.tiers = tiers;
        this.assignIndexesToTiers(tiers);
        this.timelineIndexProgressbarComponent.changeConnector();
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
    if (this.partnerUserSubscription) {
      this.partnerUserSubscription.unsubscribe();
    }
  }

}

export class TierWithIndex extends Tier {
  index?: number;
  displayName?: number;
}
