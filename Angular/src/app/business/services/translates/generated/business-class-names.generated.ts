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
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'PartnerNotificationPartnerUserSaveBody':
                return this.translocoService.translate('PartnerNotificationPartnerUserSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'NotificationUserSaveBody':
                return this.translocoService.translate('NotificationUserSaveBody');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'StoreUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('StoreUpdatePointsScheduledTaskSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'StoreTierDiscountCategorySaveBody':
                return this.translocoService.translate('StoreTierDiscountCategorySaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'DiscountCategorySaveBody':
                return this.translocoService.translate('DiscountCategorySaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'ExternalDiscountCategory':
                return this.translocoService.translate('ExternalDiscountCategory');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'StoreTierSaveBody':
                return this.translocoService.translate('StoreTierSaveBody');
            default:
                return null;
        }
    }
}

