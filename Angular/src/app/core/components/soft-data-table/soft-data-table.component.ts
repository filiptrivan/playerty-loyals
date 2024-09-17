import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/business/services/api/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SoftDeleteConfirmationComponent } from '../soft-delete-dialog/soft-delete-confirmation.component';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';

@Component({
  selector: 'soft-data-table',
  templateUrl: './soft-data-table.component.html',
  styles: [],
  imports: [
    FormsModule,
    CommonModule,
    PrimengModule,
    SoftDeleteConfirmationComponent
  ],
  standalone: true,
})
export class SoftDataTableComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @Input() tableTitle: string;
  @Input() tableIcon: string = 'pi pi-list';
  items: any[];
  rows: number = 10;
  @Input() cols: Column[];
  @Input() objectName: string;
  @Input() controllerName: string;
  showPaginator: boolean = true;
  isLazyLoadTable: boolean = true;
  totalRecords: number;
  lastLazyLoadEvent: TableLazyLoadEvent;
  loading: boolean = true;

  matchModeDateOptions: SelectItem[] = [
    { label: 'Dates before', value: 'dateBefore' },
    { label: 'Dates after', value: 'dateAfter' },
  ];
  matchModeNumberOptions: SelectItem[] = [
    { label: 'Equals', value: 'equals' },
    { label: 'More than', value: 'gte' },
    { label: 'Less than', value: 'lte' },
  ];
  showAddButton: boolean = true; 
  showExportToExcelButton: boolean = true;

  deleteRef: DynamicDialogRef;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
      if (this.controllerName == null)
        this.controllerName = this.objectName;
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    this.lastLazyLoadEvent = event;
    this.apiService.loadListForTable(this.controllerName,this.objectName,event).subscribe({
      next: (res) => {
        this.items = res.data;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getColHeaderWidth(filterType: string) {
    switch (filterType) {
      case 'text':
        return 'min-width: 12rem;';
      case 'date':
        return 'min-width: 10rem;';
      case 'multiselect':
        return 'min-width: 12rem;';
      case 'boolean':
        return 'min-width: 8rem;';
      case 'numeric':
        return 'min-width: 12rem;';
      default:
        return 'width: 0rem;'; // fitting content of the row like this
    }
  }

  getColMatchModeOptions(filterType: string){
    switch (filterType) {
        case 'text':
          return null;
        case 'date':
          return this.matchModeDateOptions;
        case 'multiselect':
          return null;
        case 'boolean':
          return null;
        case 'numeric':
          return this.matchModeNumberOptions;
        default:
          return null;
      }
  }
  
  getColMatchMode(filterType: string){
    switch (filterType) {
        case 'text':
          return 'contains';
        case 'date':
          return null;
        case 'multiselect':
          return 'in';
        case 'boolean':
          return 'equals';
        case 'numeric':
          return null;
        default:
          return null;
      }
  }

  isDropOrMulti(filterType: string){
    if (filterType == 'dropdown' || filterType == 'multiselect') {
        return true;
    } 
    else {
        return false;
    }
  }

  navigateToDetails(rowId: number){
    this.router.navigate([rowId], {relativeTo: this.route});
  }

  deleteObject(rowId: number){
    this.deleteRef = this.dialogService.open(SoftDeleteConfirmationComponent, 
      { 
        header: 'Are you sure?',
        width: '400px',
        data:{controllerName: this.controllerName, methodPartName: this.objectName, id: rowId, } 
      });

      this.deleteRef.onClose.subscribe((deletedSuccessfully: boolean)=>{
        if(deletedSuccessfully == true)
          this.onLazyLoad(this.lastLazyLoadEvent);
      });
  }

  showActions(): boolean {
    return this.cols.some(x => x.actions?.length > 0);
  }

  getClassForAction(action: Action): string{
    switch(action.name){
      case 'Details':
        return 'pi pi-pencil text-lg cursor-pointer primary-color';
      case 'Delete':
        return 'pi pi-trash text-lg text-red-500 cursor-pointer';
      default:
        return `pi ${action.icon} text-lg cursor-pointer`;
    }
  }

  getMethodForAction(action: Action, rowData: any){
    switch(action.name){
      case 'Details':
        return this.navigateToDetails(rowData.id);
      case 'Delete':
        return this.deleteObject(rowData.id);
      default:
        return action.onClick();
    }
  }

  getRowData(rowData: any, col: Column): string{
      switch (col.filterType) {
        case 'text':
          return rowData[col.field];
        case 'date':
          return formatDate(rowData[col.field], 'dd.MM.yyyy.', this.locale);
        case 'multiselect':
          return rowData[col.field];
        case 'boolean':
          return rowData[col.field] == true ? $localize`:@@Yes:Yes` : $localize`:@@No:No`;
        case 'numeric':
          // TODO FT: make decimal pipe
          return rowData[col.field];
        default:
          return null;
      }
  }

  exportListToExcel() {
    this.apiService.exportListToExcel(this.controllerName, this.objectName, this.lastLazyLoadEvent);
  }

  clear(table: Table) {
    table.clear();
  }
}


export class DropOrMultiValue {
  name: string;
}

export class Action {
  name: string;
  icon?: string;
  onClick?: () => void;
}

export class Column {
  name: string;
  field?: string;
  filterType?: string;
  filterPlaceholder?: string;
  showMatchModes?: boolean;
  showAddButton?: boolean;
  dropdownOrMultiselectValues?: DropOrMultiValue[];
  actions?: Action[];
}