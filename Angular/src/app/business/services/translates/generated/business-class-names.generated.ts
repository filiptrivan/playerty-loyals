export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerUserSegmentation':
            return $localize`:@@PartnerUserSegmentation:PartnerUserSegmentation`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        default:
            return null;
    }
}

