import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { PartnerUser, Tier } from '../../entities/generated/business-entities.generated';

@Component({
    selector: 'user-progressbar',
    templateUrl: './user-progressbar.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
]
})
export class UserProgressbarComponent {
    @Input() partnerUser: PartnerUser;
    @Input() tier: Tier;
    levelPercentForTheCurrentUser: number;

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(){
        this.loadComponent(this.partnerUser);
    }

    loadComponent(partnerUser: PartnerUser) {
        if (partnerUser.tierId === null) {
            this.tier = null;
            this.levelPercentForTheCurrentUser = 0;
        } 
        else {
            this.apiService.getTier(partnerUser.tierId).subscribe(tier => {
                const levelPercentForTheCurrentUserHelper = Number((partnerUser.points / tier.validTo * 100).toFixed(2));
                this.levelPercentForTheCurrentUser = Math.min(levelPercentForTheCurrentUserHelper, 100);
                this.tier = tier;
            });
        }
    }

    // FT HACK: https://stackoverflow.com/questions/51682170/angular-interpolated-value-display-not-updating-when-changed-in-timeout
    partnerUserPoints(){
        return this.partnerUser.points;
    }

}