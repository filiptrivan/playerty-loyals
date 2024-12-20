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
            case 'BusinessSystemTierDiscountProductGroup':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroup');
            case 'BusinessSystemTier':
                return this.translocoService.translate('BusinessSystemTier');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'BusinessSystemUpdatePointsDataBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsDataBody');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'BusinessSystem':
                return this.translocoService.translate('BusinessSystem');
            case 'BusinessSystemSaveBody':
                return this.translocoService.translate('BusinessSystemSaveBody');
            case 'BusinessSystemTierSaveBody':
                return this.translocoService.translate('BusinessSystemTierSaveBody');
            case 'BusinessSystemTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('BusinessSystemTierDiscountProductGroupSaveBody');
            case 'BusinessSystemUpdatePointsScheduledTask':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTask');
            case 'BusinessSystemUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('BusinessSystemUpdatePointsScheduledTaskSaveBody');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
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
            case 'PartnerUserSegmentation':
                return this.translocoService.translate('PartnerUserSegmentation');
            case 'PartnerUserSegmentationSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationSaveBody');
            case 'PartnerUserSegmentationItem':
                return this.translocoService.translate('PartnerUserSegmentationItem');
            case 'PartnerUserSegmentationItemSaveBody':
                return this.translocoService.translate('PartnerUserSegmentationItemSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            default:
                return null;
        }
    }
}

