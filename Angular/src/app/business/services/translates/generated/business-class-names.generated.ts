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
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'ExternalDiscountCategory':
                return this.translocoService.translate('ExternalDiscountCategory');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            default:
                return null;
        }
    }
}

