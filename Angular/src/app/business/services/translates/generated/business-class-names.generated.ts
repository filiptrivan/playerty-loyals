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
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'Brand':
                return this.translocoService.translate('Brand');
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
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
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
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TransactionProduct':
                return this.translocoService.translate('TransactionProduct');
            case 'TransactionStatus':
                return this.translocoService.translate('TransactionStatus');
            default:
                return null;
        }
    }
}

