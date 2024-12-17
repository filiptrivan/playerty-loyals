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
import { NotificationSaveBody } from '../../entities/generated/business-entities.generated';
import { TierSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/generated/business-entities.generated';
import { UserExtended } from '../../entities/generated/business-entities.generated';
import { Product } from '../../entities/generated/business-entities.generated';
import { StoreTier } from '../../entities/generated/business-entities.generated';
import { MergedPartnerUser } from '../../entities/generated/business-entities.generated';
import { Brand } from '../../entities/generated/business-entities.generated';
import { SegmentationItem } from '../../entities/generated/business-entities.generated';
import { Notification } from '../../entities/generated/business-entities.generated';
import { PartnerUserSaveBody } from '../../entities/generated/business-entities.generated';
import { ExternalTransaction } from '../../entities/generated/business-entities.generated';
import { StoreUpdatePointsDataBody } from '../../entities/generated/business-entities.generated';
import { UpdatePoints } from '../../entities/generated/business-entities.generated';
import { StoreSaveBody } from '../../entities/generated/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/generated/business-entities.generated';
import { OnlineShop } from '../../entities/generated/business-entities.generated';
import { SegmentationSaveBody } from '../../entities/generated/business-entities.generated';
import { Segmentation } from '../../entities/generated/business-entities.generated';
import { ExternalDiscountCategory } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationSaveBody } from '../../entities/generated/business-entities.generated';
import { QrCode } from '../../entities/generated/business-entities.generated';
import { StoreTierDiscountCategory } from '../../entities/generated/business-entities.generated';
import { DiscountCategory } from '../../entities/generated/business-entities.generated';
import { PartnerUser } from '../../entities/generated/business-entities.generated';
import { Gender } from '../../entities/generated/business-entities.generated';
import { GenderSaveBody } from '../../entities/generated/business-entities.generated';
import { Store } from '../../entities/generated/business-entities.generated';
import { SegmentationItemSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationPartnerUser } from '../../entities/generated/business-entities.generated';
import { PartnerNotificationPartnerUserSaveBody } from '../../entities/generated/business-entities.generated';
import { StoreTierSaveBody } from '../../entities/generated/business-entities.generated';
import { Transaction } from '../../entities/generated/business-entities.generated';
import { TransactionSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerRole } from '../../entities/generated/business-entities.generated';
import { DiscountCategorySaveBody } from '../../entities/generated/business-entities.generated';
import { NotificationUser } from '../../entities/generated/business-entities.generated';
import { NotificationUserSaveBody } from '../../entities/generated/business-entities.generated';
import { StoreTierDiscountCategorySaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerNotification } from '../../entities/generated/business-entities.generated';
import { StoreUpdatePointsScheduledTask } from '../../entities/generated/business-entities.generated';
import { StoreUpdatePointsScheduledTaskSaveBody } from '../../entities/generated/business-entities.generated';
import { Partner } from '../../entities/generated/business-entities.generated';
import { PartnerSaveBody } from '../../entities/generated/business-entities.generated';
import { PartnerPermission } from '../../entities/generated/business-entities.generated';
import { PartnerPermissionSaveBody } from '../../entities/generated/business-entities.generated';
import { Tier } from '../../entities/generated/business-entities.generated';
import { LazyTableSelection } from '../../entities/generated/shared-entities.generated';
import { JwtAuthResult } from '../../entities/generated/security-entities.generated';
import { ForgotPassword } from '../../entities/generated/security-entities.generated';
import { AuthResult } from '../../entities/generated/security-entities.generated';
import { VerificationTokenRequest } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationResult } from '../../entities/generated/security-entities.generated';
import { RegistrationVerificationToken } from '../../entities/generated/security-entities.generated';
import { ExternalProvider } from '../../entities/generated/security-entities.generated';
import { LoginVerificationToken } from '../../entities/generated/security-entities.generated';
import { Login } from '../../entities/generated/security-entities.generated';
import { RefreshTokenRequest } from '../../entities/generated/security-entities.generated';
import { ForgotPasswordVerificationToken } from '../../entities/generated/security-entities.generated';
import { Registration } from '../../entities/generated/security-entities.generated';
import { RefreshToken } from '../../entities/generated/security-entities.generated';
import { RoleSaveBody } from '../../entities/generated/security-entities.generated';
import { RoleUserSaveBody } from '../../entities/generated/security-entities.generated';
import { Role } from '../../entities/generated/security-entities.generated';
import { Permission } from '../../entities/generated/security-entities.generated';
import { PermissionSaveBody } from '../../entities/generated/security-entities.generated';

@Injectable()
export class ApiGeneratedService extends ApiSecurityService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    
    loadSegmentationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Segmentation/LoadSegmentationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    forgotPassword = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Auth/ForgotPassword`, request, environment.httpOptions);
    }

    getCurrentUser = (): Observable<UserExtended> => {
        return this.http.get<UserExtended>(`${environment.apiUrl}/Auth/GetCurrentUser`, environment.httpSkipSpinnerOptions);
    }

    loadUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadUserForNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Auth/LoadUserForNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    loadUserExtendedNamebookListForNotification = (notificationId: number): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Auth/LoadUserExtendedNamebookListForNotification?notificationId=${notificationId}`, environment.httpSkipSpinnerOptions);
    }

    loadStoreTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Store/LoadStoreTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportStoreTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Store/ExportStoreTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    deleteStore = (id: number): Observable<any> => { 
        return this.http.delete<any>(`${environment.apiUrl}/Store/DeleteStore?id=${id}`);
    }

    getStore = (id: number): Observable<Store> => {
        return this.http.get<Store>(`${environment.apiUrl}/Store/GetStore?id=${id}`);
    }

    syncDiscountCategories = (storeId: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/Store/SyncDiscountCategories?storeId=${storeId}`);
    }

    saveStore = (storeSaveBodyDTO: StoreSaveBody): Observable<Store> => { 
        return this.http.put<Store>(`${environment.apiUrl}/Store/SaveStore`, storeSaveBodyDTO, environment.httpOptions);
    }

    saveStoreUpdatePointsData = (storeUpdatePointsDataBodyDTO: StoreUpdatePointsDataBody): Observable<number> => { 
        return this.http.put<number>(`${environment.apiUrl}/Store/SaveStoreUpdatePointsData`, storeUpdatePointsDataBodyDTO, environment.httpOptions);
    }

    changeScheduledTaskUpdatePointsStatus = (storeId: number, storeVersion: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/Store/ChangeScheduledTaskUpdatePointsStatus?storeId=${storeId}&storeVersion=${storeVersion}`);
    }

    updatePoints = (updatePointsDTO: UpdatePoints): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Store/UpdatePoints`, updatePointsDTO, environment.httpOptions);
    }

    loadStoreListForDropdown = (): Observable<Namebook[]> => {
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Store/LoadStoreListForDropdown`, environment.httpSkipSpinnerOptions);
    }

    loadStoreUpdatePointsScheduledTaskTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Store/LoadStoreUpdatePointsScheduledTaskTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportStoreUpdatePointsScheduledTaskTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post<any>(`${environment.apiUrl}/Store/ExportStoreUpdatePointsScheduledTaskTableDataToExcel`, tableFilterDTO, environment.httpOptions);
    }

    loadPartnerTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Partner/LoadPartnerTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadPartnerNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadPartnerNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadPartnerUserForPartnerNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadPartnerUserForPartnerNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    savePartnerNotification = (partnerNotificationSaveBodyDTO: PartnerNotificationSaveBody): Observable<PartnerNotification> => { 
        return this.http.put<PartnerNotification>(`${environment.apiUrl}/PartnerNotification/SavePartnerNotification`, partnerNotificationSaveBodyDTO, environment.httpOptions);
    }

    sendPartnerNotificationEmail = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => {
        return this.http.get<any>(`${environment.apiUrl}/PartnerNotification/SendPartnerNotificationEmail?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`);
    }

    loadNotificationListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerNotification/LoadNotificationListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForTheCurrentPartnerUser = (): Observable<number> => {
        return this.http.get<number>(`${environment.apiUrl}/PartnerNotification/GetUnreadNotificationCountForTheCurrentPartnerUser`);
    }

    getProductsForTheRecommendation = (): Observable<Product[]> => {
        return this.http.get<Product[]>(`${environment.apiUrl}/Home/GetProductsForTheRecommendation`);
    }

    loadTierTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/Tier/LoadTierTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadPartnerRoleTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerRole/LoadPartnerRoleTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadPartnerUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerUser/LoadPartnerUserTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
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

    loadTransactionListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse> => { 
        return this.http.post<TableResponse>(`${environment.apiUrl}/PartnerUser/LoadTransactionListForTheCurrentPartnerUser`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

}

