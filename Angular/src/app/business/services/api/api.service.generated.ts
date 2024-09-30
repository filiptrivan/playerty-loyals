import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from '../../entities/namebook';
import { Codebook } from '../../entities/codebook';
import { TableFilter } from '../../entities/table-filter';
import { UserExtendedSaveBody } from '../../entities/generated/business-entities.generated';
import { QrCode } from '../../entities/generated/business-entities.generated';
import { Brand } from '../../entities/generated/business-entities.generated';
import { Product } from '../../entities/generated/business-entities.generated';
import { OnlineShop } from '../../entities/generated/business-entities.generated';
import { Gender } from '../../entities/generated/business-entities.generated';
import { SegmentationItem } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationPartnerUser } from '../../entities/generated/business-entities.generated';
import { PartnerUserSegmentation } from '../../entities/generated/business-entities.generated';
import { TransactionProduct } from '../../entities/generated/business-entities.generated';
import { TransactionStatus } from '../../entities/generated/business-entities.generated';
import { UserExtended } from '../../entities/generated/business-entities.generated';
import { Transaction } from '../../entities/generated/business-entities.generated';
import { PartnerRole } from '../../entities/generated/business-entities.generated';
import { PartnerUser } from '../../entities/generated/business-entities.generated';
import { PartnerNotification } from '../../entities/generated/business-entities.generated';
import { Partner } from '../../entities/generated/business-entities.generated';
import { Tier } from '../../entities/generated/business-entities.generated';
import { Segmentation } from '../../entities/generated/business-entities.generated';
import { LoginVerificationToken } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationToken } from '../../entities/generated/security-entities.generated';
import { NotificationSaveBody } from '../../entities/generated/security-entities.generated';
import { RoleSaveBody } from '../../entities/generated/security-entities.generated';
import { LoginResult } from '../../entities/generated/security-entities.generated';
import { Login } from '../../entities/generated/security-entities.generated';
import { ExternalProvider } from '../../entities/generated/security-entities.generated';
import { VerificationTokenRequest } from '../../entities/generated/security-entities.generated';
import { Registration } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationResult } from '../../entities/generated/security-entities.generated';
import { JwtAuthResult } from '../../entities/generated/security-entities.generated';
import { ForgotPasswordVerificationToken } from '../../entities/generated/security-entities.generated';
import { Notification } from '../../entities/generated/security-entities.generated';
import { RefreshToken } from '../../entities/generated/security-entities.generated';
import { ForgotPassword } from '../../entities/generated/security-entities.generated';
import { RefreshTokenRequest } from '../../entities/generated/security-entities.generated';
import { Permission } from '../../entities/generated/security-entities.generated';
import { Role } from '../../entities/generated/security-entities.generated';

@Injectable()
export class ApiGeneratedService extends ApiSecurityService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    
    loadTierListForTable(dto: TableFilter): Observable<Tier> { 
        return this.http.post<Tier>(`${environment.apiUrl}/Tier/LoadTierListForTable`, dto, environment.httpSkipSpinnerOptions);
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

    getCurrentUser(): Observable<UserExtended> {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetCurrentUser`);
    }

    getCurrentPartnerUser(): Observable<PartnerUser> {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/Auth/GetCurrentPartnerUser`);
    }

    getCurrentPartner(): Observable<Partner> {
        return this.http.get<Partner>(`${environment.apiUrl}/Auth/GetCurrentPartner`);
    }

    loadPartnerWithSlugListForAutocomplete(limit: number, query: string): Observable<Codebook[]> {
        return this.http.get<Codebook[]>(`${environment.apiUrl}/Auth/LoadPartnerWithSlugListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForTable(dto: TableFilter): Observable<UserExtended> { 
        return this.http.post<UserExtended>(`${environment.apiUrl}/Auth/LoadUserListForTable`, dto, environment.httpSkipSpinnerOptions);
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
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/Auth/GetCurrentUserPermissionCodes`);
    }

}

