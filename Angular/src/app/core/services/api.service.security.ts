import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Namebook } from '../entities/namebook';
import { TableFilter } from '../entities/table-filter';
import { TableResponse } from 'src/app/core/entities/table-response';
import { Login, Registration, RegistrationVerificationResult, RefreshTokenRequest, AuthResult, Role } from '../entities/security-entities.generated';
import { ConfigBaseService } from './config-base.service';

@Injectable()
export class ApiSecurityService {

    constructor(
        protected http: HttpClient,
        protected config: ConfigBaseService
    ) {
        
    }

    //#region Authentication

    sendLoginVerificationEmail = (loginDTO: Login): Observable<any> => { 
        return this.http.post<any>(`${this.config.apiUrl}/Security/SendLoginVerificationEmail`, loginDTO, this.config.httpOptions);
    }

    sendRegistrationVerificationEmail = (registrationDTO: Registration): Observable<RegistrationVerificationResult> => { 
        return this.http.post<RegistrationVerificationResult>(`${this.config.apiUrl}/Security/SendRegistrationVerificationEmail`, registrationDTO, this.config.httpOptions);
    }

    logout = (browserId: string): Observable<any> => { 
        return this.http.get<any>(`${this.config.apiUrl}/Security/Logout?browserId=${browserId}`);
    }

    refreshToken = (request: RefreshTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${this.config.apiUrl}/Security/RefreshToken`, request, this.config.httpOptions);
    }

    //#endregion

    //#region Role

    getRoleTableData = (dto: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${this.config.apiUrl}/Security/GetRoleTableData`, dto, this.config.httpSkipSpinnerOptions);
    }

    exportRoleTableDataToExcel = (dto: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${this.config.apiUrl}/Security/ExportRoleTableDataToExcel`, dto, this.config.httpOptions);
    }

    deleteRole = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${this.config.apiUrl}/Security/DeleteRole?id=${id}`);
    }

    getRole = (id: number): Observable<Role> => {
        return this.http.get<Role>(`${this.config.apiUrl}/Security/GetRole?id=${id}`);
    }

    saveRole = (dto: Role): Observable<Role> => { 
        return this.http.put<Role>(`${this.config.apiUrl}/Security/SaveRole`, dto, this.config.httpOptions);
    }

    getUsersNamebookListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Security/GetUsersNamebookListForRole?roleId=${roleId}`, this.config.httpSkipSpinnerOptions);
    }

    getRoleListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Security/GetRoleListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getRoleListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Security/GetRoleListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    //#endregion

    //#region Permission

    getPermissionListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Security/GetPermissionListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getPermissionsNamebookListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Security/GetPermissionsNamebookListForRole?roleId=${roleId}`, this.config.httpSkipSpinnerOptions);
    }

    //#endregion

}

