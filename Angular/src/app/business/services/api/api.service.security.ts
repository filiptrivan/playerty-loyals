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

    
    sendLoginVerificationEmail = (loginDTO: Login): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/SendLoginVerificationEmail`, loginDTO, environment.httpOptions);
    }

    sendRegistrationVerificationEmail = (registrationDTO: Registration): Observable<RegistrationVerificationResult> => { 
        return this.http.post<RegistrationVerificationResult>(`${environment.apiUrl}/Auth/SendRegistrationVerificationEmail`, registrationDTO, environment.httpOptions);
    }

    logout = (browserId: string): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/Auth/Logout?browserId=${browserId}`);
    }

    refreshToken = (request: RefreshTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Auth/RefreshToken`, request, environment.httpOptions);
    }

    loadRoleListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadRoleListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadRoleTableData = (dto: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadRoleTableData`, dto, environment.httpSkipSpinnerOptions);
    }

    exportRoleTableDataToExcel = (dto: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportRoleTableDataToExcel`, dto, environment.httpOptions);
    }

    deleteRole = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteRole?id=${id}`);
    }

    getRole(id: number): Observable<Role> {
        return this.http.get<Role>(`${environment.apiUrl}/Auth/GetRole?id=${id}`);
    }

    saveRole = (dto: Role): Observable<Role> => { 
        return this.http.put<Role>(`${environment.apiUrl}/Auth/SaveRole`, dto, environment.httpOptions);
    }

    loadPermissionListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadPermissionListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForRole = (roleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    loadRoleNamebookListForUserExtended = (userId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleNamebookListForUserExtended?userId=${userId}`, environment.httpSkipSpinnerOptions);
    }

    loadNotificationNamebookListForUserExtended = (userId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadNotificationNamebookListForUserExtended?userId=${userId}`, environment.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForTheCurrentUser = (): Observable<number> => {
        return this.http.get<number>(`${environment.apiUrl}/Auth/GetUnreadNotificationCountForTheCurrentUser`, environment.httpSkipSpinnerOptions);
    }

}

