import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TableFilter, Transaction } from 'src/app/business/entities/generated/business-entities.generated';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { TranslocoDirective } from '@jsverse/transloco';
import { PaginatorState } from 'primeng/paginator';
import { TableFilterContext } from 'src/app/core/entities/table-filter-context';
import { TableResponse } from 'src/app/core/entities/table-response';
import { SoftGlobal } from 'src/app/core/soft-global';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  standalone: true,
  imports: [
    PrimengModule,
    SoftControlsModule,
    TranslocoDirective,
  ]
})
export class TransactionsComponent implements OnInit {
  currentPartnerUserTransactions: TableResponse<Transaction>;

  tableFilter: TableFilter = new TableFilter({
    first: 0,
    rows: 10,
    filters: new Map<string, TableFilterContext[]>()
  });
  
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.loadTransactions();
  }
  
  loadTransactions(){
    this.apiService.loadTransactionListForTheCurrentPartnerUser(this.tableFilter).subscribe((res) => {
      this.currentPartnerUserTransactions = res;
    });
  }

  getMonth(numberOfTheMonth: number){
    return SoftGlobal.getMonth(numberOfTheMonth);
  }

  ngOnDestroy(): void {
  }

}