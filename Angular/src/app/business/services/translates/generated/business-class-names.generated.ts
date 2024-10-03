export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'PartnerUserSegmentation':
            return $localize`:@@PartnerUserSegmentation:PartnerUserSegmentation`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        default:
            return null;
    }
}

