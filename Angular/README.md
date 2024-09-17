# Angular - PrimeNG JWT Auth
 
In this project, a frontend part for authentication was created, where the token is refreshed every time the page is refreshed or when it remains or just before the token expires.
 
## Triggering the refresh token method on the refresh on web page
 
```
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    multi: true,
    deps: [AuthService]
```
 
## Triggering the refresh token method
 
The question arises, "what if the user, since the Angular application is a SPA, does not refresh the page in an hour, how long does the access token last, will the system set the access and refresh token as invalid or not?", it will not, because we have implemented functionality that measures the duration of the jwt token, and just before the expiration, it sends a request and renews the access and refresh token.
 
```
    private getTokenRemainingTime() {
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
  ```
 
## Development server
 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.