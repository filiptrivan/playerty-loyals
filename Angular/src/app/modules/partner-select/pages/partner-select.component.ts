import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PrimengOption, SpiderMessageService, getHtmlImgDisplayString64 } from '@playerty/spider';

@Component({
  templateUrl: './partner-select.component.html',
})
export class PartnerSelectComponent implements OnInit {
  partnerList: Partner[] = [];
  partnerIdsForTheCurrentUser: number[] = []

  partnerOptions: PrimengOption[];

  constructor(
    private apiService: ApiService,
    private messageService: SpiderMessageService,
) { 
}

  ngOnInit(){
    this.apiService.getPartnerList().subscribe(partnerList => {
      this.partnerList = partnerList;
      this.getPartnerIdsForCurrentUser();
    });
  }
  
  getPartnerLogoImage(partner: Partner){
    return getHtmlImgDisplayString64(partner.logoImageData);
  }

  addNewPartnerUser(partnerId: number){
    this.apiService.addPartnerUserForTheCurrentUser(partnerId).subscribe(() => {
      this.messageService.successMessage('Uspešno ste napravili profil.'); // TODO FT: Translate
      this.getPartnerIdsForCurrentUser();
    });
  }

  getPartnerIdsForCurrentUser(){
    this.apiService.getPartnerIdsForTheCurrentUser().subscribe(partnerIdsForTheCurrentUser => {
      this.partnerIdsForTheCurrentUser = partnerIdsForTheCurrentUser;
    });
  }
  
}