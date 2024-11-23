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
            case 'SegmentationItem':
                return this.translocoService.translate('SegmentationItem');
            case 'PartnerNotificationSaveBody':
                return this.translocoService.translate('PartnerNotificationSaveBody');
            case 'PartnerRoleSaveBody':
                return this.translocoService.translate('PartnerRoleSaveBody');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'StoreTierDiscountCategory':
                return this.translocoService.translate('StoreTierDiscountCategory');
            case 'Tier':
                return this.translocoService.translate('Tier');
            case 'Product':
                return this.translocoService.translate('Product');
            case 'OnlineShop':
                return this.translocoService.translate('OnlineShop');
            case 'MergedPartnerUser':
                return this.translocoService.translate('MergedPartnerUser');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'StoreSaveBody':
                return this.translocoService.translate('StoreSaveBody');
            case 'TransactionProduct':
                return this.translocoService.translate('TransactionProduct');
            case 'Transaction':
                return this.translocoService.translate('Transaction');
            case 'TierSaveBody':
                return this.translocoService.translate('TierSaveBody');
            case 'SegmentationSaveBody':
                return this.translocoService.translate('SegmentationSaveBody');
            case 'Segmentation':
                return this.translocoService.translate('Segmentation');
            case 'StoreTier':
                return this.translocoService.translate('StoreTier');
            case 'QrCode':
                return this.translocoService.translate('QrCode');
            case 'PartnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'Brand':
                return this.translocoService.translate('Brand');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'PartnerRole':
                return this.translocoService.translate('PartnerRole');
            case 'Partner':
                return this.translocoService.translate('Partner');
            case 'PartnerNotificationPartnerUser':
                return this.translocoService.translate('PartnerNotificationPartnerUser');
            case 'DiscountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'TransactionStatus':
                return this.translocoService.translate('TransactionStatus');
            case 'Store':
                return this.translocoService.translate('Store');
            case 'PartnerPermission':
                return this.translocoService.translate('PartnerPermission');
            case 'PartnerNotification':
                return this.translocoService.translate('PartnerNotification');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'NotificationUser':
                return this.translocoService.translate('NotificationUser');
            case 'PartnerUserSaveBody':
                return this.translocoService.translate('PartnerUserSaveBody');
            default:
                return null;
        }
    }
}

