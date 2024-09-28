import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getPartnerSlug } from 'src/app/business/services/helper/url-listener.service';

@Injectable({
    providedIn: 'root'
})
export class PartnerCodeInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = this.router.url;

    const partnerSlug = getPartnerSlug(url); // FT: Use it for the code also

    if (partnerSlug) {
      request = request.clone({
        setHeaders: { 'Partner-Code': partnerSlug },
      });
    }

    return next.handle(request);
  }



}