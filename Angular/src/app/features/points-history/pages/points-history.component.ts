import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Achievement, Transaction } from 'src/app/business/entities/business-entities.generated';
import { TranslocoDirective } from '@jsverse/transloco';
import { PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { PrimengModule, SpiderControlsModule, TableResponse, TableFilter, TableFilterContext, getMonth } from '@playerty/spider';

@Component({
  selector: 'points-history',
  templateUrl: './points-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PrimengModule,
    SpiderControlsModule,
    TranslocoDirective,
  ]
})
export class PointsHistoryComponent implements OnInit {
  achievementsForCurrentPartnerUser: TableResponse<Achievement>;

  tableFilter: TableFilter = new TableFilter({
    first: 0,
    rows: 10,
    filters: new Map<string, TableFilterContext[]>()
  });
  
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getTransactionList();
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.getTransactionList();
  }
  
  getTransactionList(){
    // this.apiService.getTransactionListForTheCurrentPartnerUser(this.tableFilter).subscribe((res) => {
    //   this.currentPartnerUserTransactions = res;
    // });
    this.apiService.getAchievementsForCurrentPartnerUser(this.tableFilter).subscribe((res) => {
      this.achievementsForCurrentPartnerUser = res;
    });
  }

  getMonth(numberOfTheMonth: number){
    return getMonth(numberOfTheMonth);
  }

  ngOnDestroy(): void {
  }

}