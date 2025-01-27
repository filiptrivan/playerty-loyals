import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from '@playerty/spider';
import { ConfigService } from '../config.service';
import { Brand } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsDataBody } from '../../entities/business-entities.generated';
import { ExcelManualUpdatePoints } from '../../entities/business-entities.generated';
import { ExternalDiscountProductGroup } from '../../entities/business-entities.generated';
import { ExternalTransaction } from '../../entities/business-entities.generated';
import { MergedPartnerUser } from '../../entities/business-entities.generated';
import { Product } from '../../entities/business-entities.generated';
import { QrCode } from '../../entities/business-entities.generated';
import { UpdatePoints } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroup } from '../../entities/business-entities.generated';
import { BusinessSystemTier } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { PartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSaveBody } from '../../entities/business-entities.generated';
import { SegmentationItem } from '../../entities/business-entities.generated';
import { TierSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystem } from '../../entities/business-entities.generated';
import { BusinessSystemSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTierSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTask } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTaskSaveBody } from '../../entities/business-entities.generated';
import { DiscountProductGroup } from '../../entities/business-entities.generated';
import { DiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { Gender } from '../../entities/business-entities.generated';
import { GenderSaveBody } from '../../entities/business-entities.generated';
import { Partner } from '../../entities/business-entities.generated';
import { PartnerSaveBody } from '../../entities/business-entities.generated';
import { PartnerNotification } from '../../entities/business-entities.generated';
import { PartnerPermission } from '../../entities/business-entities.generated';
import { PartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { PartnerRole } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermission } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { PartnerUser } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotification } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRole } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentation } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItem } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { Segmentation } from '../../entities/business-entities.generated';
import { SegmentationSaveBody } from '../../entities/business-entities.generated';
import { SegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { Tier } from '../../entities/business-entities.generated';
import { Transaction } from '../../entities/business-entities.generated';
import { TransactionSaveBody } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Injectable({
    providedIn: 'root'
})
export class ApiGeneratedService extends ApiSecurityService {

    constructor(
        protected override http: HttpClient,
        protected override config: ConfigService
    ) {
        super(http, config);
    }

    getBusinessSystemTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystem>> => { 
        return this.http.post<TableResponse<BusinessSystem>>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportBusinessSystemTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExportBusinessSystemTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    deleteBusinessSystem = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/BusinessSystem/DeleteBusinessSystem?id=${id}`, this.config.httpOptions);
    }

    getBusinessSystem = (id: number): Observable<BusinessSystem> => { 
        return this.http.get<BusinessSystem>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystem?id=${id}`, this.config.httpOptions);
    }

    syncDiscountCategories = (businessSystemId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/BusinessSystem/SyncDiscountCategories?businessSystemId=${businessSystemId}`, this.config.httpOptions);
    }

    saveBusinessSystem = (businessSystemSaveBodyDTO: BusinessSystemSaveBody): Observable<BusinessSystemSaveBody> => { 
        return this.http.put<BusinessSystemSaveBody>(`${this.config.apiUrl}/BusinessSystem/SaveBusinessSystem`, businessSystemSaveBodyDTO, this.config.httpOptions);
    }

    saveBusinessSystemUpdatePointsData = (businessSystemUpdatePointsDataBodyDTO: BusinessSystemUpdatePointsDataBody): Observable<number> => { 
        return this.http.put<number>(`${this.config.apiUrl}/BusinessSystem/SaveBusinessSystemUpdatePointsData`, businessSystemUpdatePointsDataBodyDTO, this.config.httpOptions);
    }

    changeScheduledTaskUpdatePointsStatus = (businessSystemId: number, businessSystemVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/BusinessSystem/ChangeScheduledTaskUpdatePointsStatus?businessSystemId=${businessSystemId}&businessSystemVersion=${businessSystemVersion}`, this.config.httpOptions);
    }

    updatePoints = (updatePointsDTO: UpdatePoints): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/UpdatePoints`, updatePointsDTO, this.config.httpOptions);
    }

    excelManualUpdatePoints = (dto: ExcelManualUpdatePoints): Observable<any> => { 
        let formData = new FormData();
        formData.append('BusinessSystemId', dto.businessSystemId.toString());
        formData.append('BusinessSystemVersion', dto.businessSystemVersion.toString());
        formData.append('Excel', dto.excel);
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExcelManualUpdatePoints`, formData, this.config.httpOptions);
    }

    getBusinessSystemListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getBusinessSystemUpdatePointsScheduledTaskTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystemUpdatePointsScheduledTask>> => { 
        return this.http.post<TableResponse<BusinessSystemUpdatePointsScheduledTask>>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemUpdatePointsScheduledTaskTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getProductListForRecommendation = (): Observable<Product[]> => { 
        return this.http.get<Product[]>(`${this.config.apiUrl}/Home/GetProductListForRecommendation`, this.config.httpOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    getCurrentPartner = (): Observable<Partner> => { 
        return this.http.get<Partner>(`${this.config.apiUrl}/Partner/GetCurrentPartner`, this.config.httpOptions);
    }

    getPartnerWithSlugListForAutocomplete = (limit: number, query: string): Observable<Codebook[]> => { 
        return this.http.get<Codebook[]>(`${this.config.apiUrl}/Partner/GetPartnerWithSlugListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerIdsForTheCurrentUser = (): Observable<number[]> => { 
        return this.http.get<number[]>(`${this.config.apiUrl}/Partner/GetPartnerIdsForTheCurrentUser`, this.config.httpOptions);
    }

    getPartnerNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerNotification>> => { 
        return this.http.post<TableResponse<PartnerNotification>>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/PartnerNotification/ExportPartnerNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getRecipientsTableDataForPartnerNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerUser>> => { 
        return this.http.post<TableResponse<PartnerUser>>(`${this.config.apiUrl}/PartnerNotification/GetRecipientsTableDataForPartnerNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForPartnerNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/PartnerNotification/ExportRecipientsTableDataToExcelForPartnerNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getRecipientsNamebookListForPartnerNotification = (partnerNotificationId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerNotification/GetRecipientsNamebookListForPartnerNotification?partnerNotificationId=${partnerNotificationId}`, this.config.httpSkipSpinnerOptions);
    }

    lazyLoadSelectedRecipientsIdsForPartnerNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/PartnerNotification/LazyLoadSelectedRecipientsIdsForPartnerNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    sendPartnerNotificationEmail = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerNotification/SendPartnerNotificationEmail?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpOptions);
    }

    getNotificationsForCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/PartnerNotification/GetNotificationsForCurrentPartnerUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForCurrentPartnerUser = (): Observable<number> => { 
        return this.http.get<number>(`${this.config.apiUrl}/PartnerNotification/GetUnreadNotificationCountForCurrentPartnerUser`, this.config.httpOptions);
    }

    deletePartnerNotificationForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerNotification/DeletePartnerNotificationForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpOptions);
    }

    markPartnerNotificationAsReadForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerNotification/MarkPartnerNotificationAsReadForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpOptions);
    }

    markPartnerNotificationAsUnreadForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerNotification/MarkPartnerNotificationAsUnreadForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpOptions);
    }

    getPartnerRoleTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerRole>> => { 
        return this.http.post<TableResponse<PartnerRole>>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerRoleTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/PartnerRole/ExportPartnerRoleTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getPartnerPermissionListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerPermissionListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerRoleListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUser = (): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${this.config.apiUrl}/PartnerUser/GetCurrentPartnerUser`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerUserTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerUser>> => { 
        return this.http.post<TableResponse<PartnerUser>>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerUserTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/PartnerUser/ExportPartnerUserTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    deletePartnerUser = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerUser/DeletePartnerUser?id=${id}`, this.config.httpOptions);
    }

    getPartnerUser = (id: number): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${this.config.apiUrl}/PartnerUser/GetPartnerUser?id=${id}`, this.config.httpOptions);
    }

    savePartnerUser = (saveBodyDTO: PartnerUserSaveBody): Observable<PartnerUserSaveBody> => { 
        return this.http.put<PartnerUserSaveBody>(`${this.config.apiUrl}/PartnerUser/SavePartnerUser`, saveBodyDTO, this.config.httpOptions);
    }

    getPartnerUserListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerUserListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentPartnerUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${this.config.apiUrl}/PartnerUser/GetCurrentPartnerUserPermissionCodes`, this.config.httpOptions);
    }

    getPartnerRoleNamebookListForPartnerUser = (partnerUserId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetPartnerRoleNamebookListForPartnerUser?partnerUserId=${partnerUserId}`, this.config.httpSkipSpinnerOptions);
    }

    getCheckedSegmentationItemIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => { 
        return this.http.get<number[]>(`${this.config.apiUrl}/PartnerUser/GetCheckedSegmentationItemIdsForThePartnerUser?partnerUserId=${partnerUserId}`, this.config.httpOptions);
    }

    getAlreadyFilledSegmentationIdsForThePartnerUser = (partnerUserId: number): Observable<number[]> => { 
        return this.http.get<number[]>(`${this.config.apiUrl}/PartnerUser/GetAlreadyFilledSegmentationIdsForThePartnerUser?partnerUserId=${partnerUserId}`, this.config.httpOptions);
    }

    getPartnerUserForTheUser = (id: number): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserForTheUser?id=${id}`, this.config.httpOptions);
    }

    addPartnerUserForTheCurrentUser = (partnerId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerUser/AddPartnerUserForTheCurrentUser?partnerId=${partnerId}`, this.config.httpOptions);
    }

    getTransactionListForTheCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Transaction>> => { 
        return this.http.post<TableResponse<Transaction>>(`${this.config.apiUrl}/PartnerUser/GetTransactionListForTheCurrentPartnerUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getSegmentationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Segmentation>> => { 
        return this.http.post<TableResponse<Segmentation>>(`${this.config.apiUrl}/Segmentation/GetSegmentationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportSegmentationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Segmentation/ExportSegmentationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getSegmentationListForTheCurrentPartner = (): Observable<Segmentation[]> => { 
        return this.http.get<Segmentation[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationListForTheCurrentPartner`, this.config.httpOptions);
    }

    getSegmentationItemListForTheCurrentPartner = (): Observable<SegmentationItem[]> => { 
        return this.http.get<SegmentationItem[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationItemListForTheCurrentPartner`, this.config.httpOptions);
    }

    getSegmentationItemListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationItemListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getTierTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Tier>> => { 
        return this.http.post<TableResponse<Tier>>(`${this.config.apiUrl}/Tier/GetTierTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportTierTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Tier/ExportTierTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    deleteTier = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Tier/DeleteTier?id=${id}`, this.config.httpOptions);
    }

    getTier = (id: number): Observable<Tier> => { 
        return this.http.get<Tier>(`${this.config.apiUrl}/Tier/GetTier?id=${id}`, this.config.httpOptions);
    }

    saveTier = (tierSaveBodyDTO: TierSaveBody): Observable<TierSaveBody> => { 
        return this.http.put<TierSaveBody>(`${this.config.apiUrl}/Tier/SaveTier`, tierSaveBodyDTO, this.config.httpOptions);
    }

    getTierListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Tier/GetTierListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getTierDTOList = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${this.config.apiUrl}/Tier/GetTierDTOList`, this.config.httpOptions);
    }

    getTierSaveBodyDTO = (): Observable<TierSaveBody> => { 
        return this.http.get<TierSaveBody>(`${this.config.apiUrl}/Tier/GetTierSaveBodyDTO`, this.config.httpOptions);
    }

    getTierListForDisplay = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${this.config.apiUrl}/Tier/GetTierListForDisplay`, this.config.httpOptions);
    }

    getTierForTheCurrentPartnerUser = (): Observable<Tier> => { 
        return this.http.get<Tier>(`${this.config.apiUrl}/Tier/GetTierForTheCurrentPartnerUser`, this.config.httpOptions);
    }

    getCurrentUserExtended = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetCurrentUserExtended`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${this.config.apiUrl}/UserExtended/GetCurrentUserPermissionCodes`, this.config.httpSkipSpinnerOptions);
    }

    getGenderListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetGenderListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${this.config.apiUrl}/Notification/GetNotificationList`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
    }

    getNotificationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Notification/GetNotificationListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getNotificationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Notification/GetNotificationListForDropdown`, this.config.httpSkipSpinnerOptions);
    }



    getRecipientsTableDataForNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/Notification/GetRecipientsTableDataForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportRecipientsTableDataToExcelForNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${this.config.apiUrl}/Notification/SaveNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotification?id=${id}`, this.config.httpOptions);
    }


    getPartnerTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Partner>> => { 
        return this.http.post<TableResponse<Partner>>(`${this.config.apiUrl}/Partner/GetPartnerTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Partner/ExportPartnerTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getPartnerList = (): Observable<Partner[]> => { 
        return this.http.get<Partner[]>(`${this.config.apiUrl}/Partner/GetPartnerList`, this.config.httpOptions);
    }

    getPartner = (id: number): Observable<Partner> => { 
        return this.http.get<Partner>(`${this.config.apiUrl}/Partner/GetPartner?id=${id}`, this.config.httpOptions);
    }

    getPartnerListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Partner/GetPartnerListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Partner/GetPartnerListForDropdown`, this.config.httpSkipSpinnerOptions);
    }





    savePartner = (saveBodyDTO: PartnerSaveBody): Observable<PartnerSaveBody> => { 
        return this.http.put<PartnerSaveBody>(`${this.config.apiUrl}/Partner/SavePartner`, saveBodyDTO, this.config.httpOptions);
    }

    uploadLogoImageForPartner = (file: any): Observable<string> => { 
        return this.http.post(`${this.config.apiUrl}/Partner/UploadLogoImageForPartner`, file, { ...this.config.httpOptions, responseType: 'text' });
    }

    deletePartner = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Partner/DeletePartner?id=${id}`, this.config.httpOptions);
    }






    getPartnerNotificationList = (): Observable<PartnerNotification[]> => { 
        return this.http.get<PartnerNotification[]>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationList`, this.config.httpOptions);
    }

    getPartnerNotification = (id: number): Observable<PartnerNotification> => { 
        return this.http.get<PartnerNotification>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotification?id=${id}`, this.config.httpOptions);
    }

    getPartnerNotificationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerNotificationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationListForDropdown`, this.config.httpSkipSpinnerOptions);
    }









    savePartnerNotification = (saveBodyDTO: PartnerNotificationSaveBody): Observable<PartnerNotificationSaveBody> => { 
        return this.http.put<PartnerNotificationSaveBody>(`${this.config.apiUrl}/PartnerNotification/SavePartnerNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deletePartnerNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerNotification/DeletePartnerNotification?id=${id}`, this.config.httpOptions);
    }






    getPartnerRoleList = (): Observable<PartnerRole[]> => { 
        return this.http.get<PartnerRole[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleList`, this.config.httpOptions);
    }

    getPartnerRole = (id: number): Observable<PartnerRole> => { 
        return this.http.get<PartnerRole>(`${this.config.apiUrl}/PartnerRole/GetPartnerRole?id=${id}`, this.config.httpOptions);
    }

    getPartnerRoleListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }





    getPartnerUsersNamebookListForPartnerRole = (id: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerUsersNamebookListForPartnerRole?id=${id}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerPermissionsNamebookListForPartnerRole = (id: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerPermissionsNamebookListForPartnerRole?id=${id}`, this.config.httpSkipSpinnerOptions);
    }

    savePartnerRole = (saveBodyDTO: PartnerRoleSaveBody): Observable<PartnerRoleSaveBody> => { 
        return this.http.put<PartnerRoleSaveBody>(`${this.config.apiUrl}/PartnerRole/SavePartnerRole`, saveBodyDTO, this.config.httpOptions);
    }



    deletePartnerRole = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerRole/DeletePartnerRole?id=${id}`, this.config.httpOptions);
    }






    getSegmentationList = (): Observable<Segmentation[]> => { 
        return this.http.get<Segmentation[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationList`, this.config.httpOptions);
    }

    getSegmentation = (id: number): Observable<Segmentation> => { 
        return this.http.get<Segmentation>(`${this.config.apiUrl}/Segmentation/GetSegmentation?id=${id}`, this.config.httpOptions);
    }

    getSegmentationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getSegmentationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationListForDropdown`, this.config.httpSkipSpinnerOptions);
    }

    getOrderedSegmentationItemsForSegmentation = (id: number): Observable<SegmentationItem[]> => { 
        return this.http.get<SegmentationItem[]>(`${this.config.apiUrl}/Segmentation/GetOrderedSegmentationItemsForSegmentation?id=${id}`, this.config.httpOptions);
    }



    saveSegmentation = (saveBodyDTO: SegmentationSaveBody): Observable<SegmentationSaveBody> => { 
        return this.http.put<SegmentationSaveBody>(`${this.config.apiUrl}/Segmentation/SaveSegmentation`, saveBodyDTO, this.config.httpOptions);
    }



    deleteSegmentation = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Segmentation/DeleteSegmentation?id=${id}`, this.config.httpOptions);
    }


    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedList`, this.config.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetUserExtended?id=${id}`, this.config.httpOptions);
    }

    getUserExtendedListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getUserExtendedListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedListForDropdown`, this.config.httpSkipSpinnerOptions);
    }



    getRolesNamebookListForUserExtended = (id: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetRolesNamebookListForUserExtended?id=${id}`, this.config.httpSkipSpinnerOptions);
    }

    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${this.config.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, this.config.httpOptions);
    }



    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, this.config.httpOptions);
    }


}
