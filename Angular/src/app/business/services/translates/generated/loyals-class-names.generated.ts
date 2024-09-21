export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'Transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        default:
            return null;
    }
}

