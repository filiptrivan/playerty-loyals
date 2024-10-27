import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from '../../entities/namebook';
import { Codebook } from '../../entities/codebook';
import { SimpleSaveResult } from '../../entities/simple-save-result';
import { TableFilter } from '../../entities/table-filter';
import { TableResponse } from './../../../core/entities/table-response';
import { Notification } from '../../entities/generated/business-entities.generated';
import { PartnerUser } from '../../entities/generated/business-entities.generated';
import { Segmentation } from '../../entities/generated/business-entities.generated';
import { SegmentationItem } from '../../entities/generated/business-entities.generated';
import { UserExtended } from '../../entities/generated/business-entities.generated';
import { Brand } from '../../entities/generated/business-entities.generated';
import { MergedPartnerUser } from '../../entities/generated/business-entities.generated';
import { NotificationSaveBody } from '../../entities/generated/business-entities.generated';
import { OnlineShop } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerUserSaveBody } from '../../entities/generated/business-entities.generated';
import { Product } from '../../entities/generated/business-entities.generated';
import { QrCode } from '../../entities/generated/business-entities.generated';
import { SegmentationSaveBody } from '../../entities/generated/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/generated/business-entities.generated';
import { Gender } from '../../entities/generated/business-entities.generated';
import { NotificationUser } from '../../entities/generated/business-entities.generated';
import { Partner } from '../../entities/generated/business-entities.generated';
import { PartnerNotification } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationPartnerUser } from '../../entities/generated/business-entities.generated';
import { PartnerRole } from '../../entities/generated/business-entities.generated';
import { Tier } from '../../entities/generated/business-entities.generated';
import { Transaction } from '../../entities/generated/business-entities.generated';
import { TransactionProduct } from '../../entities/generated/business-entities.generated';
import { TransactionStatus } from '../../entities/generated/business-entities.generated';
import { ExternalProvider } from '../../entities/generated/security-entities.generated';
import { ForgotPassword } from '../../entities/generated/security-entities.generated';
import { ForgotPasswordVerificationToken } from '../../entities/generated/security-entities.generated';
import { JwtAuthResult } from '../../entities/generated/security-entities.generated';
import { Login } from '../../entities/generated/security-entities.generated';
import { LoginResult } from '../../entities/generated/security-entities.generated';
import { LoginVerificationToken } from '../../entities/generated/security-entities.generated';
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
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetCurrentUser`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadUserListForTable`, dto, environment.httpSkipSpinnerOptions);
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
        return this.http.get<string[]>(`${environment.apiUrl}/Auth/GetCurrentUserPermissionCodes`, environment.httpSkipSpinnerOptions);
    }

    loadGenderNamebookListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadGenderNamebookListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    sendNotificationEmail(notificationId: number, notificationVersion: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/Auth/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`);
    }

    loadNotificationListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadNotificationListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportNotificationListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportNotificationListToExcel`, dto, environment.httpOptions);
    }

    deleteNotification(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteNotification?id=${id}`);
    }

    getNotification(id: number): Observable<Notification> {
        return this.http.get<Notification>(`${environment.apiUrl}/Auth/GetNotification?id=${id}`);
    }

    saveNotification(notificationSaveBodyDTO: NotificationSaveBody): Observable<Notification> { 
        return this.http.put<Notification>(`${environment.apiUrl}/Auth/SaveNotification`, notificationSaveBodyDTO, environment.httpOptions);
    }

    loadUserForNotificationListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadUserForNotificationListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    loadUserExtendedNamebookListForNotification(notificationId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserExtendedNamebookListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    }

    getProductsForTheRecommendation(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/Home/GetProductsForTheRecommendation`);
    }

    loadPartnerListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Partner/LoadPartnerListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportPartnerListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Partner/ExportPartnerListToExcel`, dto, environment.httpOptions);
    }

    deletePartner(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Partner/DeletePartner?id=${id}`);
    }

    getPartner(id: number): Observable<Partner> {
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetPartner?id=${id}`);
    }

    savePartner(partnerDTO: Partner): Observable<Partner> { 
        return this.http.put<Partner>(`${environment.apiUrl}/Partner/SavePartner`, partnerDTO, environment.httpOptions);
    }

    getCurrentPartner(): Observable<Partner> {
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetCurrentPartner`);
    }

    loadPartnerWithSlugListForAutocomplete(limit: number, query: string): Observable<Codebook[]> {
        return this.http.get<Codebook[]>(`${environment.apiUrl}/Partner/LoadPartnerWithSlugListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    uploadLogoImage(file: any): Observable<string> { 
        return this.http.post(`${environment.apiUrl}/Partner/UploadLogoImage`, file, {...environment.httpOptions, responseType: 'text'});
    }

    loadPartnerNotificationListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadPartnerNotificationListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportPartnerNotificationListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerNotification/ExportPartnerNotificationListToExcel`, dto, environment.httpOptions);
    }

    deletePartnerNotification(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerNotification/DeletePartnerNotification?id=${id}`);
    }

    getPartnerNotification(id: number): Observable<PartnerNotification> {
        return this.http.get<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/GetPartnerNotification?id=${id}`);
    }

    loadPartnerUserNamebookListForPartnerNotification(partnerNotificationId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerNotification/LoadPartnerUserNamebookListForPartnerNotification?partnerNotificationId=${partnerNotificationId}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerUserForPartnerNotificationListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadPartnerUserForPartnerNotificationListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    savePartnerNotification(partnerNotificationSaveBodyDTO: PartnerNotificationSaveBody): Observable<PartnerNotification> { 
        return this.http.put<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/SavePartnerNotification`, partnerNotificationSaveBodyDTO, environment.httpOptions);
    }

    sendPartnerNotificationEmail(partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/PartnerNotification/SendPartnerNotificationEmail?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`);
    }

    loadNotificationListForTheCurrentPartnerUser(tableFilterDTO: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadNotificationListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpOptions);
    }

    getUnreadNotificationCountForTheCurrentPartnerUser(): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/PartnerNotification/GetUnreadNotificationCountForTheCurrentPartnerUser`);
    }

    loadPartnerRoleListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerRole/LoadPartnerRoleListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportPartnerRoleListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerRole/ExportPartnerRoleListToExcel`, dto, environment.httpOptions);
    }

    deletePartnerRole(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerRole/DeletePartnerRole?id=${id}`);
    }

    getPartnerRole(id: number): Observable<PartnerRole> {
        return this.http.get<PartnerRole>(`${environment.apiUrl}/PartnerRole/GetPartnerRole?id=${id}`);
    }

    savePartnerRole(partnerRoleSaveBodyDTO: PartnerRoleSaveBody): Observable<PartnerRole> { 
        return this.http.put<PartnerRole>(`${environment.apiUrl}/PartnerRole/SavePartnerRole`, partnerRoleSaveBodyDTO, environment.httpOptions);
    }

    loadPartnerUserNamebookListForPartnerRole(partnerRoleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerUserNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    loadPermissionNamebookListForPartnerRole(partnerRoleId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPermissionNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerRoleListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUser(): Observable<PartnerUser> {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUser`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerUserListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportPartnerUserListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerUser/ExportPartnerUserListToExcel`, dto, environment.httpOptions);
    }

    deletePartnerUser(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerUser/DeletePartnerUser?id=${id}`);
    }

    getPartnerUser(id: number): Observable<PartnerUser> {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUser?id=${id}`);
    }

    savePartnerUser(dto: PartnerUserSaveBody): Observable<PartnerUserSaveBody> { 
        return this.http.put<PartnerUserSaveBody>(`${environment.apiUrl}/PartnerUser/SavePartnerUser`, dto, environment.httpOptions);
    }

    loadPartnerUserListForAutocomplete(limit: number, query: string): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerUserListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUserPermissionCodes(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUserPermissionCodes`);
    }

    loadPartnerRoleNamebookListForPartnerUser(partnerUserId: number): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerRoleNamebookListForPartnerUser?partnerUserId=${partnerUserId}`, environment.httpSkipSpinnerOptions);
    }

    getCheckedSegmentationItemIdsForThePartnerUser(partnerUserId: number): Observable<number[]> {
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetCheckedSegmentationItemIdsForThePartnerUser?partnerUserId=${partnerUserId}`);
    }

    getAlreadyFilledSegmentationIdsForThePartnerUser(partnerUserId: number): Observable<number[]> {
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetAlreadyFilledSegmentationIdsForThePartnerUser?partnerUserId=${partnerUserId}`);
    }

    getPartnerUserForTheUser(id: number): Observable<PartnerUser> {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUserForTheUser?id=${id}`);
    }

    loadSegmentationListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Segmentation/LoadSegmentationListForTable`, dto, environment.httpSkipSpinnerOptions);
    }

    exportSegmentationListToExcel(dto: TableFilter): Observable<any> { 
        return this.http.post<any>(`${environment.apiUrl}/Segmentation/ExportSegmentationListToExcel`, dto, environment.httpOptions);
    }

    deleteSegmentation(id: number): Observable<any> { 
        return this.http.delete<any>(`${environment.apiUrl}/Segmentation/DeleteSegmentation?id=${id}`);
    }

    getSegmentation(id: number): Observable<Segmentation> {
        return this.http.get<Segmentation>(`${environment.apiUrl}/Segmentation/GetSegmentation?id=${id}`);
    }

    getSegmentationItemsForTheSegmentation(segmentationId: number): Observable<SegmentationItem[]> {
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemsForTheSegmentation?segmentationId=${segmentationId}`);
    }

    saveSegmentation(segmentationSaveBodyDTO: SegmentationSaveBody): Observable<SegmentationSaveBody> { 
        return this.http.put<SegmentationSaveBody>(`${environment.apiUrl}/Segmentation/SaveSegmentation`, segmentationSaveBodyDTO, environment.httpOptions);
    }

    getSegmentationListForTheCurrentPartner(): Observable<Segmentation[]> {
        return this.http.get<Segmentation[]>(`${environment.apiUrl}/Segmentation/GetSegmentationListForTheCurrentPartner`);
    }

    getSegmentationItemListForTheCurrentPartner(): Observable<SegmentationItem[]> {
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemListForTheCurrentPartner`);
    }

    loadSegmentationItemListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Segmentation/LoadSegmentationItemListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadTierListForTable(dto: TableFilter): Observable<TableResponse> { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Tier/LoadTierListForTable`, dto, environment.httpSkipSpinnerOptions);
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

    saveTierList(tierListDTO: Tier[]): Observable<Tier[]> { 
        return this.http.put<Tier[]>(`${environment.apiUrl}/Tier/SaveTierList`, tierListDTO, environment.httpOptions);
    }

    loadTierListForDropdown(): Observable<Namebook[]> {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Tier/LoadTierListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadTierList(): Observable<Tier[]> {
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/LoadTierList`);
    }

    loadTierListFromLargestToSmallest(): Observable<Tier[]> {
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/LoadTierListFromLargestToSmallest`);
    }

    getTierForTheCurrentPartnerUser(): Observable<Tier> {
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTierForTheCurrentPartnerUser`);
    }

}

