export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'NotificationPartnerUser':
            return $localize`:@@NotificationPartnerUser:NotificationPartnerUser`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        case 'RolePartnerUser':
            return $localize`:@@RolePartnerUser:RolePartnerUser`;
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
        default:
            return null;
    }
}

