export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'SegmentationSaveBody':
            return $localize`:@@SegmentationSaveBody:SegmentationSaveBody`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'PartnerNotificationSaveBody':
            return $localize`:@@PartnerNotificationSaveBody:PartnerNotificationSaveBody`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'NotificationUser':
            return $localize`:@@NotificationUser:NotificationUser`;
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'MergedPartnerUser':
            return $localize`:@@MergedPartnerUser:MergedPartnerUser`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        default:
            return null;
    }
}

