import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Partner } from '../../entities/generated/business-entities.generated';

@Injectable({
  providedIn: 'root' // FT: Ensures the service is available application-wide
})
export class UrlListenerService {
  private _partner = new BehaviorSubject<Partner | null>(null);
  partner$ = this._partner.asObservable();

  constructor(private router: Router) {}

  startListening() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) 
      .subscribe((event: NavigationEnd) => {
        const urlAfterRedirects: string = event.urlAfterRedirects;
        const partnerSlug = getPartnerSlug(urlAfterRedirects);
        if(partnerSlug != localStorage.getItem('partner-slug'))
          localStorage.setItem('partner-slug', partnerSlug);
        console.log('URL destination: ', event.url);
        console.log('URL changed to: ', event.urlAfterRedirects);
      });
  }
}

export function getPartnerSlug(url: string) {
  console.log(url)
  const urlParts = url.split('/');
  if (urlParts.length > 1) { // FT: One because it will take the empty string also as a part
    const slug = urlParts[1].split('/')[0];
    return slug;
  }
  this.router.navigateByUrl('not-found/not-found');
  return '';
}