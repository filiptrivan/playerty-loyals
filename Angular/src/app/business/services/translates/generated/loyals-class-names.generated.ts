export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'MergedPartnerUser':
            return $localize`:@@MergedPartnerUser:MergedPartnerUser`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'PartnerNotificationSaveBody':
            return $localize`:@@PartnerNotificationSaveBody:PartnerNotificationSaveBody`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'NotificationUser':
            return $localize`:@@NotificationUser:NotificationUser`;
        case 'SegmentationSaveBody':
            return $localize`:@@SegmentationSaveBody:SegmentationSaveBody`;
        default:
            return null;
    }
}

