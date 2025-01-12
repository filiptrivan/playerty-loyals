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
import { PartnerUserSaveBody } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { TierSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTier } from '../../entities/business-entities.generated';
import { ExternalDiscountProductGroup } from '../../entities/business-entities.generated';
import { Product } from '../../entities/business-entities.generated';
import { MergedPartnerUser } from '../../entities/business-entities.generated';
import { Brand } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { ExternalTransaction } from '../../entities/business-entities.generated';
import { SegmentationItem } from '../../entities/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { UpdatePoints } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroup } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsDataBody } from '../../entities/business-entities.generated';
import { QrCode } from '../../entities/business-entities.generated';
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
import { SegmentationSaveBody } from '../../entities/business-entities.generated';
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

    register = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/Register`, request, environment.httpOptions);
    }

    login = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/Login`, request, environment.httpOptions);
    }

    loginExternal = (externalProviderDTO: ExternalProvider): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/LoginExternal`, externalProviderDTO, environment.httpOptions);
    }

    getCurrentUser = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${environment.apiUrl}/Security/GetCurrentUser`, environment.httpSkipSpinnerOptions);
    }

    getUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${environment.apiUrl}/Security/GetUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportUserTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Security/ExportUserTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteUser = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Security/DeleteUser?id=${id}`, environment.httpOptions);
    }

    getUser = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${environment.apiUrl}/Security/GetUser?id=${id}`, environment.httpOptions);
    }

    saveUserExtended = (dto: UserExtendedSaveBody): Observable<UserExtended> => { 
        return this.http.put<UserExtended>(`${environment.apiUrl}/Security/SaveUserExtended`, dto, environment.httpOptions);
    }

    getUserListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getUserListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${environment.apiUrl}/Security/GetCurrentUserPermissionCodes`, environment.httpSkipSpinnerOptions);
    }

    getGenderNamebookListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetGenderNamebookListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/Security/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, environment.httpOptions);
    }

    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${environment.apiUrl}/Security/GetNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Security/ExportNotificationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Security/DeleteNotification?id=${id}`, environment.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${environment.apiUrl}/Security/GetNotification?id=${id}`, environment.httpOptions);
    }

    saveNotification = (notificationSaveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${environment.apiUrl}/Security/SaveNotification`, notificationSaveBodyDTO, environment.httpOptions);
    }

    lazyLoadSelectedUserExtendedIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${environment.apiUrl}/Security/LazyLoadSelectedUserExtendedIdsForNotification`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    getUserExtendedNamebookListForNotification = (notificationId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Security/GetUserExtendedNamebookListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    }

    getSegmentationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Segmentation>> => { 
        return this.http.post<TableResponse<Segmentation>>(`${environment.apiUrl}/Segmentation/GetSegmentationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportSegmentationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Segmentation/ExportSegmentationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    getSegmentationItemsForTheSegmentation = (segmentationId: number): Observable<SegmentationItem[]> => { 
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemsForTheSegmentation?segmentationId=${segmentationId}`, environment.httpOptions);
    }

    getSegmentationListForTheCurrentPartner = (): Observable<Segmentation[]> => { 
        return this.http.get<Segmentation[]>(`${environment.apiUrl}/Segmentation/GetSegmentationListForTheCurrentPartner`, environment.httpOptions);
    }

    getSegmentationItemListForTheCurrentPartner = (): Observable<SegmentationItem[]> => { 
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemListForTheCurrentPartner`, environment.httpOptions);
    }

    getSegmentationItemListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Segmentation/GetSegmentationItemListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getBusinessSystemTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystem>> => { 
        return this.http.post<TableResponse<BusinessSystem>>(`${environment.apiUrl}/BusinessSystem/GetBusinessSystemTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportBusinessSystemTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/ExportBusinessSystemTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteBusinessSystem = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/BusinessSystem/DeleteBusinessSystem?id=${id}`, environment.httpOptions);
    }

    getBusinessSystem = (id: number): Observable<BusinessSystem> => { 
        return this.http.get<BusinessSystem>(`${environment.apiUrl}/BusinessSystem/GetBusinessSystem?id=${id}`, environment.httpOptions);
    }

    syncDiscountCategories = (businessSystemId: number): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/BusinessSystem/SyncDiscountCategories?businessSystemId=${businessSystemId}`, environment.httpOptions);
    }

    saveBusinessSystem = (businessSystemSaveBodyDTO: BusinessSystemSaveBody): Observable<BusinessSystem> => { 
        return this.http.put<BusinessSystem>(`${environment.apiUrl}/BusinessSystem/SaveBusinessSystem`, businessSystemSaveBodyDTO, environment.httpOptions);
    }

    saveBusinessSystemUpdatePointsData = (businessSystemUpdatePointsDataBodyDTO: BusinessSystemUpdatePointsDataBody): Observable<number> => { 
        return this.http.put<number>(`${environment.apiUrl}/BusinessSystem/SaveBusinessSystemUpdatePointsData`, businessSystemUpdatePointsDataBodyDTO, environment.httpOptions);
    }

    changeScheduledTaskUpdatePointsStatus = (businessSystemId: number, businessSystemVersion: number): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/BusinessSystem/ChangeScheduledTaskUpdatePointsStatus?businessSystemId=${businessSystemId}&businessSystemVersion=${businessSystemVersion}`, environment.httpOptions);
    }

    updatePoints = (updatePointsDTO: UpdatePoints): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/UpdatePoints`, updatePointsDTO, environment.httpOptions);
    }

    getBusinessSystemListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/BusinessSystem/GetBusinessSystemListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getBusinessSystemUpdatePointsScheduledTaskTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystemUpdatePointsScheduledTask>> => { 
        return this.http.post<TableResponse<BusinessSystemUpdatePointsScheduledTask>>(`${environment.apiUrl}/BusinessSystem/GetBusinessSystemUpdatePointsScheduledTaskTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/BusinessSystem/ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    getCurrentPartner = (): Observable<Partner> => { 
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetCurrentPartner`, environment.httpOptions);
    }

    getPartnerWithSlugListForAutocomplete = (limit: number, query: string): Observable<Codebook[]> => { 
        return this.http.get<Codebook[]>(`${environment.apiUrl}/Partner/GetPartnerWithSlugListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getPartnerIdsForTheCurrentUser = (): Observable<number[]> => { 
        return this.http.get<number[]>(`${environment.apiUrl}/Partner/GetPartnerIdsForTheCurrentUser`, environment.httpOptions);
    }

    getPartnerNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerNotification>> => { 
        return this.http.post<TableResponse<PartnerNotification>>(`${environment.apiUrl}/PartnerNotification/GetPartnerNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerNotification/ExportPartnerNotificationTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerNotification = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerNotification/DeletePartnerNotification?id=${id}`, environment.httpOptions);
    }

    getPartnerNotification = (id: number): Observable<PartnerNotification> => { 
        return this.http.get<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/GetPartnerNotification?id=${id}`, environment.httpOptions);
    }

    getPartnerUserNamebookListForPartnerNotification = (partnerNotificationId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerNotification/GetPartnerUserNamebookListForPartnerNotification?partnerNotificationId=${partnerNotificationId}`, environment.httpSkipSpinnerOptions);
    }

    lazyLoadSelectedPartnerUserIdsForPartnerNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${environment.apiUrl}/PartnerNotification/LazyLoadSelectedPartnerUserIdsForPartnerNotification`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    savePartnerNotification = (partnerNotificationSaveBodyDTO: PartnerNotificationSaveBody): Observable<PartnerNotification> => { 
        return this.http.put<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/SavePartnerNotification`, partnerNotificationSaveBodyDTO, environment.httpOptions);
    }

    sendPartnerNotificationEmail = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/PartnerNotification/SendPartnerNotificationEmail?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, environment.httpOptions);
    }

    getNotificationListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${environment.apiUrl}/PartnerNotification/GetNotificationListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForTheCurrentPartnerUser = (): Observable<number> => { 
        return this.http.get<number>(`${environment.apiUrl}/PartnerNotification/GetUnreadNotificationCountForTheCurrentPartnerUser`, environment.httpOptions);
    }

    getProductListForRecommendation = (): Observable<Product[]> => { 
        return this.http.get<Product[]>(`${environment.apiUrl}/Home/GetProductListForRecommendation`, environment.httpOptions);
    }

    getTierTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Tier>> => { 
        return this.http.post<TableResponse<Tier>>(`${environment.apiUrl}/Tier/GetTierTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportTierTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Tier/ExportTierTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteTier = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Tier/DeleteTier?id=${id}`, environment.httpOptions);
    }

    getTier = (id: number): Observable<Tier> => { 
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTier?id=${id}`, environment.httpOptions);
    }

    saveTier = (tierSaveBodyDTO: TierSaveBody): Observable<TierSaveBody> => { 
        return this.http.put<TierSaveBody>(`${environment.apiUrl}/Tier/SaveTier`, tierSaveBodyDTO, environment.httpOptions);
    }

    getTierListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Tier/GetTierListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getTierDTOList = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/GetTierDTOList`, environment.httpOptions);
    }

    getTierSaveBodyDTO = (): Observable<TierSaveBody> => { 
        return this.http.get<TierSaveBody>(`${environment.apiUrl}/Tier/GetTierSaveBodyDTO`, environment.httpOptions);
    }

    getTierListForDisplay = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${environment.apiUrl}/Tier/GetTierListForDisplay`, environment.httpOptions);
    }

    getTierForTheCurrentPartnerUser = (): Observable<Tier> => { 
        return this.http.get<Tier>(`${environment.apiUrl}/Tier/GetTierForTheCurrentPartnerUser`, environment.httpOptions);
    }

    getPartnerRoleTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerRole>> => { 
        return this.http.post<TableResponse<PartnerRole>>(`${environment.apiUrl}/PartnerRole/GetPartnerRoleTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerRoleTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerRole/ExportPartnerRoleTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerRole = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerRole/DeletePartnerRole?id=${id}`, environment.httpOptions);
    }

    getPartnerRole = (id: number): Observable<PartnerRole> => { 
        return this.http.get<PartnerRole>(`${environment.apiUrl}/PartnerRole/GetPartnerRole?id=${id}`, environment.httpOptions);
    }

    savePartnerRole = (partnerRoleSaveBodyDTO: PartnerRoleSaveBody): Observable<PartnerRole> => { 
        return this.http.put<PartnerRole>(`${environment.apiUrl}/PartnerRole/SavePartnerRole`, partnerRoleSaveBodyDTO, environment.httpOptions);
    }

    getPartnerUserNamebookListForPartnerRole = (partnerRoleId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/GetPartnerUserNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    getPartnerPermissionNamebookListForPartnerRole = (partnerRoleId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/GetPartnerPermissionNamebookListForPartnerRole?partnerRoleId=${partnerRoleId}`, environment.httpSkipSpinnerOptions);
    }

    getPartnerPermissionListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/GetPartnerPermissionListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getPartnerRoleListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerRole/GetPartnerRoleListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUser = (): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUser`, environment.httpSkipSpinnerOptions);
    }

    getPartnerUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerUser>> => { 
        return this.http.post<TableResponse<PartnerUser>>(`${environment.apiUrl}/PartnerUser/GetPartnerUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerUserTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/PartnerUser/ExportPartnerUserTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deletePartnerUser = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/PartnerUser/DeletePartnerUser?id=${id}`, environment.httpOptions);
    }

    getPartnerUser = (id: number): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUser?id=${id}`, environment.httpOptions);
    }

    savePartnerUser = (saveBodyDTO: PartnerUserSaveBody): Observable<PartnerUserSaveBody> => { 
        return this.http.put<PartnerUserSaveBody>(`${environment.apiUrl}/PartnerUser/SavePartnerUser`, saveBodyDTO, environment.httpOptions);
    }

    getPartnerUserListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/GetPartnerUserListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getPartnerUserListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/GetPartnerUserListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${environment.apiUrl}/PartnerUser/GetCurrentPartnerUserPermissionCodes`, environment.httpOptions);
    }

    getPartnerRoleNamebookListForPartnerUser = (partnerUserId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/PartnerUser/GetPartnerRoleNamebookListForPartnerUser?partnerUserId=${partnerUserId}`, environment.httpSkipSpinnerOptions);
    }

    getCheckedSegmentationItemIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => { 
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetCheckedSegmentationItemIdsForThePartnerUser?partnerUserId=${partnerUserId}`, environment.httpOptions);
    }

    getAlreadyFilledSegmentationIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => { 
        return this.http.get<number[]>(`${environment.apiUrl}/PartnerUser/GetAlreadyFilledSegmentationIdsForThePartnerUser?partnerUserId=${partnerUserId}`, environment.httpOptions);
    }

    getPartnerUserForTheUser = (id: number): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${environment.apiUrl}/PartnerUser/GetPartnerUserForTheUser?id=${id}`, environment.httpOptions);
    }

    addPartnerUserForTheCurrentUser = (partnerId: number): Observable<any> => { 
        return this.http.get<any>(`${environment.apiUrl}/PartnerUser/AddPartnerUserForTheCurrentUser?partnerId=${partnerId}`, environment.httpOptions);
    }

    getTransactionListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Transaction>> => { 
        return this.http.post<TableResponse<Transaction>>(`${environment.apiUrl}/PartnerUser/GetTransactionListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    getPartnerTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Segmentation>> => { 
        return this.http.post<TableResponse<Segmentation>>(`${environment.apiUrl}/Partner/GetPartnerTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportPartnerTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Partner/ExportPartnerTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    getPartnerList = (): Observable<Partner[]> => { 
        return this.http.get<Partner[]>(`${environment.apiUrl}/Partner/GetPartnerList`, environment.httpOptions);
    }

    getPartner = (id: number): Observable<Partner> => { 
        return this.http.get<Partner>(`${environment.apiUrl}/Partner/GetPartner?id=${id}`, environment.httpOptions);
    }

    getPartnerListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Partner/GetPartnerListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getPartnerListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Partner/GetPartnerListForDropdown`, environment.httpSkipSpinnerOptions);
    }



    savePartner = (saveBodyDTO: PartnerSaveBody): Observable<PartnerSaveBody> => { 
        return this.http.put<PartnerSaveBody>(`${environment.apiUrl}/Partner/SavePartner`, saveBodyDTO, environment.httpOptions);
    }

    uploadLogoImageForPartner = (file: any): Observable<string> => { 
        return this.http.post(`${environment.apiUrl}/Partner/UploadLogoImageForPartner`, file, {...environment.httpOptions, responseType: 'text'});
    }

    deletePartner = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Partner/DeletePartner?id=${id}`, environment.httpOptions);
    }






    getSegmentationList = (): Observable<Segmentation[]> => { 
        return this.http.get<Segmentation[]>(`${environment.apiUrl}/Segmentation/GetSegmentationList`, environment.httpOptions);
    }

    getSegmentation = (id: number): Observable<Segmentation> => { 
        return this.http.get<Segmentation>(`${environment.apiUrl}/Segmentation/GetSegmentation?id=${id}`, environment.httpOptions);
    }

    getSegmentationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Segmentation/GetSegmentationListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getSegmentationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Segmentation/GetSegmentationListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    getOrderedSegmentationItemsForSegmentation = (id: number): Observable<SegmentationItem[]> => { 
        return this.http.get<SegmentationItem[]>(`${environment.apiUrl}/Segmentation/GetOrderedSegmentationItemsForSegmentation?id=${id}`, environment.httpOptions);
    }

    saveSegmentation = (saveBodyDTO: SegmentationSaveBody): Observable<SegmentationSaveBody> => { 
        return this.http.put<SegmentationSaveBody>(`${environment.apiUrl}/Segmentation/SaveSegmentation`, saveBodyDTO, environment.httpOptions);
    }



    deleteSegmentation = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Segmentation/DeleteSegmentation?id=${id}`, environment.httpOptions);
    }


}
