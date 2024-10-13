import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Tier } from 'src/app/business/entities/generated/business-entities.generated';

@Component({
  templateUrl: './tiers.component.html',
})
export class TiersComponent implements OnInit {
  tiers: Tier[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadTiers();
  }

  loadTiers(){
    this.apiService.loadTierList().subscribe((res) => {
      this.tiers = res;
    });
  }

}
