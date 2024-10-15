export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'MergedPartnerUser':
            return $localize`:@@MergedPartnerUser:MergedPartnerUser`;
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'PartnerNotificationSaveBody':
            return $localize`:@@PartnerNotificationSaveBody:PartnerNotificationSaveBody`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'SegmentationSaveBody':
            return $localize`:@@SegmentationSaveBody:SegmentationSaveBody`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'NotificationUser':
            return $localize`:@@NotificationUser:NotificationUser`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        default:
            return null;
    }
}

