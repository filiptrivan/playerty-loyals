export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'Partner':
            return $localize`:@@Partner:Partner`;
        case 'PartnerUser':
            return $localize`:@@PartnerUser:PartnerUser`;
        default:
            return null;
    }
}

