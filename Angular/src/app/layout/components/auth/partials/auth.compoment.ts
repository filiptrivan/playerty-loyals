import { Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AuthService } from "src/app/core/services/auth.service";
import { GoogleButtonComponent } from "./google-button.component";
import { CommonModule } from "@angular/common";
import { ApiService } from "src/app/business/services/api/api.service";
import { PartnerService } from "src/app/business/services/helper/partner.service";
import { getHtmlImgDisplayString64 } from "src/app/core/services/helper-functions";
import { firstValueFrom, Subscription } from "rxjs";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styles: [],
  imports: [
    CommonModule,
    GoogleButtonComponent
  ],
  standalone: true,
})
export class AuthComponent {
    private partnerSubscription: Subscription | null = null;

    @Input() showGoogleAuth: boolean = true;

    hasGoogleAuth: boolean = environment.googleAuth;
    companyName: string;
    image: string;
    
    constructor(public layoutService: LayoutService, private authService: AuthService, private partnerService: PartnerService, private apiService: ApiService) {}

    ngOnInit(){
      this.partnerSubscription = this.partnerService.partner$.subscribe(async partner => {
        if (partner == null){
          partner = await firstValueFrom(this.partnerService.loadCurrentPartner());
        }

        if (partner?.logoImageData) {
          this.image = getHtmlImgDisplayString64(partner.logoImageData);
        }else{
          this.image = `assets/layout/images/${this.layoutService.config.colorScheme === 'light' ? 'logo-dark' : 'logo-white'}.svg`
        }

        this.companyName = partner?.name ?? environment.companyName;
        this.partnerService.adjustPartnerColor(partner);
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

