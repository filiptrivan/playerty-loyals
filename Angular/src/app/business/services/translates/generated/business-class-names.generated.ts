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
            case 'Store':
                return this.translocoService.translate('Store');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
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
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'ExternalDiscountCategory':
                return this.translocoService.translate('ExternalDiscountCategory');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Tier':
                return this.translocoService.translate('Tier');
            default:
                return null;
        }
    }
}

