export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'PartnerUserSaveBody':
            return $localize`:@@PartnerUserSaveBody:PartnerUserSaveBody`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'SegmentationSaveBody':
            return $localize`:@@SegmentationSaveBody:SegmentationSaveBody`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'PartnerRole':
            return $localize`:@@PartnerRole:PartnerRole`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'PartnerNotificationPartnerUser':
            return $localize`:@@PartnerNotificationPartnerUser:PartnerNotificationPartnerUser`;
        case 'PartnerNotification':
            return $localize`:@@PartnerNotification:PartnerNotification`;
        case 'Segmentation':
            return $localize`:@@Segmentation:Segmentation`;
        case 'SegmentationItem':
            return $localize`:@@SegmentationItem:SegmentationItem`;
        case 'PartnerNotificationSaveBody':
            return $localize`:@@PartnerNotificationSaveBody:PartnerNotificationSaveBody`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'PartnerRoleSaveBody':
            return $localize`:@@PartnerRoleSaveBody:PartnerRoleSaveBody`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'NotificationUser':
            return $localize`:@@NotificationUser:NotificationUser`;
        case 'MergedPartnerUser':
            return $localize`:@@MergedPartnerUser:MergedPartnerUser`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'Gender':
            return $localize`:@@Gender:Gender`;
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        default:
            return null;
    }
}

