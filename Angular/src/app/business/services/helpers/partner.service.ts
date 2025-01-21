import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { adjustColor } from 'src/app/core/services/helper-functions';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { Partner, PartnerUser } from '../../entities/business-entities.generated';

@Injectable({
  providedIn: 'root' // FT: Ensures the service is available application-wide
})
export class PartnerService {
  private userSubscription: Subscription | null = null;

  private _partner = new BehaviorSubject<Partner | undefined>(undefined);
  partner$ = this._partner.asObservable();

  private _currentPartnerUser = new BehaviorSubject<PartnerUser | undefined>(undefined);
  currentPartnerUser$ = this._currentPartnerUser.asObservable();
   
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  async startListening() {
    this.route.queryParams.subscribe(async params => {
      const partnerSlug = params[environment.partnerParamKey] ?? '';
        if(partnerSlug != null && partnerSlug != ''){
          localStorage.setItem(environment.partnerSlugKey, partnerSlug);
          await firstValueFrom(this.getCurrentPartner()); // TODO FT: When you have the time fix this, but in most basic case it will be called only once
        }
    });

    await firstValueFrom(this.getCurrentPartner()); // TODO FT: When you have the time fix this, but in most basic case it will be called only once

    this.userSubscription = this.authService.user$.subscribe(async user => {
      const currentPartner = await firstValueFrom(this.partner$);

      if (currentPartner == null) {
        this._currentPartnerUser.next(null);
      }else{
        if (user == null) {
          this._currentPartnerUser.next(null);
        }
        else{
          await firstValueFrom(this.getCurrentPartnerUser());
        }
      }
    });
  }

  getCurrentPartner(): Observable<Promise<Partner>> {
    return this.apiService.getCurrentPartner().pipe(
      map(async partner => {
        this._partner.next(partner);
        this.adjustPartnerColor(partner);

        return partner;
      }
    ))
  }

  adjustPartnerColor(partner: Partner){
      if (partner?.primaryColor != null){ // TODO FT: Make this field not null in the database, and initialize it for the partner?
        const primaryColor = partner.primaryColor;
        const primaryLightColor = adjustColor(primaryColor, 35);
        const primaryLighterColor = adjustColor(primaryColor, 80);
        const primaryDarkColor = adjustColor(primaryColor, -10);
        const primaryDarkerColor = adjustColor(primaryColor, -20);
        
         // FT: I need to validate color on the server
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-light-color', primaryLightColor);
        document.documentElement.style.setProperty('--primary-lighter-color', primaryLighterColor);
        document.documentElement.style.setProperty('--primary-dark-color', primaryDarkColor);
        document.documentElement.style.setProperty('--primary-darker-color', primaryDarkerColor);
        document.documentElement.style.setProperty('--highlight-bg', primaryLighterColor);
      } else {
        const primaryColor = environment.primaryColor;
        const primaryLightColor = adjustColor(primaryColor, 35);
        const primaryLighterColor = adjustColor(primaryColor, 80);
        const primaryDarkColor = adjustColor(primaryColor, -10);
        const primaryDarkerColor = adjustColor(primaryColor, -20);
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-light-color', primaryLightColor);
        document.documentElement.style.setProperty('--primary-lighter-color', primaryLighterColor);
        document.documentElement.style.setProperty('--primary-dark-color', primaryDarkColor);
        document.documentElement.style.setProperty('--primary-darker-color', primaryDarkerColor);
        document.documentElement.style.setProperty('--highlight-bg', primaryLighterColor);
      }
  }

  setCurrentPartner(partner: Partner) {
    this._partner.next(partner);
    localStorage.setItem(environment.partnerSlugKey, partner.slug);
    this.adjustPartnerColor(partner);
  }

  getCurrentPartnerUser(): Observable<PartnerUser> {  
    return this.apiService.getCurrentPartnerUser().pipe(
      map(currentPartnerUser => {
        this._currentPartnerUser.next(currentPartnerUser);
        return currentPartnerUser;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}