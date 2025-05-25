import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PrimengOption, SpiderlyMessageService, getHtmlImgDisplayString64, LayoutBaseComponent } from 'spiderly';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './partner-select.component.html',
})
export class PartnerSelectComponent implements OnInit {
  partners: Partner[] = [];
  partnerIdsForTheCurrentUser: number[] = []

  partnerOptions: PrimengOption[];

  loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private messageService: SpiderlyMessageService,
) { 
}

  ngOnInit(){
    forkJoin({
      partners: this.apiService.getPartnerList(),
      partnerIdsForTheCurrentUser: this.apiService.getPartnerIdsForTheCurrentUser(),
    })
    .subscribe(({ partners, partnerIdsForTheCurrentUser }) => {
        this.partners = partners;
        this.partnerIdsForTheCurrentUser = partnerIdsForTheCurrentUser;
        this.loading = false;
    });
  }
  
  getPartnerLogoImage(partner: Partner){
    return getHtmlImgDisplayString64(partner.logoImageData);
  }

  addNewPartnerUser(partnerId: number){
    this.apiService.addPartnerUserForTheCurrentUser(partnerId).subscribe(() => {
      this.messageService.successMessage('Uspešno ste napravili profil.'); // TODO FT: Translate
      this.partnerIdsForTheCurrentUser.push(partnerId);
    });
  }
  
}