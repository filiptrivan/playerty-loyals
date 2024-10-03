export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'PartnerUserSegmentation':
            return $localize`:@@PartnerUserSegmentation:PartnerUserSegmentation`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        default:
            return null;
    }
}

