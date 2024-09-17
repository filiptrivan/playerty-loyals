import { BaseService } from './../../../core/services/base-service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGeneratedService } from './api.service.generated';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TableResult } from 'src/app/core/entities/table-result';
import * as FileSaver from 'file-saver';
import { TableLazyLoadEvent } from 'primeng/table';

@Injectable()
export class ApiService extends ApiGeneratedService {

    constructor(protected override http: HttpClient, private baseService: BaseService) {
        super(http);
    }
    
    loadListForTable(controllerName: string, methodPartName: string, body: TableLazyLoadEvent): Observable<TableResult> {
        return this.http.post<TableResult>(`${environment.apiUrl}/${controllerName}/Load${methodPartName}ListForTable`, body, environment.httpTableOptions);
    }

    exportListToExcel(controllerName: string, methodPartName: string, body: TableLazyLoadEvent) {
        return this.exportListToExcelObservable(controllerName, methodPartName, body).subscribe(res => {
            let fileName = this.baseService.getFileNameFromContentDisposition(res, "ExcelExport.xlsx");
            FileSaver.saveAs(res.body, decodeURIComponent(fileName));
        });
    }

    exportListToExcelObservable(controllerName: string, methodPartName: string, body: TableLazyLoadEvent) {
        return this.http.post(`${environment.apiUrl}/${controllerName}/Export${methodPartName}ListToExcel`, body, { observe: 'response', responseType: 'blob' });
    }

    deleteItemFromTable(controllerName: string, methodPartName: string, id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/${controllerName}/Delete${methodPartName}?id=${id}`);
    }
}