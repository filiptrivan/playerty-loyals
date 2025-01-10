import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGeneratedService } from './api.service.generated';
import { map, Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { TableFilter } from '../../../core/entities/table-filter';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { Namebook } from '../../../core/entities/namebook';
import { getFileNameFromContentDisposition } from 'src/app/core/services/helper-functions';
import { Codebook } from 'src/app/core/entities/codebook';

@Injectable()
export class ApiService extends ApiGeneratedService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    exportListToExcel(exportTableDataToExcelObservableMethod: (tableFilter: TableFilter) => Observable<any>, tableFilter: TableFilter) {
        exportTableDataToExcelObservableMethod(tableFilter).subscribe(res => {
            let fileName = getFileNameFromContentDisposition(res, "ExcelExport.xlsx");
            FileSaver.saveAs(res.body, decodeURIComponent(fileName));
        });
    }

    getPrimengNamebookListForDropdown(getListForDropdownObservable: () => Observable<Namebook[]>): Observable<PrimengOption[]>{
        return getListForDropdownObservable().pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.id }));
            })
        );
    }

    getPrimengCodebookListForDropdown(getListForDropdownObservable: () => Observable<Codebook[]>): Observable<PrimengOption[]>{
        return getListForDropdownObservable().pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.code }));
            })
        );
    }

    getPrimengNamebookListForAutocomplete(getListForAutocompleteObservable: (limit: number, query: string) => Observable<Namebook[]>, limit: number, query: string): Observable<PrimengOption[]>{
        return getListForAutocompleteObservable(limit, query).pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.id }));
            })
        );
    }

    getPrimengCodebookListForAutocomplete(getListForAutocompleteObservable: (limit: number, query: string) => Observable<Codebook[]>, limit: number, query: string): Observable<PrimengOption[]>{
        return getListForAutocompleteObservable(limit, query).pipe(
            map(res => {
                return res.map(x => ({ label: x.displayName, value: x.code }));
            })
        );
    }
}