import { UserExtended } from '../../entities/generated/business-entities.generated';
import { UserExtended } from '../../entities/generated/business-entities.generated';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from '../../entities/generated/namebook.generated';
import { TableFilter } from '../../entities/generated/table-filter.generated';


@Injectable()
export class ApiGeneratedService extends ApiSecurityService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    
    getCurrentUser(): Observable<UserExtended> {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetCurrentUser`);
    }

    loadUserListForTable(dto: TableFilter): Observable<UserExtended> { 
        return this.http.post<UserExtended>(`${environment.apiUrl}/Auth/LoadUserListForTable`, dto, environment.httpTableOptions);
    }

    exportUserListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportUserListToExcel`, dto, environment.httpOptions);
    }

    deleteUser(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteUser?id=${id}`);
    }

    getUser(id: number): Observable<UserExtended> {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetUser?id=${id}`);
    }

    saveUser(dto: UserExtended): Observable<UserExtended> { 
        return this.http.put<UserExtended>(`${environment.apiUrl}/Auth/SaveUser`, dto, environment.httpOptions);
    }

    loadRoleListForUser(userId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForUser?userId=${userId}`, environment.httpDropdownOptions);
    }

    loadUserListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpDropdownOptions);
    }

    loadUserListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForDropdown`, environment.httpDropdownOptions);
    }

    loadUserListForRole(roleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForRole?roleId=${roleId}`, environment.httpDropdownOptions);
    }

}

