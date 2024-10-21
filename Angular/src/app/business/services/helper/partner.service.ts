import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { Partner } from '../../entities/generated/business-entities.generated';
import { adjustColor } from 'src/app/core/services/helper-functions';

@Injectable({
  providedIn: 'root' // FT: Ensures the service is available application-wide
})
export class PartnerService {
  private _partner = new BehaviorSubject<Partner | null>(null);
  partner$ = this._partner.asObservable();
  
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

  loadCurrentPartner(): Observable<Partner> {
    return this.apiService.getCurrentPartner().pipe(
      map(partner => {
        this._partner.next(partner);
        this.adjustPartnerColor(partner);
        return partner;
      }
    ))
  }

  adjustPartnerColor(partner: Partner){
      if (partner?.primaryColor != null){
        
        const primaryColor = partner.primaryColor;
        const primaryLightColor = adjustColor(primaryColor, 60);
        const primaryLighterColor = adjustColor(primaryColor, 95);
        const primaryDarkColor = adjustColor(primaryColor, -10);
        const primaryDarkerColor = adjustColor(primaryColor, -20);
        
         // FT: I need to validate color on the server
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-light-color', primaryLightColor);
        document.documentElement.style.setProperty('--primary-lighter-color', primaryLighterColor);
        document.documentElement.style.setProperty('--primary-dark-color', primaryDarkColor);
        document.documentElement.style.setProperty('--primary-darker-color', primaryDarkerColor);
        document.documentElement.style.setProperty('--highlight-bg', primaryLighterColor);
      }
  }

}