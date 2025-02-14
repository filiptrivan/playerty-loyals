import { AuthService } from 'src/app/business/services/auth/auth.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig, 
        private authService: AuthService, 
        private translocoService: TranslocoService
    ) {

    }

    async ngOnInit() {
        this.primengConfig.ripple = true;

        this.translocoService.selectTranslateObject('Primeng').subscribe((primengTranslations) => {
            this.primengConfig.setTranslation(primengTranslations);
        });

        // await this.authService.startListening();
    }
}
