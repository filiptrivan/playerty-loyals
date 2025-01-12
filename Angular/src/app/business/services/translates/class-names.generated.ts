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

    translate(name: string): string
    {
        switch(name) 
        {
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'BusinessSystemTier':
                return this.translocoService.translate('BusinessSystemTier');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'BusinessSystemTierDiscountProductGroup':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroup');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'BusinessSystemUpdatePointsDataBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsDataBody');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'BusinessSystemTierSaveBody':
                return this.translocoService.translate('BusinessSystemTierSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'PartnerUserSegmentation':
                return this.translocoService.translate('PartnerUserSegmentation');
            case 'PartnerUserSegmentationSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationSaveBody');
            case 'PartnerUserPartnerNotification':
                return this.translocoService.translate('PartnerUserPartnerNotification');
            case 'PartnerUserPartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerUserPartnerNotificationSaveBody');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'PartnerRolePartnerPermission':
                return this.translocoService.translate('PartnerRolePartnerPermission');
            case 'PartnerRolePartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerRolePartnerPermissionSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'BusinessSystemTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupSaveBody');
            case 'BusinessSystem':
                return this.translocoService.translate('BusinessSystem');
            case 'BusinessSystemSaveBody':
                return this.translocoService.translate('BusinessSystemSaveBody');
            case 'PartnerUserPartnerRole':
                return this.translocoService.translate('PartnerUserPartnerRole');
            case 'PartnerUserPartnerRoleSaveBody':
                return this.translocoService.translate('PartnerUserPartnerRoleSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'BusinessSystemUpdatePointsScheduledTask':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTask');
            case 'BusinessSystemUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'PartnerUserSegmentationItem':
                return this.translocoService.translate('PartnerUserSegmentationItem');
            case 'PartnerUserSegmentationItemSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationItemSaveBody');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            case 'RegistrationVerificationResult':
                return this.translocoService.translate('RegistrationVerificationResult');
            case 'RegistrationVerificationToken':
                return this.translocoService.translate('RegistrationVerificationToken');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'RefreshTokenRequest':
                return this.translocoService.translate('RefreshTokenRequest');
            case 'Registration':
                return this.translocoService.translate('Registration');
            case 'RefreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'Permission':
                return this.translocoService.translate('Permission');
            case 'PermissionSaveBody':
                return this.translocoService.translate('PermissionSaveBody');
            case 'TableFilter':
                return this.translocoService.translate('TableFilter');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'BusinessObject':
                return this.translocoService.translate('BusinessObject');
            case 'SimpleSaveResult':
                return this.translocoService.translate('SimpleSaveResult');
            case 'TableResponse':
                return this.translocoService.translate('TableResponse');
            case 'ReadonlyObject':
                return this.translocoService.translate('ReadonlyObject');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'TableFilterSortMeta':
                return this.translocoService.translate('TableFilterSortMeta');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'TableFilterContext':
                return this.translocoService.translate('TableFilterContext');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            default:
                return null;
        }
    }
}

