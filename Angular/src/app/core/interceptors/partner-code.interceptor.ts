import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerCodeInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const partnerSlug = localStorage.getItem(environment.partnerSlugKey); // FT: Use it for the code also

    if (partnerSlug) {
      request = request.clone({
        setHeaders: { 'Partner-Code': partnerSlug },
      });
    }

    return next.handle(request);
  }



}