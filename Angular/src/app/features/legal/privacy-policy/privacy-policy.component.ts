import { Component, OnInit } from '@angular/core';
import { SpiderlyPanelsModule } from 'spiderly';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
  templateUrl: './privacy-policy.component.html',
  standalone: true,
  imports: [
    SpiderlyPanelsModule
  ]
})
export class PrivacyPolicyComponent implements OnInit {
  companyName = this.config.companyName;

  constructor(
    private config: ConfigService
  ) {}

  ngOnInit() {
    
  }


}
