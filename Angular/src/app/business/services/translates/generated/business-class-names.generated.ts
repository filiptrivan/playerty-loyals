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
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'TransactionStatus':
                return this.translocoService.translate('TransactionStatus');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'TransactionProduct':
                return this.translocoService.translate('TransactionProduct');
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'Partner':
                return this.translocoService.translate('Partner');
            default:
                return null;
        }
    }
}

