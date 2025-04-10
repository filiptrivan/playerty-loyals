import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from '@playerty/spider';
import { ConfigService } from '../config.service';
import { PartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { TierSaveBody } from '../../entities/business-entities.generated';
import { GenderAndBirthDate } from '../../entities/business-entities.generated';
import { BusinessSystemTier } from '../../entities/business-entities.generated';
import { SegmentationItem } from '../../entities/business-entities.generated';
import { Product } from '../../entities/business-entities.generated';
import { Brand } from '../../entities/business-entities.generated';
import { PartnerUserSaveBody } from '../../entities/business-entities.generated';
import { Achievement } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroup } from '../../entities/business-entities.generated';
import { ExternalTransaction } from '../../entities/business-entities.generated';
import { ExternalDiscountProductGroup } from '../../entities/business-entities.generated';
import { InfoAndWarningResult } from '../../entities/business-entities.generated';
import { ManualUpdatePoints } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUser } from '../../entities/business-entities.generated';
import { AutomaticUpdatePoints } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { ExcelUpdatePoints } from '../../entities/business-entities.generated';
import { AchievementSaveBody } from '../../entities/business-entities.generated';
import { AchievementMainUIForm } from '../../entities/business-entities.generated';
import { BusinessSystem } from '../../entities/business-entities.generated';
import { BusinessSystemSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemMainUIForm } from '../../entities/business-entities.generated';
import { BusinessSystemTierSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTierMainUIForm } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemTierDiscountProductGroupMainUIForm } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTask } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTaskSaveBody } from '../../entities/business-entities.generated';
import { BusinessSystemUpdatePointsScheduledTaskMainUIForm } from '../../entities/business-entities.generated';
import { DiscountProductGroup } from '../../entities/business-entities.generated';
import { DiscountProductGroupSaveBody } from '../../entities/business-entities.generated';
import { DiscountProductGroupMainUIForm } from '../../entities/business-entities.generated';
import { Gender } from '../../entities/business-entities.generated';
import { GenderSaveBody } from '../../entities/business-entities.generated';
import { GenderMainUIForm } from '../../entities/business-entities.generated';
import { NotificationMainUIForm } from '../../entities/business-entities.generated';
import { Partner } from '../../entities/business-entities.generated';
import { PartnerSaveBody } from '../../entities/business-entities.generated';
import { PartnerMainUIForm } from '../../entities/business-entities.generated';
import { PartnerNotification } from '../../entities/business-entities.generated';
import { PartnerNotificationMainUIForm } from '../../entities/business-entities.generated';
import { PartnerPermission } from '../../entities/business-entities.generated';
import { PartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { PartnerPermissionMainUIForm } from '../../entities/business-entities.generated';
import { PartnerRole } from '../../entities/business-entities.generated';
import { PartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerRoleMainUIForm } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermission } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermissionSaveBody } from '../../entities/business-entities.generated';
import { PartnerRolePartnerPermissionMainUIForm } from '../../entities/business-entities.generated';
import { PartnerUserMainUIForm } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotification } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotificationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserPartnerNotificationMainUIForm } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRole } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRoleSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserPartnerRoleMainUIForm } from '../../entities/business-entities.generated';
import { PartnerUserSegmentation } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationMainUIForm } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItem } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { PartnerUserSegmentationItemMainUIForm } from '../../entities/business-entities.generated';
import { Segmentation } from '../../entities/business-entities.generated';
import { SegmentationSaveBody } from '../../entities/business-entities.generated';
import { SegmentationMainUIForm } from '../../entities/business-entities.generated';
import { SegmentationItemSaveBody } from '../../entities/business-entities.generated';
import { SegmentationItemMainUIForm } from '../../entities/business-entities.generated';
import { Tier } from '../../entities/business-entities.generated';
import { TierMainUIForm } from '../../entities/business-entities.generated';
import { Transaction } from '../../entities/business-entities.generated';
import { TransactionSaveBody } from '../../entities/business-entities.generated';
import { TransactionMainUIForm } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedMainUIForm } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { UserNotificationMainUIForm } from '../../entities/business-entities.generated';

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

    getAchievementTableDataForCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Achievement>> => { 
        return this.http.post<TableResponse<Achievement>>(`${this.config.apiUrl}/Achievement/GetAchievementTableDataForCurrentPartnerUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportAchievementTableDataToExcelForCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Achievement/ExportAchievementTableDataToExcelForCurrentPartnerUser`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getBusinessSystemTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystem>> => { 
        return this.http.post<TableResponse<BusinessSystem>>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportBusinessSystemTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExportBusinessSystemTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    syncDiscountProductGroups = (businessSystemId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/BusinessSystem/SyncDiscountProductGroups?businessSystemId=${businessSystemId}`, this.config.httpOptions);
    }

    excelUpdatePointsForWings = (dto: ExcelUpdatePoints): Observable<InfoAndWarningResult> => { 
        let formData = new FormData();
        formData.append('BusinessSystemId', dto.businessSystemId.toString());
        formData.append('BusinessSystemVersion', dto.businessSystemVersion.toString());
        dto.excels.forEach((file: File) => {
            formData.append('Excels', file);
        });
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExcelUpdatePointsForWings`, formData, this.config.httpOptions);
    }

    revertToTaskState = (taskForRevertId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/BusinessSystem/RevertToTaskState?taskForRevertId=${taskForRevertId}`, this.config.httpOptions);
    }

    sendUpdatePointsNotificationToUsers = (taskForNotificationId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/BusinessSystem/SendUpdatePointsNotificationToUsers?taskForNotificationId=${taskForNotificationId}`, this.config.httpOptions);
    }

    getBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem = (tableFilterDTO: TableFilter): Observable<TableResponse<BusinessSystemUpdatePointsScheduledTask>> => { 
        return this.http.post<TableResponse<BusinessSystemUpdatePointsScheduledTask>>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemUpdatePointsScheduledTaskTableDataForBusinessSystem`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/BusinessSystem/ExportBusinessSystemUpdatePointsScheduledTaskTableDataToExcelForBusinessSystem`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getProductListForRecommendation = (): Observable<Product[]> => { 
        return this.http.get<Product[]>(`${this.config.apiUrl}/Home/GetProductListForRecommendation`, this.config.httpOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentPartner = (): Observable<Partner> => { 
        return this.http.get<Partner>(`${this.config.apiUrl}/Partner/GetCurrentPartner`, this.config.httpOptions);
    }

    getPartnerWithSlugAutocompleteList = (limit: number, filter: string): Observable<Codebook[]> => { 
        return this.http.get<Codebook[]>(`${this.config.apiUrl}/Partner/GetPartnerWithSlugAutocompleteList?limit=${limit}&filter=${filter}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerList = (): Observable<Partner[]> => { 
        return this.http.get<Partner[]>(`${this.config.apiUrl}/Partner/GetPartnerList`, this.config.httpOptions);
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

    deletePartnerNotificationForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerNotification/DeletePartnerNotificationForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    markPartnerNotificationAsReadForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerNotification/MarkPartnerNotificationAsReadForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    markPartnerNotificationAsUnreadForCurrentPartnerUser = (partnerNotificationId: number, partnerNotificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/PartnerNotification/MarkPartnerNotificationAsUnreadForCurrentPartnerUser?partnerNotificationId=${partnerNotificationId}&partnerNotificationVersion=${partnerNotificationVersion}`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerRoleTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<PartnerRole>> => { 
        return this.http.post<TableResponse<PartnerRole>>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerRoleTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/PartnerRole/ExportPartnerRoleTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getPartnerUsersAutocompleteListForPartnerRole = (limit: number, query: string, partnerRoleId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerUsersAutocompleteListForPartnerRole?limit=${limit}&query=${query}&partnerRoleId=${partnerRoleId}`, this.config.httpSkipSpinnerOptions);
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

    getAchievementsForCurrentPartnerUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Achievement>> => { 
        return this.http.post<TableResponse<Achievement>>(`${this.config.apiUrl}/PartnerUser/GetAchievementsForCurrentPartnerUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getTierForCurrentPartnerUser = (): Observable<Tier> => { 
        return this.http.get<Tier>(`${this.config.apiUrl}/PartnerUser/GetTierForCurrentPartnerUser`, this.config.httpOptions);
    }

    getTierDropdownList = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetTierDropdownList`, this.config.httpSkipSpinnerOptions);
    }

    getPartnerUserGenderAndBirthDate = (partnerUserId: number): Observable<GenderAndBirthDate> => { 
        return this.http.get<GenderAndBirthDate>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserGenderAndBirthDate?partnerUserId=${partnerUserId}`, this.config.httpOptions);
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

    getTierSaveBodyForCurrentPartner = (): Observable<TierSaveBody> => { 
        return this.http.get<TierSaveBody>(`${this.config.apiUrl}/Tier/GetTierSaveBodyForCurrentPartner`, this.config.httpOptions);
    }

    getTierListForDisplay = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${this.config.apiUrl}/Tier/GetTierListForDisplay`, this.config.httpOptions);
    }

    getTierForPartnerUser = (partnerUserId: number): Observable<Tier> => { 
        return this.http.get<Tier>(`${this.config.apiUrl}/Tier/GetTierForPartnerUser?partnerUserId=${partnerUserId}`, this.config.httpOptions);
    }

    getBusinessSystemDropdownListForBusinessSystemTier = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Tier/GetBusinessSystemDropdownListForBusinessSystemTier`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUserExtended = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetCurrentUserExtended`, this.config.httpSkipSpinnerOptions);
    }

    getGenderDropdownListForUserExtended = (userExtendedId: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetGenderDropdownListForUserExtended?userExtendedId=${userExtendedId}`, this.config.httpSkipSpinnerOptions);
    }





    getPartnerUserList = (): Observable<PartnerUser[]> => { 
        return this.http.get<PartnerUser[]>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserList`, this.config.httpOptions);
    }

    getPartnerUserMainUIFormDTO = (id: number): Observable<PartnerUserMainUIForm> => { 
        return this.http.get<PartnerUserMainUIForm>(`${this.config.apiUrl}/PartnerUser/GetPartnerUserMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getPartnerUser = (id: number): Observable<PartnerUser> => { 
        return this.http.get<PartnerUser>(`${this.config.apiUrl}/PartnerUser/GetPartnerUser?id=${id}`, this.config.httpOptions);
    }



    getTierDropdownListForPartnerUser = (partnerUserId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetTierDropdownListForPartnerUser?partnerUserId=${partnerUserId}`, this.config.httpSkipSpinnerOptions);
    }
    getCheckedSegmentationItemsDropdownListForPartnerUser = (partnerUserId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerUser/GetCheckedSegmentationItemsDropdownListForPartnerUser?partnerUserId=${partnerUserId}`, this.config.httpSkipSpinnerOptions);
    }






    savePartnerUser = (saveBodyDTO: PartnerUserSaveBody): Observable<PartnerUserSaveBody> => { 
        return this.http.put<PartnerUserSaveBody>(`${this.config.apiUrl}/PartnerUser/SavePartnerUser`, saveBodyDTO, this.config.httpOptions);
    }



    deletePartnerUser = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/PartnerUser/DeletePartnerUser?id=${id}`, this.config.httpOptions);
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

    getNotificationMainUIFormDTO = (id: number): Observable<NotificationMainUIForm> => { 
        return this.http.get<NotificationMainUIForm>(`${this.config.apiUrl}/Notification/GetNotificationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
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






    getBusinessSystemList = (): Observable<BusinessSystem[]> => { 
        return this.http.get<BusinessSystem[]>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemList`, this.config.httpOptions);
    }

    getBusinessSystemMainUIFormDTO = (id: number): Observable<BusinessSystemMainUIForm> => { 
        return this.http.get<BusinessSystemMainUIForm>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystemMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getBusinessSystem = (id: number): Observable<BusinessSystem> => { 
        return this.http.get<BusinessSystem>(`${this.config.apiUrl}/BusinessSystem/GetBusinessSystem?id=${id}`, this.config.httpOptions);
    }





    getOrderedDiscountProductGroupsForBusinessSystem = (id: number): Observable<DiscountProductGroup[]> => { 
        return this.http.get<DiscountProductGroup[]>(`${this.config.apiUrl}/BusinessSystem/GetOrderedDiscountProductGroupsForBusinessSystem?id=${id}`, this.config.httpOptions);
    }



    saveBusinessSystem = (saveBodyDTO: BusinessSystemSaveBody): Observable<BusinessSystemSaveBody> => { 
        return this.http.put<BusinessSystemSaveBody>(`${this.config.apiUrl}/BusinessSystem/SaveBusinessSystem`, saveBodyDTO, this.config.httpOptions);
    }



    deleteBusinessSystem = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/BusinessSystem/DeleteBusinessSystem?id=${id}`, this.config.httpOptions);
    }


    getPartnerTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Partner>> => { 
        return this.http.post<TableResponse<Partner>>(`${this.config.apiUrl}/Partner/GetPartnerTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportPartnerTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Partner/ExportPartnerTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }



    getPartnerMainUIFormDTO = (id: number): Observable<PartnerMainUIForm> => { 
        return this.http.get<PartnerMainUIForm>(`${this.config.apiUrl}/Partner/GetPartnerMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getPartner = (id: number): Observable<Partner> => { 
        return this.http.get<Partner>(`${this.config.apiUrl}/Partner/GetPartner?id=${id}`, this.config.httpOptions);
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






    getSegmentationList = (): Observable<Segmentation[]> => { 
        return this.http.get<Segmentation[]>(`${this.config.apiUrl}/Segmentation/GetSegmentationList`, this.config.httpOptions);
    }

    getSegmentationMainUIFormDTO = (id: number): Observable<SegmentationMainUIForm> => { 
        return this.http.get<SegmentationMainUIForm>(`${this.config.apiUrl}/Segmentation/GetSegmentationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getSegmentation = (id: number): Observable<Segmentation> => { 
        return this.http.get<Segmentation>(`${this.config.apiUrl}/Segmentation/GetSegmentation?id=${id}`, this.config.httpOptions);
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


    getAchievementTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Achievement>> => { 
        return this.http.post<TableResponse<Achievement>>(`${this.config.apiUrl}/Achievement/GetAchievementTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportAchievementTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Achievement/ExportAchievementTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getAchievementList = (): Observable<Achievement[]> => { 
        return this.http.get<Achievement[]>(`${this.config.apiUrl}/Achievement/GetAchievementList`, this.config.httpOptions);
    }

    getAchievementMainUIFormDTO = (id: number): Observable<AchievementMainUIForm> => { 
        return this.http.get<AchievementMainUIForm>(`${this.config.apiUrl}/Achievement/GetAchievementMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getAchievement = (id: number): Observable<Achievement> => { 
        return this.http.get<Achievement>(`${this.config.apiUrl}/Achievement/GetAchievement?id=${id}`, this.config.httpOptions);
    }









    saveAchievement = (saveBodyDTO: AchievementSaveBody): Observable<AchievementSaveBody> => { 
        return this.http.put<AchievementSaveBody>(`${this.config.apiUrl}/Achievement/SaveAchievement`, saveBodyDTO, this.config.httpOptions);
    }



    deleteAchievement = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Achievement/DeleteAchievement?id=${id}`, this.config.httpOptions);
    }






    getPartnerNotificationList = (): Observable<PartnerNotification[]> => { 
        return this.http.get<PartnerNotification[]>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationList`, this.config.httpOptions);
    }

    getPartnerNotificationMainUIFormDTO = (id: number): Observable<PartnerNotificationMainUIForm> => { 
        return this.http.get<PartnerNotificationMainUIForm>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotificationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getPartnerNotification = (id: number): Observable<PartnerNotification> => { 
        return this.http.get<PartnerNotification>(`${this.config.apiUrl}/PartnerNotification/GetPartnerNotification?id=${id}`, this.config.httpOptions);
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

    getPartnerRoleMainUIFormDTO = (id: number): Observable<PartnerRoleMainUIForm> => { 
        return this.http.get<PartnerRoleMainUIForm>(`${this.config.apiUrl}/PartnerRole/GetPartnerRoleMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getPartnerRole = (id: number): Observable<PartnerRole> => { 
        return this.http.get<PartnerRole>(`${this.config.apiUrl}/PartnerRole/GetPartnerRole?id=${id}`, this.config.httpOptions);
    }



    getPartnerPermissionsDropdownListForPartnerRole = (partnerRoleId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/PartnerRole/GetPartnerPermissionsDropdownListForPartnerRole?partnerRoleId=${partnerRoleId}`, this.config.httpSkipSpinnerOptions);
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


    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedList`, this.config.httpOptions);
    }

    getUserExtendedMainUIFormDTO = (id: number): Observable<UserExtendedMainUIForm> => { 
        return this.http.get<UserExtendedMainUIForm>(`${this.config.apiUrl}/UserExtended/GetUserExtendedMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetUserExtended?id=${id}`, this.config.httpOptions);
    }









    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${this.config.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, this.config.httpOptions);
    }



    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, this.config.httpOptions);
    }


    getTierTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Tier>> => { 
        return this.http.post<TableResponse<Tier>>(`${this.config.apiUrl}/Tier/GetTierTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportTierTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Tier/ExportTierTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getTierList = (): Observable<Tier[]> => { 
        return this.http.get<Tier[]>(`${this.config.apiUrl}/Tier/GetTierList`, this.config.httpOptions);
    }

    getTierMainUIFormDTO = (id: number): Observable<TierMainUIForm> => { 
        return this.http.get<TierMainUIForm>(`${this.config.apiUrl}/Tier/GetTierMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getTier = (id: number): Observable<Tier> => { 
        return this.http.get<Tier>(`${this.config.apiUrl}/Tier/GetTier?id=${id}`, this.config.httpOptions);
    }









    saveTier = (saveBodyDTO: TierSaveBody): Observable<TierSaveBody> => { 
        return this.http.put<TierSaveBody>(`${this.config.apiUrl}/Tier/SaveTier`, saveBodyDTO, this.config.httpOptions);
    }



    deleteTier = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Tier/DeleteTier?id=${id}`, this.config.httpOptions);
    }


}
