import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Namebook } from '../../../core/entities/namebook';
import { TableFilter } from '../../../core/entities/table-filter';
import { TableResponse } from 'src/app/core/entities/table-response';
import { Login, Registration, RegistrationVerificationResult, RefreshTokenRequest, AuthResult, Role } from '../../entities/security-entities.generated';

@Injectable()
export class ApiSecurityService {

    constructor(protected http: HttpClient) {
        
    }

    //#region Authentication

    sendLoginVerificationEmail = (loginDTO: Login): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Security/SendLoginVerificationEmail`, loginDTO, environment.httpOptions);
    }

    sendRegistrationVerificationEmail = (registrationDTO: Registration): Observable<RegistrationVerificationResult> => { 
        return this.http.post<RegistrationVerificationResult>(`${environment.apiUrl}/Security/SendRegistrationVerificationEmail`, registrationDTO, environment.httpOptions);
    }

    logout = (browserId: string): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/Security/Logout?browserId=${browserId}`);
    }

    refreshToken = (request: RefreshTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/RefreshToken`, request, environment.httpOptions);
    }

    //#endregion

    //#region Role

    getRoleTableData = (dto: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Security/GetRoleTableData`, dto, environment.httpSkipSpinnerOptions);
    }

    exportRoleTableDataToExcel = (dto: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Security/ExportRoleTableDataToExcel`, dto, environment.httpOptions);
    }

    deleteRole = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Security/DeleteRole?id=${id}`);
    }

    getRole = (id: number): Observable<Role> => {
        return this.http.get<Role>(`${environment.apiUrl}/Security/GetRole?id=${id}`);
    }

    saveRole = (dto: Role): Observable<Role> => { 
        return this.http.put<Role>(`${environment.apiUrl}/Security/SaveRole`, dto, environment.httpOptions);
    }

    getUsersNamebookListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetUsersNamebookListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    getRoleListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetRoleListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getRoleListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    //#endregion

    //#region Permission

    getPermissionListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetPermissionListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getPermissionsNamebookListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetPermissionsNamebookListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    //#endregion

}

