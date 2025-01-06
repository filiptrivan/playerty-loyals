import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerUser, Tier } from 'src/app/business/entities/business-entities.generated';
import { forkJoin } from 'rxjs';
import { TimelineIndexProgressbarComponent } from 'src/app/core/components/timeline-index-progressbar/timeline-index-progressbar.component';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { PartnerService } from 'src/app/business/services/helpers/partner.service';
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
  tierList: TierWithIndex[];
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
      tierList: this.apiService.getTierListForDisplay(),
      tierForCurrentPartnerUser: this.apiService.getTierForTheCurrentPartnerUser(),
      currentPartnerUser: this.apiService.getCurrentPartnerUser(),
    }).subscribe(({ tierList: tierList, tierForCurrentPartnerUser: tierForTheCurrentPartnerUser, currentPartnerUser }) => {
      this.currentPartnerUser = currentPartnerUser;
      this.tierList = tierList;
      this.assignIndexesToTiers(tierList);
      this.tierForTheCurrentPartnerUser = tierForTheCurrentPartnerUser;
    });

  }

  assignIndexesToTiers(tierList: TierWithIndex[]){
    let reverseIndex = 0;

    for (let i = tierList.length - 1; i >= 0; i--) {
      tierList[i].index = i;

      tierList[reverseIndex].displayName = i + 1;
      reverseIndex++;
    }
  }

  connectorMethod = (connector: Element, index: number) => {
    const fromTier = this.tierList.find(x => x.index === index + 1);

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
