import { BaseService } from './../../../core/services/base-service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGeneratedService } from './api.service.generated';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TableResponse } from 'src/app/core/entities/table-response';
import * as FileSaver from 'file-saver';
import { TableLazyLoadEvent } from 'primeng/table';
import { TableFilter } from '../../entities/table-filter';

@Injectable()
export class ApiService extends ApiGeneratedService {

    constructor(protected override http: HttpClient, private baseService: BaseService) {
        super(http);
    }
    
    // loadTableData(controllerName: string, methodPartName: string, body: TableFilter): Observable<TableResponse> {
    //     return this.http.post<TableResponse>(`${environment.apiUrl}/${controllerName}/Load${methodPartName}TableData`, body, environment.httpSkipSpinnerOptions);
    // }

    exportListToExcel(exportTableDataToExcelObservableMethod: (tableFilter: TableFilter) => Observable<any>, tableFilter: TableFilter) {
        exportTableDataToExcelObservableMethod(tableFilter).subscribe(res => {
            let fileName = this.baseService.getFileNameFromContentDisposition(res, "ExcelExport.xlsx");
            FileSaver.saveAs(res.body, decodeURIComponent(fileName));
        });
    }

    // exportListToExcelObservable(controllerName: string, methodPartName: string, body: TableFilter) {
    //     return this.http.post(`${environment.apiUrl}/${controllerName}/Export${methodPartName}TableDataToExcel`, body, { observe: 'response', responseType: 'blob' });
    // }

    // deleteItemFromTable(controllerName: string, methodPartName: string, id: number): Observable<any> {
    //     return this.http.delete(`${environment.apiUrl}/${controllerName}/Delete${methodPartName}?id=${id}`);
    // }
}