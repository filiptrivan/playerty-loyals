import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnerGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): boolean {
    return this.checkPartner();
  }

  private checkPartner(): boolean {
    if (localStorage.getItem(environment.partnerSlugKey) != null && localStorage.getItem(environment.partnerSlugKey) != '') {
      return true;
    }else{
      // this.authService.navigateToSelectPartner();
      return false;
    }
  }
}
