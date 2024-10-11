import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableRowSelectEvent, TableRowUnSelectEvent, TableSelectAllChangeEvent } from 'primeng/table';
import { ApiService } from 'src/app/business/services/api/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SoftDeleteConfirmationComponent } from '../soft-delete-dialog/soft-delete-confirmation.component';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { SoftMessageService } from '../../services/soft-message.service';
import { TableFilter } from 'src/app/business/entities/table-filter';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { firstValueFrom, Observable } from 'rxjs';

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
  @Input() rows: number = 10;
  @Input() cols: Column[];
  @Input() objectName: string;
  @Input() controllerName: string;
  showPaginator: boolean = true;
  isLazyLoadTable: boolean = true;
  totalRecords: number;
  lastLazyLoadEvent: TableLazyLoadEvent;
  loading: boolean = true;
  
  @Input() newlySelectedItems: number[] = [];
  fakeSelectedItems: number[] = []; // FT: Only for showing checkboxes, we will not send this to the backend
  currentPageSelectedItemsFromDb: number[] = []; // FT: Made so we can add only newly selected items to the newlySelectedItems
  @Input() unselectedItems: number[] = [];
  @Input() selectionMode: 'single' | 'multiple' | undefined | null;
  @Output() onLazyLoad: EventEmitter<TableFilter> = new EventEmitter();
  rowsSelectedNumber: number = 0;
  isAllSelected: boolean = null;
  fakeIsAllSelected: boolean = false; // FT: Only for showing checkboxes, we will not send this to the backend
  isFirstTimeLazyLoad: boolean = true;
  @Output() onIsAllSelectedChange: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedLazyLoadObservableMethod: (tableFilter: TableFilter) => Observable<SelectedRowsMethodResult>;
  @Input() additionalFilterIdLong: number;
  
  matchModeDateOptions: SelectItem[] = [
    { label: 'Dates before', value: 'dateBefore' },
    { label: 'Dates after', value: 'dateAfter' },
  ];
  matchModeNumberOptions: SelectItem[] = [
    { label: 'Equals', value: 'equals' },
    { label: 'More than', value: 'gte' },
    { label: 'Less than', value: 'lte' },
  ];
  @Input() showAddButton: boolean = true; 
  showExportToExcelButton: boolean = true;

  deleteRef: DynamicDialogRef;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private messageService: SoftMessageService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

    ngOnInit(): void {
      if (this.controllerName == null)
        this.controllerName = this.objectName;
    }
    
    async lazyLoad(event: TableLazyLoadEvent) {
    this.lastLazyLoadEvent = event;

    let tableFilter: TableFilter = event as unknown as TableFilter;

    this.onLazyLoad.next(tableFilter);
    
    let selectedRowsMethodResult: SelectedRowsMethodResult = await firstValueFrom(this.selectedLazyLoadObservableMethod(tableFilter));

    this.currentPageSelectedItemsFromDb = [...selectedRowsMethodResult.fakeSelectedItems];

    this.apiService.loadListForTable(this.controllerName, this.objectName, tableFilter).subscribe({
      next: (res) => {
        this.items = res.data;
        this.totalRecords = res.totalRecords;
        
        if (this.isFirstTimeLazyLoad == true) {
          this.rowsSelectedNumber = selectedRowsMethodResult.selectedTotalRecords;
          this.setFakeIsAllSelected();
          this.isFirstTimeLazyLoad = false;
        }
        else if (this.rowsSelectedNumber != selectedRowsMethodResult.selectedTotalRecords && this.isFirstTimeLazyLoad == false) {
          this.selectAll(true); // FT: Because we can't update rowsSelectedNumber based on filter, we automaticaly mark him everything
        }

        if (this.isAllSelected == true) {
          let idsToInsert = [...this.items.map(x => x.id)];
          idsToInsert = idsToInsert.filter(x => this.unselectedItems.includes(x) == false);
          this.fakeSelectedItems = [...idsToInsert]; // FT: Only for showing checkboxes, we will not send this to the backend
        }
        else if (this.isAllSelected == false) {
          this.fakeSelectedItems = [...this.newlySelectedItems]; // FT: Only for showing checkboxes, we will not send this to the backend
        }
        else if (this.isAllSelected == null) {
          let idsToInsert = [...selectedRowsMethodResult.fakeSelectedItems];
          idsToInsert = idsToInsert.filter(x => this.unselectedItems.includes(x) == false);
          this.fakeSelectedItems = [...idsToInsert];
        }

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
          this.messageService.successMessage($localize`:@@SuccessfullyDeletedMessage:You have successfully deleted.`);
          this.lazyLoad(this.lastLazyLoadEvent);
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

  setFakeIsAllSelected(){
    if(this.rowsSelectedNumber == this.totalRecords)
      this.fakeIsAllSelected = true;
    else
      this.fakeIsAllSelected = false;
  }

  clck(){
    console.log(this.newlySelectedItems)
    console.log(this.unselectedItems)
    console.log(this.isAllSelected)
}

  selectAll(checked){
    this.unselectedItems.length = 0;
    this.newlySelectedItems.length = 0;

    if (checked == true) {
      this.isAllSelected = true;
      this.fakeIsAllSelected = true;
      this.onIsAllSelectedChange.next(true);
      this.rowsSelectedNumber = this.totalRecords;
      this.fakeSelectedItems = [...this.items.map(x => x.id)];
    }else{
      this.isAllSelected = false;
      this.fakeIsAllSelected = false;
      this.onIsAllSelectedChange.next(false);
      this.rowsSelectedNumber = 0;
      this.fakeSelectedItems = [];
    }
  }

  selectRow(id: number) {
    if (this.isRowSelected(id)) {
      this.onRowUnselect(id);
    } else {
      this.onRowSelect(id);
    }
  }

  isRowSelected(id: number){
    return this.fakeSelectedItems.find(x => x == id) != undefined;
  }

  onRowSelect(id: number){
    if (this.isAllSelected == false || this.currentPageSelectedItemsFromDb.includes(id) == false) {
      this.newlySelectedItems.push(id);
    }

    this.fakeSelectedItems.push(id);
    this.rowsSelectedNumber++;

    const index = this.unselectedItems.indexOf(id);
    if (index !== -1) {
      this.unselectedItems.splice(index, 1); // FT: Splice is mutating the array
    }

    this.setFakeIsAllSelected();
  }
  
  onRowUnselect(id: number) {
    if (this.isAllSelected == true || this.currentPageSelectedItemsFromDb.includes(id) == true) {
      this.unselectedItems.push(id);
    }

    this.rowsSelectedNumber--;

    const index = this.newlySelectedItems.indexOf(id);
    const fakeIndex = this.fakeSelectedItems.indexOf(id);

    if (index !== -1) {
      this.newlySelectedItems.splice(index, 1); // FT: Splice is mutating the array
    }
    if (fakeIndex !== -1) {
      this.fakeSelectedItems.splice(fakeIndex, 1); // FT: Splice is mutating the array
    }

    this.setFakeIsAllSelected();
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

export class SelectedRowsMethodResult {
  fakeSelectedItems: number[] = [];
  selectedTotalRecords: number = 0;
}