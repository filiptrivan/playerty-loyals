import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesGeneratedService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    translate = (name: string): string => {
        switch(name) 
        {
            case 'Achievement':
                return this.translocoService.translate('Achievement');
            case 'AchievementMainUIForm':
                return this.translocoService.translate('AchievementMainUIForm');
            case 'AchievementSaveBody':
                return this.translocoService.translate('AchievementSaveBody');
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
            case 'AutomaticUpdatePoints':
                return this.translocoService.translate('AutomaticUpdatePoints');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'BusinessObjectCodebook':
                return this.translocoService.translate('BusinessObjectCodebook');
            case 'BusinessObject':
                return this.translocoService.translate('BusinessObject');
            case 'BusinessObjectNamebook':
                return this.translocoService.translate('BusinessObjectNamebook');
            case 'BusinessSystem':
                return this.translocoService.translate('BusinessSystem');
            case 'BusinessSystemMainUIForm':
                return this.translocoService.translate('BusinessSystemMainUIForm');
            case 'BusinessSystemSaveBody':
                return this.translocoService.translate('BusinessSystemSaveBody');
            case 'BusinessSystemTierDiscountProductGroup':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroup');
            case 'BusinessSystemTierDiscountProductGroupMainUIForm':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupMainUIForm');
            case 'BusinessSystemTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupSaveBody');
            case 'BusinessSystemTier':
                return this.translocoService.translate('BusinessSystemTier');
            case 'BusinessSystemTierMainUIForm':
                return this.translocoService.translate('BusinessSystemTierMainUIForm');
            case 'BusinessSystemTierSaveBody':
                return this.translocoService.translate('BusinessSystemTierSaveBody');
            case 'BusinessSystemUpdatePointsScheduledTask':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTask');
            case 'BusinessSystemUpdatePointsScheduledTaskMainUIForm':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskMainUIForm');
            case 'BusinessSystemUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskSaveBody');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupMainUIForm':
                return this.translocoService.translate('DiscountProductGroupMainUIForm');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            case 'ExcelUpdatePoints':
                return this.translocoService.translate('ExcelUpdatePoints');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'GenderAndBirthDate':
                return this.translocoService.translate('GenderAndBirthDate');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderMainUIForm':
                return this.translocoService.translate('GenderMainUIForm');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'InfoAndWarningResult':
                return this.translocoService.translate('InfoAndWarningResult');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'ManualUpdatePoints':
                return this.translocoService.translate('ManualUpdatePoints');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'NotificationMainUIForm':
                return this.translocoService.translate('NotificationMainUIForm');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerMainUIForm':
                return this.translocoService.translate('PartnerMainUIForm');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationMainUIForm':
                return this.translocoService.translate('PartnerNotificationMainUIForm');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionMainUIForm':
                return this.translocoService.translate('PartnerPermissionMainUIForm');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'PartnerRoleMainUIForm':
                return this.translocoService.translate('PartnerRoleMainUIForm');
            case 'PartnerRolePartnerPermission':
                return this.translocoService.translate('PartnerRolePartnerPermission');
            case 'PartnerRolePartnerPermissionMainUIForm':
                return this.translocoService.translate('PartnerRolePartnerPermissionMainUIForm');
            case 'PartnerRolePartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerRolePartnerPermissionSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'PartnerUserMainUIForm':
                return this.translocoService.translate('PartnerUserMainUIForm');
            case 'PartnerUserPartnerNotification':
                return this.translocoService.translate('PartnerUserPartnerNotification');
            case 'PartnerUserPartnerNotificationMainUIForm':
                return this.translocoService.translate('PartnerUserPartnerNotificationMainUIForm');
            case 'PartnerUserPartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerUserPartnerNotificationSaveBody');
            case 'PartnerUserPartnerRole':
                return this.translocoService.translate('PartnerUserPartnerRole');
            case 'PartnerUserPartnerRoleMainUIForm':
                return this.translocoService.translate('PartnerUserPartnerRoleMainUIForm');
            case 'PartnerUserPartnerRoleSaveBody':
                return this.translocoService.translate('PartnerUserPartnerRoleSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'PartnerUserSegmentation':
                return this.translocoService.translate('PartnerUserSegmentation');
            case 'PartnerUserSegmentationItem':
                return this.translocoService.translate('PartnerUserSegmentationItem');
            case 'PartnerUserSegmentationItemMainUIForm':
                return this.translocoService.translate('PartnerUserSegmentationItemMainUIForm');
            case 'PartnerUserSegmentationItemSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationItemSaveBody');
            case 'PartnerUserSegmentationMainUIForm':
                return this.translocoService.translate('PartnerUserSegmentationMainUIForm');
            case 'PartnerUserSegmentationSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationSaveBody');
            case 'Permission':
                return this.translocoService.translate('Permission');
            case 'PermissionMainUIForm':
                return this.translocoService.translate('PermissionMainUIForm');
            case 'PermissionSaveBody':
                return this.translocoService.translate('PermissionSaveBody');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'ReadonlyObject':
                return this.translocoService.translate('ReadonlyObject');
            case 'RefreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'RefreshTokenRequest':
                return this.translocoService.translate('RefreshTokenRequest');
            case 'Registration':
                return this.translocoService.translate('Registration');
            case 'RegistrationVerificationResult':
                return this.translocoService.translate('RegistrationVerificationResult');
            case 'RegistrationVerificationToken':
                return this.translocoService.translate('RegistrationVerificationToken');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'RoleMainUIForm':
                return this.translocoService.translate('RoleMainUIForm');
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionMainUIForm':
                return this.translocoService.translate('RolePermissionMainUIForm');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'SegmentationItemMainUIForm':
                return this.translocoService.translate('SegmentationItemMainUIForm');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'SegmentationMainUIForm':
                return this.translocoService.translate('SegmentationMainUIForm');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'SimpleSaveResult':
                return this.translocoService.translate('SimpleSaveResult');
            case 'TableFilterContext':
                return this.translocoService.translate('TableFilterContext');
            case 'TableFilter':
                return this.translocoService.translate('TableFilter');
            case 'TableFilterSortMeta':
                return this.translocoService.translate('TableFilterSortMeta');
            case 'TableResponse':
                return this.translocoService.translate('TableResponse');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'TierMainUIForm':
                return this.translocoService.translate('TierMainUIForm');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionMainUIForm':
                return this.translocoService.translate('TransactionMainUIForm');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'User':
                return this.translocoService.translate('User');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedMainUIForm':
                return this.translocoService.translate('UserExtendedMainUIForm');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationMainUIForm':
                return this.translocoService.translate('UserNotificationMainUIForm');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleMainUIForm':
                return this.translocoService.translate('UserRoleMainUIForm');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            default:
                return null;
        }
    }
}

