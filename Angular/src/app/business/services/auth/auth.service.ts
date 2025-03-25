import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
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
    this.initCurrentPartnerUserState();
  }

  //#region Partner

  override initCompanyAuthDialogDetails = (): Observable<InitCompanyAuthDialogDetails> => {
    return this.partner$.pipe(
      map(partner => {  
        if (partner === undefined)
          return null; 

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

  private _partner = new BehaviorSubject<Partner | undefined>(undefined);
  partner$ = this._partner.asObservable();

  private _currentPartnerUser = new BehaviorSubject<PartnerUser | undefined>(undefined);
  currentPartnerUser$ = this._currentPartnerUser.asObservable();

  initCurrentPartnerUserState = async () => {
    combineLatest([
      this.user$,
      this.partner$
    ]).pipe(
      switchMap(([user, partner]) => {
        if (user != null && partner != null) {
          return this.setCurrentPartnerUser();
        }
        else if (user !== undefined && partner !== undefined){
          this._currentPartnerUser.next(null);
          return of(null);
        }
        else{
          return of(null);
        }
      }),
      shareReplay(1)
    ).subscribe();

    this.route.queryParams // FT HACK: https://github.com/angular/angular/issues/12157
    .pipe(
      filter(queryParams => 
        Object.keys(queryParams).length > 0 === window.location.href.includes('?')
      )
    )
    .subscribe(params => {
      const partnerSlug = params[this.config.partnerParamKey];

      if (localStorage.getItem(this.config.partnerSlugKey) != null && partnerSlug == null) {
        this.setCurrentPartnerObservable().subscribe();
      }
      else if (partnerSlug != null) {
        localStorage.setItem(this.config.partnerSlugKey, partnerSlug);
        
        this.setCurrentPartnerObservable().subscribe();
      }else{
        this._partner.next(null);
      }
    });
  }

  setCurrentPartnerObservable(): Observable<Promise<Partner>> {
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

  // setCurrentPartner(partner: Partner) {
  //   this._partner.next(partner);
  //   localStorage.setItem(this.config.partnerSlugKey, partner.slug);
  //   this.adjustPartnerColor(partner);
  // }

  setCurrentPartnerUser(): Observable<PartnerUser> {  
    return this.apiService.getCurrentPartnerUser().pipe(
      map(currentPartnerUser => {
        this._currentPartnerUser.next(currentPartnerUser);
        return currentPartnerUser;
      })
    );
  }

  override onAfterRefreshToken = () => {
    // FT: If we not override this, the GetCurrentUserPermissionCodes would be called twice
  }

  //#endregion

}
