import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesLoyalsService {

    constructor(
    private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'StoreUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('StoreUpdatePointsScheduledTaskSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'StoreTierDiscountProductGroup':
                return this.translocoService.translate('StoreTierDiscountProductGroup');
            case 'StoreTierDiscountProductGroupSaveBody':
                return this.translocoService.translate('StoreTierDiscountProductGroupSaveBody');
            case 'StoreTierSaveBody':
                return this.translocoService.translate('StoreTierSaveBody');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'DiscountProductGroup':
                return this.translocoService.translate('DiscountProductGroup');
            case 'DiscountProductGroupSaveBody':
                return this.translocoService.translate('DiscountProductGroupSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'PartnerNotificationPartnerUserSaveBody':
                return this.translocoService.translate('PartnerNotificationPartnerUserSaveBody');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'NotificationUserSaveBody':
                return this.translocoService.translate('NotificationUserSaveBody');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'ExternalDiscountProductGroup':
                return this.translocoService.translate('ExternalDiscountProductGroup');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            default:
                return null;
        }
    }
}

