export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'OnlineShop':
            return $localize`:@@OnlineShop:OnlineShop`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'QrCode':
            return $localize`:@@QrCode:QrCode`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'TransactionProduct':
            return $localize`:@@TransactionProduct:TransactionProduct`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        case 'Product':
            return $localize`:@@Product:Product`;
        default:
            return null;
    }
}

