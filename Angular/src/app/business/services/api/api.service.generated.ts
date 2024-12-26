import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from 'src/app/core/entities/namebook';
import { Codebook } from 'src/app/core/entities/codebook';
import { SimpleSaveResult } from 'src/app/core/entities/simple-save-result';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { TableResponse } from 'src/app/core/entities/table-response';
import { LazyLoadSelectedIdsResult } from 'src/app/core/entities/lazy-load-selected-ids-result';
import { ExternalDiscountProductGroup } from '../../entities/business-entities.generated';
import { Product } from '../../entities/business-entities.generated';
import { MergedPartnerUser } from '../../entities/business-entities.generated';
import { Brand } from '../../entities/business-entities.generated';
import { ExternalTransaction } from '../../entities/business-entities.generated';
import { UpdatePoints } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsDataBody } from '../../entities/business-entities.generated';
import { QrCode } from '../../entities/business-entities.generated';
import { PartnerUserSaveBody } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { TierSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTier } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { SegmentationSaveBody } from '../../entities/business-entities.generated';
import { SegmentationItem } from '../../entities/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroup } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { BusinessSystemTierSaveBody } from '../../entities/business-entities.generated';
import { Gender } from '../../entities/business-entities.generated';
import { GenderSaveBody } from '../../entities/business-entities.generated';
import { SegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentation } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotification } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { DiscountProductGroup } from '../../entities/business-entities.generated';
import { DiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { Transaction } from '../../entities/business-entities.generated';
import { TransactionSaveBody } from '../../entities/business-entities.generated';
import { PartnerRole } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermission } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { PartnerUser } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystem } from '../../entities/business-entities.generated';
import { BusinessSystemSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRole } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerNotification } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTask } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTaskSaveBody } from '../../entities/business-entities.generated';
import { Partner } from '../../entities/business-entities.generated';
import { PartnerSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItem } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { PartnerPermission } from '../../entities/business-entities.generated';
import { PartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { Tier } from '../../entities/business-entities.generated';
import { Segmentation } from '../../entities/business-entities.generated';
import { JwtAuthResult } from '../../entities/security-entities.generated';
import { AuthResult } from '../../entities/security-entities.generated';
import { VerificationTokenRequest } from '../../entities/security-entities.generated';
import { RegistrationVerificationResult } from '../../entities/security-entities.generated';
import { RegistrationVerificationToken } from '../../entities/security-entities.generated';
import { ExternalProvider } from '../../entities/security-entities.generated';
import { LoginVerificationToken } from '../../entities/security-entities.generated';
import { Login } from '../../entities/security-entities.generated';
import { RefreshTokenRequest } from '../../entities/security-entities.generated';
import { Registration } from '../../entities/security-entities.generated';
import { RefreshToken } from '../../entities/security-entities.generated';
import { RoleSaveBody } from '../../entities/security-entities.generated';
import { RolePermission } from '../../entities/security-entities.generated';
import { RolePermissionSaveBody } from '../../entities/security-entities.generated';
import { UserRoleSaveBody } from '../../entities/security-entities.generated';
import { Role } from '../../entities/security-entities.generated';
import { Permission } from '../../entities/security-entities.generated';
import { PermissionSaveBody } from '../../entities/security-entities.generated';

@Injectable()
export class ApiGeneratedService extends ApiSecurityService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    
    loadSegmentationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Segmentation>> => { 
        return this.http.post<TableResponse<Segmentation>>(`${environment.apiUrl}/Segmentation/LoadSegmentationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportSegmentationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Segmentation/ExportSegmentationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteSegmentation = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Segmentation/DeleteSegmentation?id=${id}`);
    }

    getSegmentation = (id: number): Observable<Segmentation> => {
        return this.http.get<Segmentation>(`${environment.apiUrl}/Segmentation/GetSegmentation?id=${id}`);
    }

    getSegmentationItemsForTheSegmentation = (segmentationId: number): Observable<SegmentationItem[]> => {
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemsForTheSegmentation?segmentationId=${segmentationId}`);
    }

    saveSegmentation = (segmentationSaveBodyDTO: SegmentationSaveBody): Observable<SegmentationSaveBody> => { 
        return this.http.put<SegmentationSaveBody>(`${environment.apiUrl}/Segmentation/SaveSegmentation`, segmentationSaveBodyDTO, environment.httpOptions);
    }

    getSegmentationListForTheCurrentPartner = (): Observable<Segmentation[]> => {
        return this.http.get<Segmentation[]>(`${environment.apiUrl}/Segmentation/GetSegmentationListForTheCurrentPartner`);
    }

    getSegmentationItemListForTheCurrentPartner = (): Observable<SegmentationItem[]> => {
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemListForTheCurrentPartner`);
    }

    loadSegmentationItemListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Segmentation/LoadSegmentationItemListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    register = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Auth/Register`, request, environment.httpOptions);
    }

    login = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Auth/Login`, request, environment.httpOptions);
    }

    loginExternal = (externalProviderDTO: ExternalProvider): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Auth/LoginExternal`, externalProviderDTO, environment.httpOptions);
    }

    getCurrentUser = (): Observable<UserExtended> => {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetCurrentUser`, environment.httpSkipSpinnerOptions);
    }

    loadUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${environment.apiUrl}/Auth/LoadUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportUserTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportUserTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteUser = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteUser?id=${id}`);
    }

    getUser = (id: number): Observable<UserExtended> => {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetUser?id=${id}`);
    }

    saveUserExtended = (dto: UserExtendedSaveBody): Observable<UserExtended> => { 
        return this.http.put<UserExtended>(`${environment.apiUrl}/Auth/SaveUserExtended`, dto, environment.httpOptions);
    }

    loadUserListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadUserListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes = (): Observable<string[]> => {
        return this.http.get<string[]>(`${environment.apiUrl}/Auth/GetCurrentUserPermissionCodes`, environment.httpSkipSpinnerOptions);
    }

    loadGenderNamebookListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadGenderNamebookListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/Auth/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`);
    }

    loadNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${environment.apiUrl}/Auth/LoadNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Auth/ExportNotificationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Auth/DeleteNotification?id=${id}`);
    }

    getNotification = (id: number): Observable<Notification> => {
        return this.http.get<Notification>(`${environment.apiUrl}/Auth/GetNotification?id=${id}`);
    }

    saveNotification = (notificationSaveBodyDTO: NotificationSaveBody): Observable<Notification> => { 
        return this.http.put<Notification>(`${environment.apiUrl}/Auth/SaveNotification`, notificationSaveBodyDTO, environment.httpOptions);
    }

    lazyLoadSelectedUserExtendedIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult<number>> => { 
        return this.http.post<LazyLoadSelectedIdsResult<number>>(`${environment.apiUrl}/Auth/LazyLoadSelectedUserExtendedIdsForNotification`, tableFilterDTO, environment.httpOptions);
    }

    loadUserExtendedNamebookListForNotification = (notificationId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserExtendedNamebookListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    }

    loadBusinessSystemTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystem>> => { 
        return this.http.post<TableResponse<BusinessSystem>>(`${environment.apiUrl}/BusinessSystem/LoadBusinessSystemTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportBusinessSystemTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/ExportBusinessSystemTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteBusinessSystem = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/BusinessSystem/DeleteBusinessSystem?id=${id}`);
    }

    getBusinessSystem = (id: number): Observable<BusinessSystem> => {
        return this.http.get<BusinessSystem>(`${environment.apiUrl}/BusinessSystem/GetBusinessSystem?id=${id}`);
    }

    syncDiscountCategories = (businessSystemId: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/BusinessSystem/SyncDiscountCategories?businessSystemId=${businessSystemId}`);
    }

    saveBusinessSystem = (businessSystemSaveBodyDTO: BusinessSystemSaveBody): Observable<BusinessSystem> => { 
        return this.http.put<BusinessSystem>(`${environment.apiUrl}/BusinessSystem/SaveBusinessSystem`, businessSystemSaveBodyDTO, environment.httpOptions);
    }

    saveBusinessSystemUpdatePointsData = (businessSystemUpdatePointsDataBodyDTO: BusinessSystemUpdatePointsDataBody): Observable<number> => { 
        return this.http.put<number>(`${environment.apiUrl}/BusinessSystem/SaveBusinessSystemUpdatePointsData`, businessSystemUpdatePointsDataBodyDTO, environment.httpOptions);
    }

    changeScheduledTaskUpdatePointsStatus = (businessSystemId: number, businessSystemVersion: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/BusinessSystem/ChangeScheduledTaskUpdatePointsStatus?businessSystemId=${businessSystemId}&businessSystemVersion=${businessSystemVersion}`);
    }

    updatePoints = (updatePointsDTO: UpdatePoints): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/UpdatePoints`, updatePointsDTO, environment.httpOptions);
    }

    loadBusinessSystemListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/BusinessSystem/LoadBusinessSystemListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadBusinessSystemUpdatePointsScheduledTaskTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystemUpdatePointsScheduledTask>> => { 
        return this.http.post<TableResponse<BusinessSystemUpdatePointsScheduledTask>>(`${environment.apiUrl}/BusinessSystem/LoadBusinessSystemUpdatePointsScheduledTaskTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    loadPartnerTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Partner>> => { 
        return this.http.post<TableResponse<Partner>>(`${environment.apiUrl}/Partner/LoadPartnerTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Partner/ExportPartnerTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartner = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Partner/DeletePartner?id=${id}`);
    }

    getPartner = (id: number): Observable<Partner> => {
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetPartner?id=${id}`);
    }

    getPartners = (): Observable<Partner[]> => {
        return this.http.get<Partner[]>(`${environment.apiUrl}/Partner/GetPartners`);
    }

    savePartner = (partnerDTO: Partner): Observable<Partner> => { 
        return this.http.put<Partner>(`${environment.apiUrl}/Partner/SavePartner`, partnerDTO, environment.httpOptions);
    }

    getCurrentPartner = (): Observable<Partner> => {
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetCurrentPartner`);
    }

    loadPartnerWithSlugListForAutocomplete = (limit: number, query: string): Observable<Codebook[]> => {
        return this.http.get<Codebook[]>(`${environment.apiUrl}/Partner/LoadPartnerWithSlugListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    uploadLogoImage = (file: any): Observable<string> => { 
        return this.http.post(`${environment.apiUrl}/Partner/UploadLogoImage`, file, {...environment.httpOptions, responseType: 'text'});
    }

    getPartnerIdsForTheCurrentUser = (): Observable<number[]> => {
        return this.http.get<number[]>(`${environment.apiUrl}/Partner/GetPartnerIdsForTheCurrentUser`);
    }

    loadPartnerNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerNotification>> => { 
        return this.http.post<TableResponse<PartnerNotification>>(`${environment.apiUrl}/PartnerNotification/LoadPartnerNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerNotification/ExportPartnerNotificationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerNotification = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerNotification/DeletePartnerNotification?id=${id}`);
    }

    getPartnerNotification = (id: number): Observable<PartnerNotification> => {
        return this.http.get<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/GetPartnerNotification?id=${id}`);
    }

    loadPartnerUserNamebookListForPartnerNotification = (partnerNotificationId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerNotification/LoadPartnerUserNamebookListForPartnerNotification?partnerNotificationId=${partnerNotificationId}`, environment.httpSkipSpinnerOptions);
    }

    lazyLoadSelectedPartnerUserIdsForPartnerNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult<number>> => { 
        return this.http.post<LazyLoadSelectedIdsResult<number>>(`${environment.apiUrl}/PartnerNotification/LazyLoadSelectedPartnerUserIdsForPartnerNotification`, tableFilterDTO, environment.httpOptions);
    }

    savePartnerNotification = (partnerNotificationSaveBodyDTO: PartnerNotificationSaveBody): Observable<PartnerNotification> => { 
        return this.http.put<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/SavePartnerNotification`, partnerNotificationSaveBodyDTO, environment.httpOptions);
    }

    sendPartnerNotificationEmail = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/PartnerNotification/SendPartnerNotificationEmail?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`);
    }

    loadNotificationListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${environment.apiUrl}/PartnerNotification/LoadNotificationListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForTheCurrentPartnerUser = (): Observable<number> => {
        return this.http.get<number>(`${environment.apiUrl}/PartnerNotification/GetUnreadNotificationCountForTheCurrentPartnerUser`);
    }

    getProductsForTheRecommendation = (): Observable<Product[]> => {
        return this.http.get<Product[]>(`${environment.apiUrl}/Home/GetProductsForTheRecommendation`);
    }

    loadTierTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Tier>> => { 
        return this.http.post<TableResponse<Tier>>(`${environment.apiUrl}/Tier/LoadTierTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportTierTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Tier/ExportTierTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteTier = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Tier/DeleteTier?id=${id}`);
    }

    getTier = (id: number): Observable<Tier> => {
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTier?id=${id}`);
    }

    saveTier = (tierSaveBodyDTO: TierSaveBody): Observable<TierSaveBody> => { 
        return this.http.put<TierSaveBody>(`${environment.apiUrl}/Tier/SaveTier`, tierSaveBodyDTO, environment.httpOptions);
    }

    loadTierListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Tier/LoadTierListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadTierDTOList = (): Observable<Tier[]> => {
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/LoadTierDTOList`);
    }

    loadTierSaveBodyDTO = (): Observable<TierSaveBody> => {
        return this.http.get<TierSaveBody>(`${environment.apiUrl}/Tier/LoadTierSaveBodyDTO`);
    }

    loadTierListForDisplay = (): Observable<Tier[]> => {
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/LoadTierListForDisplay`);
    }

    getTierForTheCurrentPartnerUser = (): Observable<Tier> => {
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTierForTheCurrentPartnerUser`);
    }

    loadPartnerRoleTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerRole>> => { 
        return this.http.post<TableResponse<PartnerRole>>(`${environment.apiUrl}/PartnerRole/LoadPartnerRoleTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerRoleTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerRole/ExportPartnerRoleTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerRole = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerRole/DeletePartnerRole?id=${id}`);
    }

    getPartnerRole = (id: number): Observable<PartnerRole> => {
        return this.http.get<PartnerRole>(`${environment.apiUrl}/PartnerRole/GetPartnerRole?id=${id}`);
    }

    savePartnerRole = (partnerRoleSaveBodyDTO: PartnerRoleSaveBody): Observable<PartnerRole> => { 
        return this.http.put<PartnerRole>(`${environment.apiUrl}/PartnerRole/SavePartnerRole`, partnerRoleSaveBodyDTO, environment.httpOptions);
    }

    loadPartnerUserNamebookListForPartnerRole = (partnerRoleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerUserNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerPermissionNamebookListForPartnerRole = (partnerRoleId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerPermissionNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerPermissionListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerPermissionListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerRoleListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/LoadPartnerRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUser = (): Observable<PartnerUser> => {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUser`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerUser>> => { 
        return this.http.post<TableResponse<PartnerUser>>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerUserTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerUser/ExportPartnerUserTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerUser = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerUser/DeletePartnerUser?id=${id}`);
    }

    getPartnerUser = (id: number): Observable<PartnerUser> => {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUser?id=${id}`);
    }

    savePartnerUser = (dto: PartnerUserSaveBody): Observable<PartnerUserSaveBody> => { 
        return this.http.put<PartnerUserSaveBody>(`${environment.apiUrl}/PartnerUser/SavePartnerUser`, dto, environment.httpOptions);
    }

    loadPartnerUserListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    loadPartnerUserListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUserPermissionCodes = (): Observable<string[]> => {
        return this.http.get<string[]>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUserPermissionCodes`);
    }

    loadPartnerRoleNamebookListForPartnerUser = (partnerUserId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/LoadPartnerRoleNamebookListForPartnerUser?partnerUserId=${partnerUserId}`, environment.httpSkipSpinnerOptions);
    }

    getCheckedSegmentationItemIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => {
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetCheckedSegmentationItemIdsForThePartnerUser?partnerUserId=${partnerUserId}`);
    }

    getAlreadyFilledSegmentationIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => {
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetAlreadyFilledSegmentationIdsForThePartnerUser?partnerUserId=${partnerUserId}`);
    }

    getPartnerUserForTheUser = (id: number): Observable<PartnerUser> => {
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUserForTheUser?id=${id}`);
    }

    addPartnerUserForTheCurrentUser = (partnerId: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/PartnerUser/AddPartnerUserForTheCurrentUser?partnerId=${partnerId}`);
    }

    loadTransactionListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Transaction>> => { 
        return this.http.post<TableResponse<Transaction>>(`${environment.apiUrl}/PartnerUser/LoadTransactionListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

}

