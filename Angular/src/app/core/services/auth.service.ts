import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap, delay, finalize, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SoftMessageService } from './soft-message.service';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { User, ExternalProvider, Login, VerificationTokenRequest, LoginResult, ForgotPassword, Registration, RegistrationVerificationResult, RefreshTokenRequest, Notification } from 'src/app/business/entities/generated/security-entities.generated';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly apiUrl = environment.apiUrl;
  private timer?: Subscription;

  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  public _currentUserPermissions = new BehaviorSubject<string[] | null>(null); // FT: Can change it from other components
  currentUserPermissions$ = this._currentUserPermissions.asObservable();

  // Google auth
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private externalAuthService: SocialAuthService,
    private apiService: ApiService,
    private messageService: SoftMessageService, 
  ) {
    window.addEventListener('storage', this.storageEventListener.bind(this));

    // Google auth
    this.externalAuthService.authState.subscribe((user) => {
      const externalAuth: ExternalProvider = {
        // provider: user.provider,
        idToken: user.idToken
      }
      this.loginExternal(externalAuth).subscribe(()=>{
        this.router.navigate(['/']);
      });
      this.extAuthChangeSub.next(user);
    })
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
        this._user.next(null);
        this._currentUserPermissions.next(null);
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();

        this.apiService.getCurrentUser().subscribe((user: User) => {
            this._user.next({
              id: user.id,
              email: user.email
            });
          });
      }
    }
  }

  sendLoginVerificationEmail(body: Login): Observable<any> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    return this.apiService.sendLoginVerificationEmail(body);
  }

  login(body: VerificationTokenRequest): Observable<LoginResult> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    // const loginResultObservable = this.apiService.login(body);
    const loginResultObservable = this.http.post<LoginResult>(`${this.apiUrl}/Auth/Login`, body);
    return this.handleLoginResult(loginResultObservable);
  }

  sendForgotPasswordVerificationEmail(body: ForgotPassword): Observable<any> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    return this.apiService.sendForgotPasswordVerificationEmail(body);
  }

  forgotPassword(body: VerificationTokenRequest): Observable<LoginResult> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const forgotPasswordResultObservable = this.apiService.forgotPassword(body);
    return this.handleLoginResult(forgotPasswordResultObservable);
  }

  loginExternal(body: ExternalProvider): Observable<LoginResult> {
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
  
  register(body: VerificationTokenRequest): Observable<LoginResult> {
    const browserId = this.getBrowserId();
    body.browserId = browserId;
    const loginResultObservable = this.apiService.register(body);
    return this.handleLoginResult(loginResultObservable);
  }

  handleLoginResult(loginResultObservable: Observable<LoginResult>){
    return loginResultObservable.pipe(
      map((loginResult: LoginResult) => {
        this._user.next({
          id: loginResult.userId,
          email: loginResult.email,
        });
        this.setLocalStorage(loginResult);
        this.startTokenTimer();
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
          this._currentUserPermissions.next(null);
          this.stopTokenTimer();
          this.router.navigate(['auth/login']);
        })
      )
      .subscribe();
  }

  refreshToken(): Observable<LoginResult | null> {
    let refreshToken = localStorage.getItem('refresh_token'); // FT: REFRESH HACK
    // refreshToken = "1"; // FT: REFRESH HACK
    // if (!localStorage.getItem('access_token')) { // FT: REFRESH HACK
    //   localStorage.setItem('access_token', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZmlsaXB0cml2YW41QGdtYWlsLmNvbSIsImV4cCI6MTcyNjYyNjI3NywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2MDsiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjYwOyJ9.fjwLE3DyYgnrtFR1zcP6KSoGQkdM4h04dDcpjLZrdLk');  
    // }
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
      map((loginResult) => {
        this._user.next({
          id: loginResult.userId,
          email: loginResult.email
        });
        this.setLocalStorage(loginResult);
        this.startTokenTimer();
        return loginResult;
      })
    );
  }

  setLocalStorage(loginResult: LoginResult) {
    localStorage.setItem('access_token', loginResult.accessToken);
    localStorage.setItem('refresh_token', loginResult.refreshToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  getBrowserId() {
    let browserId = localStorage.getItem('browser_id'); // FT: We don't need to remove this from the local storage ever, only if the user manuely deletes it, we will handle it
    if (!browserId) {
      browserId = crypto.randomUUID();
      localStorage.setItem('browser_id', browserId);
    }
    return browserId;
  }

  isAccessTokenExpired(): Observable<boolean> {
    const expired = this.getTokenRemainingTime() < 5000;
    return of(expired);
  }

  getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
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

  navigateToDashboardIfLoggedIn() {
    let url = this.route.snapshot.url[0]?.path ?? window.location.pathname
    return this.user$.subscribe((x) => {
      if (url === 'auth/login') {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (x && accessToken && refreshToken) {
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate(['/']);
        }
      }
    });
  }

  logoutGoogle = () => {
    this.externalAuthService.signOut();
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }
}
