import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { getHtmlImgDisplayString64 } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
  templateUrl: './partner-select.component.html',
})
export class PartnerSelectComponent implements OnInit {
  partners: Partner[] = [];
  partnerIdsForTheCurrentUser: number[] = []

  partnerOptions: PrimengOption[];

  constructor(
    private apiService: ApiService,
    private messageService: SoftMessageService,
) { 
}

  ngOnInit(){
    this.apiService.getPartners().subscribe(partners => {
      this.partners = partners;
      this.loadPartnerIdsForTheCurrentUser();
    });
  }
  
  getPartnerLogoImage(partner: Partner){
    return getHtmlImgDisplayString64(partner.logoImageData);
  }

  addNewPartnerUser(partnerId: number){
    this.apiService.addPartnerUserForTheCurrentUser(partnerId).subscribe(() => {
      this.messageService.successMessage('Uspešno ste napravili profil.'); // TODO FT: Translate
      this.loadPartnerIdsForTheCurrentUser();
    });
  }

  loadPartnerIdsForTheCurrentUser(){
    this.apiService.getPartnerIdsForTheCurrentUser().subscribe(partnerIdsForTheCurrentUser => {
      this.partnerIdsForTheCurrentUser = partnerIdsForTheCurrentUser;
    });
  }
  
}