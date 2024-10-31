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
import { environment } from '../../../environments/environment';
import { SoftMessageService } from '../services/soft-message.service';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private messageService: SoftMessageService,
    private translocoService: TranslocoService
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
        this.translocoService.translate('ServerLostConnectionDetails'),
        this.translocoService.translate('ServerLostConnectionTitle'),
      );
      return of(err.message);
    } 
    else if (err.status == 403) {
      this.messageService.warningMessage(
        this.translocoService.translate('PermissionErrorDetails'),
        this.translocoService.translate('PermissionErrorTitle'),
      );
      return of(err.message);
    } 
    else if (err.status == 404) {
      this.messageService.warningMessage(
        this.translocoService.translate('NotFoundDetails'),
        this.translocoService.translate('NotFoundTitle'),
      );
      return of(err.message);
    } 
    else if (err.status == 400 || err.status == 401 || err.status == 419) {
      this.messageService.warningMessage(
        err.error.message,
        this.translocoService.translate('Warning'),
      );

      if(err.status == 401) {
        // this.authService.logout();
      }

      return of(err.message);
    } 
    else {
      this.messageService.errorMessage(
        err.error.message,
        this.translocoService.translate('UnexpectedErrorTitle'),
      );
      return of(err.message);
    }

    return throwError(err);
  }

}
