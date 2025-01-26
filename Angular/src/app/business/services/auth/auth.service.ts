import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ConfigService } from '../config.service';
import { AuthBaseService } from '@playerty/spider';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService implements OnDestroy {
  private _currentPartnerUserPermissions = new BehaviorSubject<string[] | null>(null);
  currentPartnerUserPermissions$ = this._currentPartnerUserPermissions.asObservable();

  constructor(
    protected override router: Router,
    protected override http: HttpClient,
    protected override externalAuthService: SocialAuthService,
    protected override apiService: ApiService,
    protected override config: ConfigService,
  ) {
    super(router, http, externalAuthService, apiService, config);
  }

  override onAfterLogoutEvent = () => {
    this._currentPartnerUserPermissions.next(null);
  }

  override onAfterLoginEvent = async () => {
    await firstValueFrom(this.getCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
  };

  override onAfterHandledLoginResult = async () => {
    await firstValueFrom(this.getCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
  };

  override onAfterLogout = () => {
    this._currentPartnerUserPermissions.next(null);
  };

  override onAfterRefreshToken = async () => {
    await firstValueFrom(this.getCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
  };

  getCurrentPartnerUserPermissions(): Observable<string[]> {
    return this.apiService.getCurrentPartnerUserPermissionCodes().pipe(
      map(permissionCodes => {
        this._currentPartnerUserPermissions.next(permissionCodes);
        return permissionCodes;
      }
    ));
  }

}
