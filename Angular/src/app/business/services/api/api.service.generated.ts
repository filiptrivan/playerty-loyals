import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from '../../entities/generated/namebook.generated';
import { TableFilter } from '../../entities/generated/table-filter.generated';
import { Brand } from '../../entities/generated/business-entities.generated';
import { OnlineShop } from '../../entities/generated/business-entities.generated';
import { Product } from '../../entities/generated/business-entities.generated';
import { QrCode } from '../../entities/generated/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/generated/business-entities.generated';
import { Tier } from '../../entities/generated/business-entities.generated';
import { Transaction } from '../../entities/generated/business-entities.generated';
import { TransactionProduct } from '../../entities/generated/business-entities.generated';
import { TransactionStatus } from '../../entities/generated/business-entities.generated';
import { UserExtended } from '../../entities/generated/business-entities.generated';
import { Notification } from '../../entities/generated/security-entities.generated';
import { ExternalProvider } from '../../entities/generated/security-entities.generated';
import { ForgotPassword } from '../../entities/generated/security-entities.generated';
import { ForgotPasswordVerificationToken } from '../../entities/generated/security-entities.generated';
import { JwtAuthResult } from '../../entities/generated/security-entities.generated';
import { Login } from '../../entities/generated/security-entities.generated';
import { LoginResult } from '../../entities/generated/security-entities.generated';
import { LoginVerificationToken } from '../../entities/generated/security-entities.generated';
import { NotificationSaveBody } from '../../entities/generated/security-entities.generated';
import { RefreshToken } from '../../entities/generated/security-entities.generated';
import { RefreshTokenRequest } from '../../entities/generated/security-entities.generated';
import { Registration } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationResult } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationToken } from '../../entities/generated/security-entities.generated';
import { RoleSaveBody } from '../../entities/generated/security-entities.generated';
import { VerificationTokenRequest } from '../../entities/generated/security-entities.generated';
import { Permission } from '../../entities/generated/security-entities.generated';
import { Role } from '../../entities/generated/security-entities.generated';

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

    saveUserExtended(dto: UserExtendedSaveBody): Observable<UserExtended> { 
        return this.http.put<UserExtended>(`${environment.apiUrl}/Auth/SaveUserExtended`, dto, environment.httpOptions);
    }

    loadUserListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpDropdownOptions);
    }

    loadUserListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForDropdown`, environment.httpDropdownOptions);
    }

    getQrCodeDataForTheCurrentUser(): Observable<QrCode> {
        return this.http.get<QrCode>(`${environment.apiUrl}/Auth/GetQrCodeDataForTheCurrentUser`);
    }

    loadTierListForTable(dto: TableFilter): Observable<Tier> { 
        return this.http.post<Tier>(`${environment.apiUrl}/Tier/LoadTierListForTable`, dto, environment.httpTableOptions);
    }

    exportTierListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Tier/ExportTierListToExcel`, dto, environment.httpOptions);
    }

    deleteTier(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Tier/DeleteTier?id=${id}`);
    }

    getTier(id: number): Observable<Tier> {
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTier?id=${id}`);
    }

    saveTier(tierDTO: Tier): Observable<Tier> { 
        return this.http.put<Tier>(`${environment.apiUrl}/Tier/SaveTier`, tierDTO, environment.httpOptions);
    }

}

