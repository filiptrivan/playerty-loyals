import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesBusinessService {

    constructor(
    private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'PartnerUserSegmentationItem':
                return this.translocoService.translate('PartnerUserSegmentationItem');
            case 'PartnerUserSegmentationItemSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationItemSaveBody');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'BusinessSystemUpdatePointsScheduledTask':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTask');
            case 'BusinessSystemUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskSaveBody');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'BusinessSystemTierDiscountProductGroup':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroup');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'BusinessSystemTier':
                return this.translocoService.translate('BusinessSystemTier');
            case 'BusinessSystemTierSaveBody':
                return this.translocoService.translate('BusinessSystemTierSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'BusinessSystemTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'BusinessSystem':
                return this.translocoService.translate('BusinessSystem');
            case 'BusinessSystemSaveBody':
                return this.translocoService.translate('BusinessSystemSaveBody');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'PartnerRolePartnerPermission':
                return this.translocoService.translate('PartnerRolePartnerPermission');
            case 'PartnerRolePartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerRolePartnerPermissionSaveBody');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'BusinessSystemUpdatePointsDataBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsDataBody');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'PartnerUserPartnerRole':
                return this.translocoService.translate('PartnerUserPartnerRole');
            case 'PartnerUserPartnerRoleSaveBody':
                return this.translocoService.translate('PartnerUserPartnerRoleSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'PartnerUserPartnerNotification':
                return this.translocoService.translate('PartnerUserPartnerNotification');
            case 'PartnerUserPartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerUserPartnerNotificationSaveBody');
            case 'PartnerUserSegmentation':
                return this.translocoService.translate('PartnerUserSegmentation');
            case 'PartnerUserSegmentationSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationSaveBody');
            default:
                return null;
        }
    }
}

