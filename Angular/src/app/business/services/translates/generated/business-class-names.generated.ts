export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
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

