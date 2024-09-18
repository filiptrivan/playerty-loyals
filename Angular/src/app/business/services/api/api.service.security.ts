import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Namebook } from '../../entities/generated/namebook.generated';
import { Login, VerificationTokenRequest, LoginResult, ForgotPassword, ExternalProvider, Registration, RegistrationVerificationResult, RefreshTokenRequest, User, Role } from '../../entities/generated/security-entities.generated';
import { TableFilter } from '../../entities/generated/table-filter.generated';

@Injectable()
export class ApiSecurityService {

    constructor(protected http: HttpClient) {
        
    }

    
    sendLoginVerificationEmail(loginDTO: Login): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/SendLoginVerificationEmail`, loginDTO, environment.httpOptions);
    }

    login(request: VerificationTokenRequest): Observable<LoginResult> { 
        return this.http.post<LoginResult>(`${environment.apiUrl}/Auth/Login`, request, environment.httpOptions);
    }

    sendForgotPasswordVerificationEmail(forgotPasswordDTO: ForgotPassword): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/SendForgotPasswordVerificationEmail`, forgotPasswordDTO, environment.httpOptions);
    }

    forgotPassword(request: VerificationTokenRequest): Observable<LoginResult> { 
        return this.http.post<LoginResult>(`${environment.apiUrl}/Auth/ForgotPassword`, request, environment.httpOptions);
    }

    loginExternal(externalProviderDTO: ExternalProvider): Observable<LoginResult> { 
        return this.http.post<LoginResult>(`${environment.apiUrl}/Auth/LoginExternal`, externalProviderDTO, environment.httpOptions);
    }

    sendRegistrationVerificationEmail(registrationDTO: Registration): Observable<RegistrationVerificationResult> { 
        return this.http.post<RegistrationVerificationResult>(`${environment.apiUrl}/Auth/SendRegistrationVerificationEmail`, registrationDTO, environment.httpOptions);
    }

    register(request: VerificationTokenRequest): Observable<LoginResult> { 
        return this.http.post<LoginResult>(`${environment.apiUrl}/Auth/Register`, request, environment.httpOptions);
    }

    logout(browserId: string): Observable<any> { 
        return this.http.get<any>(`${environment.apiUrl}/Auth/Logout?browserId=${browserId}`);
    }

    refreshToken(request: RefreshTokenRequest): Observable<LoginResult> { 
        return this.http.post<LoginResult>(`${environment.apiUrl}/Auth/RefreshToken`, request, environment.httpOptions);
    }

    loadRoleListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForAutocomplete?limit=${limit}&query=${query}`, environment.httpDropdownOptions);
    }

    loadRoleListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForDropdown`, environment.httpDropdownOptions);
    }

    loadRoleListForTable(dto: TableFilter): Observable<Role> { 
        return this.http.post<Role>(`${environment.apiUrl}/Auth/LoadRoleListForTable`, dto, environment.httpTableOptions);
    }

    exportRoleListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportRoleListToExcel`, dto, environment.httpOptions);
    }

    deleteRole(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteRole?id=${id}`);
    }

    getRole(id: number): Observable<Role> {
        return this.http.get<Role>(`${environment.apiUrl}/Auth/GetRole?id=${id}`);
    }

    saveRole(dto: Role): Observable<Role> { 
        return this.http.put<Role>(`${environment.apiUrl}/Auth/SaveRole`, dto, environment.httpOptions);
    }

    loadPermissionListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForDropdown`, environment.httpDropdownOptions);
    }

    loadPermissionListForRole(roleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForRole?roleId=${roleId}`, environment.httpDropdownOptions);
    }

}

