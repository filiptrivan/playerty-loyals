import { Component, OnInit } from '@angular/core';
import { SpiderPanelsModule } from '@playerty/spider';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
  templateUrl: './privacy-policy.component.html',
  standalone: true,
  imports: [
    SpiderPanelsModule
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
