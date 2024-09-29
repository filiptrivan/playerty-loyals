import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // FT: Ensures the service is available application-wide
})
export class PartnerService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  startListening() {
    this.route.queryParams.subscribe(params => {
      const partnerSlug = params[environment.partnerParamKey] ?? '';
          if(partnerSlug != null && partnerSlug != ''){
            localStorage.setItem(environment.partnerSlugKey, partnerSlug);
          }
      });
  }
}