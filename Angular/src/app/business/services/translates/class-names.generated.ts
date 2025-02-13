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
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
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
            case 'BusinessSystemSaveBody':
                return this.translocoService.translate('BusinessSystemSaveBody');
            case 'BusinessSystemTierDiscountProductGroup':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroup');
            case 'BusinessSystemTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupSaveBody');
            case 'BusinessSystemTier':
                return this.translocoService.translate('BusinessSystemTier');
            case 'BusinessSystemTierSaveBody':
                return this.translocoService.translate('BusinessSystemTierSaveBody');
            case 'BusinessSystemUpdatePointsDataBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsDataBody');
            case 'BusinessSystemUpdatePointsScheduledTask':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTask');
            case 'BusinessSystemUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskSaveBody');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'ExcelManualUpdatePoints':
                return this.translocoService.translate('ExcelManualUpdatePoints');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'PartnerRolePartnerPermission':
                return this.translocoService.translate('PartnerRolePartnerPermission');
            case 'PartnerRolePartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerRolePartnerPermissionSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'PartnerUserPartnerNotification':
                return this.translocoService.translate('PartnerUserPartnerNotification');
            case 'PartnerUserPartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerUserPartnerNotificationSaveBody');
            case 'PartnerUserPartnerRole':
                return this.translocoService.translate('PartnerUserPartnerRole');
            case 'PartnerUserPartnerRoleSaveBody':
                return this.translocoService.translate('PartnerUserPartnerRoleSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'PartnerUserSegmentation':
                return this.translocoService.translate('PartnerUserSegmentation');
            case 'PartnerUserSegmentationItem':
                return this.translocoService.translate('PartnerUserSegmentationItem');
            case 'PartnerUserSegmentationItemSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationItemSaveBody');
            case 'PartnerUserSegmentationSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationSaveBody');
            case 'Permission':
                return this.translocoService.translate('Permission');
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
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
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
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'User':
                return this.translocoService.translate('User');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            default:
                return null;
        }
    }
}

