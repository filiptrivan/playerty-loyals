import { CommonModule } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PartnerUser, Tier } from 'src/app/business/entities/business-entities.generated';
import { PrimengModule, SpiderPanelsModule } from '@playerty/spider';
import { TierWithIndex } from '../pages/tiers.component';

@Component({
    selector: 'tier-timeline-index-progressbar',
    templateUrl: './tier-timeline-index-progressbar.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SpiderPanelsModule
]
})
export class TimelineIndexProgressbarComponent {
    @Input() tiers: TierWithIndex[];
    @Input() currentPartnerUser: PartnerUser;
    resizeTimeout;
    

    constructor(
        protected formBuilder: FormBuilder,
        private renderer: Renderer2,
    ) {

    }

    ngOnInit(){
        this.changeConnector();
    }

    isCurrentTier(tier: Tier){
        if (tier.id == this.currentPartnerUser?.tierId) { // currentTier could be null, for our example partner user doesn't always have current tier
          return true;
        }
    
        return false;
    }

    isPassed(tier: Tier){
        if (this.currentPartnerUser?.points >= tier.validTo) {
            return true;
        }

        return false;
    }

    changeConnector() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          const connectors = document.querySelectorAll('.p-timeline-event-connector');
    
          if (connectors.length) {
            connectors.forEach((connector, index) => {
                if (this.connectorMethod != null){
                    this.connectorMethod(connector, index);
                }
            });
          }
        }, 100);
    }

    connectorMethod = (connector: Element, index: number) => {
        const fromTier = this.tiers.find(x => x.index === index);

        let levelPercentForTheCurrentUserHelper: number = 0;

        if (this.currentPartnerUser?.points >= fromTier.validFrom) {
            levelPercentForTheCurrentUserHelper = Math.round(this.currentPartnerUser?.points / fromTier.validTo * 100);
        }
        
        const percent = Math.min(levelPercentForTheCurrentUserHelper, 100);

        if (!connector.classList.contains(`custom-connector-${percent}`)) {
            this.renderer.addClass(connector, `custom-connector-${percent}`);
        }
    }

}