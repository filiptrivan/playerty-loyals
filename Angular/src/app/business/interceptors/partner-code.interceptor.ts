import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable({
    providedIn: 'root'
})
export class PartnerCodeInterceptor implements HttpInterceptor {

  constructor(
    private config: ConfigService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const partnerSlug = localStorage.getItem(this.config.partnerSlugKey); // FT: Use it for the code also

    if (partnerSlug) {
      request = request.clone({
        setHeaders: { 'Partner-Code': partnerSlug },
      });
    }

    return next.handle(request);
  }



}