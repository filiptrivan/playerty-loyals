import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Table, TableFilterEvent, TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/business/services/api/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SoftDeleteConfirmationComponent } from '../soft-delete-dialog/soft-delete-confirmation.component';
import { CommonModule, formatDate } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { SoftMessageService } from '../../services/soft-message.service';
import { TableFilter } from 'src/app/business/entities/table-filter';
import { firstValueFrom, Observable } from 'rxjs';
import { PrimengOption } from '../../entities/primeng-option';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { SoftControlsModule } from '../../controls/soft-controls.module';
import { SoftFormArray, SoftFormControl } from '../soft-form-control/soft-form-control';

@Component({
  selector: 'soft-data-table',
  templateUrl: './soft-data-table.component.html',
  styles: [`
  	:host {
		  ::ng-deep {
		    .remove-button-border-focus:focus, 
        .remove-button-border-focus:enabled:focus {
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        background-color: var(--gray-200);
		    }
		  }
	  }
  `],
  imports: [
    FormsModule,
    CommonModule,
    PrimengModule,
    SoftDeleteConfirmationComponent,
    TranslocoDirective,
    SoftControlsModule,
  ],
  standalone: true,
})
export class SoftDataTableComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @Input() tableTitle: string;
  @Input() tableIcon: string = 'pi pi-list';
  @Input() items: any[]; // FT: Pass only when hasLazyLoad === false
  @Input() rows: number = 10;
  @Input() cols: Column[];
  @Input() objectNameForTheRequest: string;
  @Input() controllerName: string;
  @Input() showPaginator: boolean = true; // FT: Pass only when hasLazyLoad === false
  @Input() totalRecords: number; // FT: Pass only when hasLazyLoad === false
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
  
  matchModeDateOptions: SelectItem[] = [];
  matchModeNumberOptions: SelectItem[] = [];
  @Input() showAddButton: boolean = true; 
  @Input() showExportToExcelButton: boolean = true;

  deleteRef: DynamicDialogRef;

  // Client side table
  @Input() formArray: SoftFormArray;
  @Input() formArrayControlNamesFromHtml: string[];
  @Input() hasLazyLoad: boolean = true; 
  @Input() selectedItemIds: number[] = []; // FT: Pass only when hasLazyLoad === false, it's enough if the M2M association hasn't additional fields
  @Input() selectedItems: any[] = []; // FT: Pass only when hasLazyLoad === false
  @Output() onRowSelect: EventEmitter<number> = new EventEmitter();
  @Output() onRowUnselect: EventEmitter<number> = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private messageService: SoftMessageService,
    private translocoService: TranslocoService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    if (this.controllerName == null)
      this.controllerName = this.objectNameForTheRequest;

    this.matchModeDateOptions = [
      { label: this.translocoService.translate('DatesBefore'), value: 'dateBefore' },
      { label: this.translocoService.translate('DatesAfter'), value: 'dateAfter' },
    ];

    this.matchModeNumberOptions = [
      { label: this.translocoService.translate('Equals'), value: 'equals' },
      { label: this.translocoService.translate('MoreThan'), value: 'gte' },
      { label: this.translocoService.translate('LessThan'), value: 'lte' },
    ];

    if (this.hasLazyLoad === false) {
      this.loading = false;
      this.items = this.formArray.value;
      this.items.forEach((item, index) => {
        item.index = index;
      });
      this.rowsSelectedNumber = this.selectedItemIds.length;
      this.setFakeIsAllSelected();
    }
  }
  
  lazyLoad(event: TableLazyLoadEvent) {
    this.lastLazyLoadEvent = event;

    let tableFilter: TableFilter = event as unknown as TableFilter;

    this.onLazyLoad.next(tableFilter);

    this.apiService.loadListForTable(this.controllerName, this.objectNameForTheRequest, tableFilter).subscribe({
      next: async (res) => { 
        this.items = res.data;
        this.totalRecords = res.totalRecords;
        
        if (this.selectedLazyLoadObservableMethod != null) {
          let selectedRowsMethodResult: SelectedRowsMethodResult = await firstValueFrom(this.selectedLazyLoadObservableMethod(tableFilter));
  
          this.currentPageSelectedItemsFromDb = [...selectedRowsMethodResult.fakeSelectedItems];

          if (this.isFirstTimeLazyLoad == true) {
            this.rowsSelectedNumber = selectedRowsMethodResult.selectedTotalRecords;
            this.setFakeIsAllSelected();
            this.isFirstTimeLazyLoad = false;
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
            let idsToInsert = [...selectedRowsMethodResult.fakeSelectedItems, ...this.newlySelectedItems];
            idsToInsert = idsToInsert.filter(x => this.unselectedItems.includes(x) == false);
            this.fakeSelectedItems = [...idsToInsert];
          }
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  filter(event: TableFilterEvent){
    if (this.hasLazyLoad)
      this.selectAll(false); // FT: We need to do it like this because: totalRecords: 1 -> selectedRecords from earlyer selection 2 -> unselect current -> all checkbox is set to true

    if (this.hasLazyLoad === false && this.formArray) {
      this.items = this.formArray.value;
      this.items.forEach((item, index) => {
        item.index = index;
      });
    }
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
        header: this.translocoService.translate('AreYouSureToDelete'),
        width: '400px',
        data:{controllerName: this.controllerName, methodPartName: this.objectNameForTheRequest, id: rowId, } 
      });

      this.deleteRef.onClose.subscribe((deletedSuccessfully: boolean)=>{
        if(deletedSuccessfully == true)
          this.messageService.successMessage(this.translocoService.translate('SuccessfullyDeletedMessage'));
          this.lazyLoad(this.lastLazyLoadEvent);
      });
  }

  showActions(): boolean {
    return this.cols.some(x => x.actions?.length > 0);
  }

  getClassForAction(action: Action): string{
    switch(action.field){
      case 'Details':
        return 'pi pi-pencil text-lg cursor-pointer primary-color';
      case 'Delete':
        return 'pi pi-trash text-lg text-red-500 cursor-pointer';
      default:
        return `pi ${action.icon} text-lg cursor-pointer`;
    }
  }

  getMethodForAction(action: Action, rowData: any){
    switch(action.field){
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
          return rowData[col.field] == true ? this.translocoService.translate('Yes') : this.translocoService.translate('No');
        case 'numeric':
          // TODO FT: make decimal pipe
          return rowData[col.field];
        default:
          return null;
      }
  }

  trackByFn(index, item){
    return item.id;
  }

  //#region Selection

  setFakeIsAllSelected(){
    if(this.rowsSelectedNumber == this.totalRecords)
      this.fakeIsAllSelected = true;
    else
      this.fakeIsAllSelected = false;
  }

  selectAll(checked: boolean){
    this.unselectedItems.length = 0;
    this.newlySelectedItems.length = 0;

    if (checked == true) {
      this.isAllSelected = true;
      this.fakeIsAllSelected = true;
      this.onIsAllSelectedChange.next(true);
      this.rowsSelectedNumber = this.totalRecords;
      this.fakeSelectedItems = [...this.items.map(x => x.id)];
      this.selectedItemIds = [...this.items.map(x => x.id)]
    }else{
      this.isAllSelected = false;
      this.fakeIsAllSelected = false;
      this.onIsAllSelectedChange.next(false);
      this.rowsSelectedNumber = 0;
      this.fakeSelectedItems = [];
      this.selectedItemIds = [];
    }
  }

  selectRow(id: number, index: number) {
    if (this.isRowSelected(id)) {
      this.rowUnselect(id);
      this.onRowUnselect.next(index);
    } else {
      this.rowSelect(id);
      this.onRowSelect.next(index);
    }
  }

  isRowSelected(id: number){
    if (this.hasLazyLoad){
      return this.fakeSelectedItems.find(x => x == id) != undefined;
    }
    else {
      return this.selectedItemIds.find(x => x == id) != undefined;
    }
  }

  rowSelect(id: number){
    if (this.isAllSelected == false || this.currentPageSelectedItemsFromDb.includes(id) == false) {
      this.newlySelectedItems.push(id);
    }

    if (this.hasLazyLoad){
      this.fakeSelectedItems.push(id);
    }
    else {
      this.selectedItemIds.push(id);
    }
    
    this.rowsSelectedNumber++;

    const index = this.unselectedItems.indexOf(id);
    if (index !== -1) {
      this.unselectedItems.splice(index, 1); // FT: Splice is mutating the array
    }

    this.setFakeIsAllSelected();
  }
  
  rowUnselect(id: number) {
    if (this.isAllSelected == true || this.currentPageSelectedItemsFromDb.includes(id) == true) {
      this.unselectedItems.push(id);
    }

    this.rowsSelectedNumber--;

    const index = this.newlySelectedItems.indexOf(id);
    const fakeIndex = this.fakeSelectedItems.indexOf(id);
    const nonLazyLoadIndex = this.selectedItemIds.indexOf(id);

    if (index !== -1) {
      this.newlySelectedItems.splice(index, 1); // FT: Splice is mutating the array
    }
    if (fakeIndex !== -1) {
      this.fakeSelectedItems.splice(fakeIndex, 1); // FT: Splice is mutating the array
    }
    if (nonLazyLoadIndex !== -1) {
      this.selectedItemIds.splice(nonLazyLoadIndex, 1); // FT: Splice is mutating the array
    }

    this.setFakeIsAllSelected();
  }
  //#endregion

  exportListToExcel() {
    this.apiService.exportListToExcel(this.controllerName, this.objectNameForTheRequest, this.lastLazyLoadEvent);
  }

  clear(table: Table) {
    table.clear();
  }

  //#region Client side table

  getFormArrayControlByIndex(formControlName: string, index: number): SoftFormControl{
    if(this.formArrayControlNamesFromHtml.findIndex(x => x === formControlName) === -1)
      this.formArrayControlNamesFromHtml.push(formControlName);

    // FT: Can be null when we save
    return (this.formArray.controls[index] as FormGroup).controls[formControlName] as SoftFormControl;
  }

  //#endregion
}

export class Action {
  name: string;
  field: string;
  icon?: string;
  onClick?: () => void;
}

export class Column {
  name: string;
  field?: string;
  filterField?: string; // FT: Made specificaly for multiautocomplete, maybe for something more in the future
  filterType?: string;
  filterPlaceholder?: string;
  showMatchModes?: boolean;
  showAddButton?: boolean;
  dropdownOrMultiselectValues?: PrimengOption[];
  actions?: Action[];
  editable?: boolean;
}

export class SelectedRowsMethodResult {
  fakeSelectedItems: number[] = [];
  selectedTotalRecords: number = 0;
}