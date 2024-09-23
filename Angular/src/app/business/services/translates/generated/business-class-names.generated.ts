export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'NotificationSaveBody':
            return $localize`:@@NotificationSaveBody:NotificationSaveBody`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        default:
            return null;
    }
}

