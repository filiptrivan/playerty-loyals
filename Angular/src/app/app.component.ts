import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PartnerService } from './business/services/helpers/partner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig, 
        private partnerService: PartnerService, 
        private translocoService: TranslocoService
    ) {

    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.translocoService.selectTranslateObject('Primeng').subscribe((primengTranslations) => {
            this.primengConfig.setTranslation(primengTranslations);
        });

        this.partnerService.startListening();
    }
}
