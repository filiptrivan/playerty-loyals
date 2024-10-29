import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SoftMessageService } from '../services/soft-message.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: SoftMessageService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        return this.handleAuthError(err);
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (!environment.production) {
      console.error(err);
    }

    if (err.status == 0) {
      this.messageService.warningMessage(
        $localize`:@@ServerLostConnectionDetails:Connection lost. Please check your internet connection. If the issue persists, contact our support team.`,
        $localize`:@@ServerLostConnectionTitle:Connection lost.`,
      );
      return of(err.message);
    } 
    else if (err.status == 403) {
      this.messageService.warningMessage(
        $localize`:@@PermissionErrorDetails:You don't have permission for this operation.`,
        $localize`:@@PermissionErrorTitle:Permission error.`,
      );
      return of(err.message);
    } 
    else if (err.status == 404) {
      this.messageService.warningMessage(
        $localize`:@@NotFoundDetails:The requested resource was not found please try again.`,
        $localize`:@@NotFoundTitle:Not found.`,
      );
      return of(err.message);
    } 
    else if (err.status == 400 || err.status == 401 || err.status == 419) {
      console.log("HERE")
      this.messageService.warningMessage(
        err.error.message,
        $localize`:@@Warning:Warning.`,
      );

      if(err.status == 401) {
        // this.authService.logout();
      }

      return of(err.message);
    } 
    else {
      this.messageService.errorMessage(
        err.error.message,
        $localize`:@@UnexpectedErrorTitle:Something went wrong.`,
      );
      return of(err.message);
    }

    return throwError(err);
  }

}
