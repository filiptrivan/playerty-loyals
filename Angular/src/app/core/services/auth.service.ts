import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { ExternalProvider, Login, VerificationTokenRequest, LoginResult, ForgotPassword, Registration, RegistrationVerificationResult, RefreshTokenRequest } from 'src/app/business/entities/generated/security-entities.generated';
import { UserExtended } from 'src/app/business/entities/generated/business-entities.generated';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly apiUrl = environment.apiUrl;
  private timer?: Subscription;

  private _user = new BehaviorSubject<UserExtended | null>(null);
  user$ = this._user.asObservable();

  private _currentPartnerUserPermissions = new BehaviorSubject<string[] | null>(null);
  currentPartnerUserPermissions$ = this._currentPartnerUserPermissions.asObservable();

  // Google auth
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private externalAuthService: SocialAuthService,
    private apiService: ApiService,
  ) {
    window.addEventListener('storage', this.storageEventListener.bind(this));

    // Google auth
    this.externalAuthService.authState.subscribe((user) => {
      const externalAuth: ExternalProvider = {
        // provider: user.provider,
        idToken: user.idToken
      }
      this.loginExternal(externalAuth).subscribe(() => {
        this.navigateToDashboard();
      });
      this.extAuthChangeSub.next(user);
    });
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
        this._user.next(null);
        this._currentPartnerUserPermissions.next(null);
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();

        this.apiService.getCurrentUser().subscribe(async (user: UserExtended) => {
            this._user.next({
              id: user.id,
              email: user.email
            });
            await firstValueFrom(this.loadCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
          });
      }
    }
  }

  sendLoginVerificationEmail(body: Login): Observable<any> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    return this.apiService.sendLoginVerificationEmail(body);
  }

  login(body: VerificationTokenRequest): Observable<Promise<LoginResult>> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const loginResultObservable = this.http.post<LoginResult>(`${this.apiUrl}/Auth/Login`, body);
    return this.handleLoginResult(loginResultObservable);
  }

  sendForgotPasswordVerificationEmail(body: ForgotPassword): Observable<any> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    return this.apiService.sendForgotPasswordVerificationEmail(body);
  }

  forgotPassword(body: VerificationTokenRequest): Observable<Promise<LoginResult>> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const forgotPasswordResultObservable = this.apiService.forgotPassword(body);
    return this.handleLoginResult(forgotPasswordResultObservable);
  }

  loginExternal(body: ExternalProvider): Observable<Promise<LoginResult>> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const loginResultObservable = this.http.post<LoginResult>(`${this.apiUrl}/Auth/LoginExternal`, body);
    return this.handleLoginResult(loginResultObservable);
  }

  sendRegistrationVerificationEmail(body: Registration): Observable<RegistrationVerificationResult> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    return this.apiService.sendRegistrationVerificationEmail(body);
  }
  
  register(body: VerificationTokenRequest): Observable<Promise<LoginResult>> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const loginResultObservable = this.apiService.register(body);
    return this.handleLoginResult(loginResultObservable);
  }

  handleLoginResult(loginResultObservable: Observable<LoginResult>){
    return loginResultObservable.pipe(
      map(async (loginResult: LoginResult) => {
        this._user.next({
          id: loginResult.userId,
          email: loginResult.email,
        });
        this.setLocalStorage(loginResult);
        this.startTokenTimer();
        await firstValueFrom(this.loadCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
        return loginResult;
      })
    );
  }

  logout() {
    const browserId = this.getBrowserId();
    this.http
      .get(`${this.apiUrl}/Auth/Logout?browserId=${browserId}`)
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this._user.next(null);
          this._currentPartnerUserPermissions.next(null);
          this.stopTokenTimer();
          this.router.navigate([environment.loginSlug]);
        })
      )
      .subscribe();
  }

  refreshToken(): Observable<Promise<LoginResult> | null> {
    let refreshToken = localStorage.getItem(environment.refreshTokenKey);

    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    const browserId = this.getBrowserId();
    let body: RefreshTokenRequest = new RefreshTokenRequest();
    body.browserId = browserId;
    body.refreshToken = refreshToken;
    return this.http
    .post<LoginResult>(`${this.apiUrl}/Auth/RefreshToken`, body, environment.httpSkipSpinnerOptions)
    .pipe(
      map(async (loginResult) => {
        this._user.next({
          id: loginResult.userId,
          email: loginResult.email
        });
        this.setLocalStorage(loginResult);
        this.startTokenTimer();
        await firstValueFrom(this.loadCurrentPartnerUserPermissions()); // FT: Needs to be after setting local storage
        return loginResult;
      })
    );
  }

  setLocalStorage(loginResult: LoginResult) {
    localStorage.setItem(environment.accessTokenKey, loginResult.accessToken);
    localStorage.setItem(environment.refreshTokenKey, loginResult.refreshToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem(environment.accessTokenKey);
    localStorage.removeItem(environment.refreshTokenKey);
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  getBrowserId() {
    let browserId = localStorage.getItem(environment.browserIdKey); // FT: We don't need to remove this from the local storage ever, only if the user manuely deletes it, we will handle it
    if (!browserId) {
      browserId = crypto.randomUUID();
      localStorage.setItem(environment.browserIdKey, browserId);
    }
    return browserId;
  }

  isAccessTokenExpired(): Observable<boolean> {
    const expired = this.getTokenRemainingTime() < 5000;
    return of(expired);
  }

  getTokenRemainingTime() {
    const accessToken = localStorage.getItem(environment.accessTokenKey);
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap({
          next: () => this.refreshToken().subscribe(),
        })
      )
      .subscribe();
  }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }

  // navigateToDashboardIfLoggedIn() {
  //   let url = this.route.snapshot.url[0]?.path ?? window.location.pathname
  //   return this.user$.subscribe((x) => {
  //     if (url.startsWith(environment.loginSlug)) {
  //       const accessToken = localStorage.getItem(environment.accessTokenKey);
  //       const refreshToken = localStorage.getItem(environment.refreshTokenKey);
  //       if (x && accessToken && refreshToken) {
  //         // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  //         this.router.navigate([environment.partnerSelectSlug], { queryParams: { partner: localStorage.getItem(environment.partnerSlugKey) } });
  //       }
  //     }
  //   });
  // }

  navigateToDashboard(){
    this.router.navigate(['/']);
  }

  navigateToSelectPartner(){
    localStorage.removeItem(environment.partnerSlugKey);
    this.router.navigate([environment.partnerSelectSlug]);
  }

  logoutGoogle = () => {
    this.externalAuthService.signOut();
  }

  loadCurrentPartnerUserPermissions(): Observable<string[]> {
    return this.apiService.getCurrentPartnerUserPermissionCodes().pipe(
      map(permissionCodes => {
        this._currentPartnerUserPermissions.next(permissionCodes);
        return permissionCodes;
      }
    ));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }
}
