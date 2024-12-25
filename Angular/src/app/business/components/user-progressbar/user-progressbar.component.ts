import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { PartnerUser, Tier } from '../../entities/business-entities.generated';

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

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(){
    }

    // FT HACK: https://stackoverflow.com/questions/51682170/angular-interpolated-value-display-not-updating-when-changed-in-timeout
    partnerUserPoints(){
        return this.partnerUser?.points;
    }
    
    getLevelPercentForTheCurrentUser(){
        const levelPercentForTheCurrentUserHelper = Number((this.partnerUser?.points / this.tier?.validTo * 100).toFixed(2));
        if (levelPercentForTheCurrentUserHelper) {
            return Math.min(levelPercentForTheCurrentUserHelper, 100);
        }
        
        return 0;
    }

}