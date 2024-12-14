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
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'ExternalDiscountCategory':
                return this.translocoService.translate('ExternalDiscountCategory');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'ExternalTransaction':
                return this.translocoService.translate('ExternalTransaction');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            default:
                return null;
        }
    }
}

