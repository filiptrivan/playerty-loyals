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

  // TODO FT: Handle all on the server
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (!environment.production) {
      console.error(err);
    }
    // if (err.status == 404) {
    //   this.messageService.warningMessage(
    //     $localize`:@@NotFoundTitle:Not found.`,
    //     $localize`:@@NotFoundDetails:The requested resource was not found please try again.`
    //   );
    //   // TODO: vidi kako da resis ovo jer 404 moze da bude i kad ide na pogresnu stranicu i kad ne pronadje korisnika
    //   // this.router.navigate(['not-found'], {
    //   //   queryParams: { returnUrl: this.router.routerState.snapshot.url },
    //   // });
    //   if (!environment.production) {
    //     console.error(err);
    //   }
    //   return of(err.message);
    // }
    if (err.status == 404) {
      // TODO: vidi kako da resis ovo jer 404 moze da bude i kad ide na pogresnu stranicu i kad ne pronadje korisnika
      this.messageService.warningMessage(
        $localize`:@@NotFoundDetails:The requested resource was not found please try again.`,
        $localize`:@@NotFoundTitle:Not found.`,
      );
      return of(err.message);
    } else if (err.status == 403) {
      this.messageService.warningMessage(
        $localize`:@@PermissionErrorDetails:You don't have permission for this operation.`,
        $localize`:@@PermissionErrorTitle:Permission error.`,
      );
      return of(err.message);
    } else if (err.status == 401) {
      this.messageService.warningMessage(
        $localize`:@@SessionExpiredDetails:Your session has expired because of inactivity. To continue, please log in again.`,
        $localize`:@@SessionExpiredTitle:Session expired. Log in to continue.`,
      );
      this.logout(err);
    } else if (err.status == 419) {
      this.messageService.warningMessage(
        err.error.message,
        null
      );
      return of(err.message);
    } else if (err.status == 400) {
      this.messageService.warningMessage(
        $localize`:@@BadRequestDetails:Sorry, we couldn't fulfill your request. Please ensure all fields are correctly filled and try again.`,
        $localize`:@@BadRequestTitle:Bad request.`,
      );
      return of(err.message);
    } else if (err.status == 0) {
      this.messageService.warningMessage(
        $localize`:@@ServerLostConnectionDetails:Connection lost. Please check your internet connection. If the issue persists, contact our support team.`,
        $localize`:@@ServerLostConnectionTitle:Connection lost.`,
      );
      this.logout(err);
    } else if (err.error?.exception?.startsWith("Soft.Generator.Shared.SoftExceptions.BusinessException:")){
      this.messageService.warningMessage(
        err.error.message,
        $localize`:@@Warning:Warning.`,
      );
      return of(err.message);
    }
    else {
      this.messageService.errorMessage(
        $localize`:@@UnexpectedErrorDetails:Our team has been notified, and we're working to fix the issue. Please try again later.`,
        $localize`:@@UnexpectedErrorTitle:Something went wrong.`,
      );
      return of(err.message);
    }

    return throwError(err);
  }

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

  logout(err: HttpErrorResponse){
    this.authService.clearLocalStorage();
    this.router.navigate(['auth/login'], {
      // queryParams: { returnUrl: this.router.routerState.snapshot.url },
    });
    
    return of(err.message);
  }
}
