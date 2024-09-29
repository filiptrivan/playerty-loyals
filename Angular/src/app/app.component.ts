import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PartnerService } from './business/services/helper/partner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private partnerService: PartnerService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.partnerService.startListening();
    }
}
