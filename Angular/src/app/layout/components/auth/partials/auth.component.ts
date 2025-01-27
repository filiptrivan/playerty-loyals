import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LayoutService } from "src/app/layout/services/app.layout.service";
import { CommonModule } from "@angular/common";
import { PartnerService } from "src/app/business/services/helpers/partner.service";
import { Subscription } from "rxjs";
import { TranslocoDirective } from "@jsverse/transloco";
import { ConfigService } from "src/app/business/services/config.service";
import { GoogleButtonComponent, getHtmlImgDisplayString64 } from '@playerty/spider';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styles: [],
  imports: [
    CommonModule,
    GoogleButtonComponent,
    TranslocoDirective,
  ],
  standalone: true,
})
export class AuthComponent {
    private partnerSubscription: Subscription | null = null;

    @Input() showGoogleAuth: boolean = true;
    @Output() onCompanyNameChange: EventEmitter<string> = new EventEmitter();

    hasGoogleAuth: boolean = this.config.googleAuth;
    companyName: string;
    image: string;
    
    constructor(
      public layoutService: LayoutService, 
      private partnerService: PartnerService,
      private config: ConfigService
    ) {

    }

    ngOnInit(){
      this.partnerSubscription = this.partnerService.partner$.subscribe(partner => {
        if (partner?.logoImageData) {
          this.image = getHtmlImgDisplayString64(partner.logoImageData);
        }else{
          this.image = `assets/demo/images/logo/logo-dark.svg`
        }
        
        this.companyName = partner?.name ?? this.config.companyName;
        this.onCompanyNameChange.next(this.companyName);
      });
    }

    onGoogleSignIn(googleWrapper: any){
      googleWrapper.click();
    }

    ngOnDestroy(): void {
      if (this.partnerSubscription) {
        this.partnerSubscription.unsubscribe();
      }
    }
  }

