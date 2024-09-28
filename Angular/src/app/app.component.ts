import { UrlListenerService } from './business/services/helper/url-listener.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private urlListenerService: UrlListenerService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.urlListenerService.startListening();
    }
}
