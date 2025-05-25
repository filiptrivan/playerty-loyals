import { Component, OnInit } from '@angular/core';
import { SpiderlyPanelsModule } from 'spiderly';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
  templateUrl: './user-agreement.component.html',
  standalone: true,
  imports: [
    SpiderlyPanelsModule
  ]
})
export class UserAgreementComponent implements OnInit {
  companyName = this.config.companyName;

  constructor(
    private config: ConfigService
  ) {}

  ngOnInit() {
    
  }


}
