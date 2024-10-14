import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Injectable({
  providedIn: 'root' // FT: Ensures the service is available application-wide
})
export class PartnerService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: SoftMessageService,
  ) {}

  startListening() {
    this.route.queryParams.subscribe(params => {
      const partnerSlug = params[environment.partnerParamKey] ?? '';
          if(partnerSlug != null && partnerSlug != ''){
            localStorage.setItem(environment.partnerSlugKey, partnerSlug);
          }
      });
  }

  loadTierListForDropdown(): Observable<PrimengOption[]>{
    return this.apiService.loadTierListForDropdown().pipe(
        map(res => {
            return res.map(x => ({ label: x.displayName, value: x.id }));
        })
    );
  }

  loadSegmentationItemListForPartnerForDropdown(): Observable<PrimengOption[]>{
    return this.apiService.loadSegmentationItemListForDropdown().pipe(
        map(res => {
            return res.map(x => ({ label: x.displayName, value: x.id }));
        })
    );
  }

}