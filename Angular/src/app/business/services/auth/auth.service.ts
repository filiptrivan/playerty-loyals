import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ConfigService } from '../config.service';
import { adjustColor, AuthBaseService, getHtmlImgDisplayString64, InitCompanyAuthDialogDetails } from '@playerty/spider';
import { Partner, PartnerUser } from '../../entities/business-entities.generated';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService implements OnDestroy {


  constructor(
    protected override router: Router,
    protected override http: HttpClient,
    protected override externalAuthService: SocialAuthService,
    protected override apiService: ApiService,
    protected override config: ConfigService,
    private route: ActivatedRoute,
  ) {
    super(router, http, externalAuthService, apiService, config);
  }

  //#region Partner

  override initCompanyAuthDialogDetails = (): Observable<InitCompanyAuthDialogDetails> => {
    return this.partner$.pipe(
      map(partner => {  
        let image = partner?.logoImageData
          ? getHtmlImgDisplayString64(partner.logoImageData)
          : `assets/images/logo/logo.svg`;
  
        let companyName = partner?.name ?? this.config.companyName;
  
        return new InitCompanyAuthDialogDetails({
          image: image,
          companyName: companyName
        });
      })
    );
  };

  private userSubscription: Subscription | null = null;

  private _partner = new BehaviorSubject<Partner | undefined>(undefined);
  partner$ = this._partner.asObservable();

  private _currentPartnerUser = new BehaviorSubject<PartnerUser | undefined>(undefined);
  currentPartnerUser$ = this._currentPartnerUser.asObservable();

  async startListening() {
    this.route.queryParams.subscribe(async params => {
      const partnerSlug = params[this.config.partnerParamKey] ?? '';
        if(partnerSlug != null && partnerSlug != ''){
          localStorage.setItem(this.config.partnerSlugKey, partnerSlug);
          await firstValueFrom(this.getCurrentPartner()); // TODO FT: When you have the time fix this, but in most basic case it will be called only once
        }
    });

    await firstValueFrom(this.getCurrentPartner()); // TODO FT: When you have the time fix this, but in most basic case it will be called only once

    this.userSubscription = this.user$.subscribe(async user => {
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
        const primaryColor = this.config.primaryColor;
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
    localStorage.setItem(this.config.partnerSlugKey, partner.slug);
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

  override onAfterNgOnDestroy = () => {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  };

  //#endregion

}
