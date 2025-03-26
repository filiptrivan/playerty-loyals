import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Achievement } from 'src/app/business/entities/business-entities.generated';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { PrimengModule, SpiderControlsModule, Column, SpiderDataTableComponent } from '@playerty/spider';

@Component({
  selector: 'points-history',
  templateUrl: './points-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PrimengModule,
    SpiderControlsModule,
    SpiderDataTableComponent,
    TranslocoDirective,
  ]
})
export class PointsHistoryComponent implements OnInit {
  cols: Column<Achievement>[];
  
  getAchievementTableDataObservableMethod = this.apiService.getAchievementTableDataForCurrentPartnerUser;
  exportAchievementTableDataToExcelObservableMethod = this.apiService.exportAchievementTableDataToExcel;

  constructor(
      private apiService: ApiService,
      private translocoService: TranslocoService,
  ) { }

  ngOnInit(){
      this.cols = [
        {name: 'Poeni', filterType: 'numeric', field: 'points', showMatchModes: true},
        {name: 'Vrednost transakcije (RSD)', filterType: 'numeric', field: 'transactionPrice', showMatchModes: true},
        {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true, showTime: true},
        {name: 'Vreme isticanja', filterType: 'date', field: 'expirationDate', showMatchModes: true, showTime: true},
        {name: 'Šifra transakcije', filterType: 'text', field: 'transactionDisplayName'},
      ]
  }

}