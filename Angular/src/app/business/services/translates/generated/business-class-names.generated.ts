export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Product':
            return $localize`:@@Product:Product`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        default:
            return null;
    }
}

