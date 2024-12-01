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
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'Brand':
                return this.translocoService.translate('Brand');
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
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'StoreUpdatePointsDataBody':
                return this.translocoService.translate('StoreUpdatePointsDataBody');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'UpdatePoints':
                return this.translocoService.translate('UpdatePoints');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'StoreUpdatePointsScheduledTask':
                return this.translocoService.translate('StoreUpdatePointsScheduledTask');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            default:
                return null;
        }
    }
}

