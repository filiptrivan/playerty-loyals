import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Namebook } from '../../entities/namebook';
import { Login, VerificationTokenRequest, LoginResult, ForgotPassword, ExternalProvider, Registration, RegistrationVerificationResult, RefreshTokenRequest, User, Role } from '../../entities/generated/security-entities.generated';
import { TableFilter } from '../../entities/table-filter';
import { TableResponse } from 'src/app/core/entities/table-response';

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
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadRoleListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadRoleListForTable(dto: TableFilter): Observable<Role> { 
        return this.http.post<Role>(`${environment.apiUrl}/Auth/LoadRoleListForTable`, dto, environment.httpSkipSpinnerOptions);
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
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadPermissionListForRole(roleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForRole(roleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForRole?roleId=${roleId}`, environment.httpSkipSpinnerOptions);
    }

    loadRoleNamebookListForUserExtended(userId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadRoleNamebookListForUserExtended?userId=${userId}`, environment.httpSkipSpinnerOptions);
    }

    


    // loadNotificationListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
    //     return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadNotificationListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    // }

    // loadNotificationListForDropdown(): Observable<Namebook[]> {
    //     return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadNotificationListForDropdown`, environment.httpSkipSpinnerOptions);
    // }

    // loadNotificationListForTable(dto: TableFilter): Observable<Notification[]> { 
    //     return this.http.post<Notification[]>(`${environment.apiUrl}/Auth/LoadNotificationListForTable`, dto, environment.httpSkipSpinnerOptions);
    // }

    // exportNotificationListToExcel(dto: TableFilter): Observable<any> { 
    //     return this.http.post<any>(`${environment.apiUrl}/Auth/ExportNotificationListToExcel`, dto, environment.httpOptions);
    // }

    // deleteNotification(id: number): Observable<any> { 
    //     return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteNotification?id=${id}`);
    // }

    // getNotification(id: number): Observable<Notification> {
    //     return this.http.get<Notification>(`${environment.apiUrl}/Auth/GetNotification?id=${id}`);
    // }

    // loadNotificationListForTheCurrentUser(tableFilter: TableFilter): Observable<TableResponse> {
    //     return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadNotificationListForTheCurrentUser`, tableFilter);
    // }

    // saveNotification(dto: Notification): Observable<Notification> { 
    //     return this.http.put<Notification>(`${environment.apiUrl}/Auth/SaveNotification`, dto, environment.httpOptions);
    // }

    // loadPermissionListForNotification(notificationId: number): Observable<Namebook[]> {
    //     return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadPermissionListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    // }

    // loadUserExtendedNamebookListForNotification(notificationId: number): Observable<Namebook[]> {
    //     return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserExtendedNamebookListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    // }

    loadNotificationNamebookListForUserExtended(userId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadNotificationNamebookListForUserExtended?userId=${userId}`, environment.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForTheCurrentUser(): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/Auth/GetUnreadNotificationCountForTheCurrentUser`, environment.httpSkipSpinnerOptions);
    }

}

