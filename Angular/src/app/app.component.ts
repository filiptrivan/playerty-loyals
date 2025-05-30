import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterModule,
        TranslocoDirective,
        NgxSpinnerModule,
        ToastModule,
        ConfirmDialogModule,
    ]
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNG, 
        private translocoService: TranslocoService
    ) {

    }

    async ngOnInit() {
        this.primengConfig.ripple.set(true);

        this.translocoService.selectTranslateObject('Primeng').subscribe((primengTranslations) => {
            this.primengConfig.setTranslation(primengTranslations);
        });
    }
}