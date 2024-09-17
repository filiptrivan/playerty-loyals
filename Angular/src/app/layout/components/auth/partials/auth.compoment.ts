import { Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AuthService } from "src/app/core/services/auth.service";
import { GoogleButtonComponent } from "./google-button.component";
import { CommonModule } from "@angular/common";

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
    @Input() showGoogleAuth: boolean = true;

    hasGoogleAuth: boolean = environment.googleAuth;
    companyName: string = environment.companyName;
    
    constructor(public layoutService: LayoutService, private authService: AuthService) {}

    onGoogleSignIn(googleWrapper: any){
      googleWrapper.click();
    }

  }

