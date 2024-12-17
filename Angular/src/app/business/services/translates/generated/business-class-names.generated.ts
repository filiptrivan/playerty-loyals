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
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'SegmentationItemSaveBody':
                return this.translocoService.translate('SegmentationItemSaveBody');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'PartnerNotificationPartnerUserSaveBody':
                return this.translocoService.translate('PartnerNotificationPartnerUserSaveBody');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'StoreTierSaveBody':
                return this.translocoService.translate('StoreTierSaveBody');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionSaveBody':
                return this.translocoService.translate('TransactionSaveBody');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'DiscountCategorySaveBody':
                return this.translocoService.translate('DiscountCategorySaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'NotificationUserSaveBody':
                return this.translocoService.translate('NotificationUserSaveBody');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'StoreTierDiscountCategorySaveBody':
                return this.translocoService.translate('StoreTierDiscountCategorySaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'StoreUpdatePointsScheduledTaskSaveBody':
                return this.translocoService.translate('StoreUpdatePointsScheduledTaskSaveBody');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'ExternalDiscountCategory':
                return this.translocoService.translate('ExternalDiscountCategory');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerSaveBody':
                return this.translocoService.translate('PartnerSaveBody');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerPermissionSaveBody':
                return this.translocoService.translate('PartnerPermissionSaveBody');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Tier':
                return this.translocoService.translate('Tier');
            default:
                return null;
        }
    }
}

