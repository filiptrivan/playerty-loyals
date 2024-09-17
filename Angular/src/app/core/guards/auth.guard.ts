import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          // const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.toString() || '/';
          this.router.navigate(['auth/login'], {
            // queryParams: { returnUrl },
          });
          return false;
        }
      })
    );
  }
}
