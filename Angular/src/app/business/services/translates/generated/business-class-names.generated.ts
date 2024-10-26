export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'NotificationUser':
            return $localize`:@@NotificationUser:NotificationUser`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'SegmentationSaveBody':
            return $localize`:@@SegmentationSaveBody:SegmentationSaveBody`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'MergedPartnerUser':
            return $localize`:@@MergedPartnerUser:MergedPartnerUser`;
        case 'PartnerNotificationSaveBody':
            return $localize`:@@PartnerNotificationSaveBody:PartnerNotificationSaveBody`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        default:
            return null;
    }
}

