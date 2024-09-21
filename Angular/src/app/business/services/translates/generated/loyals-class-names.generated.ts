export function getTranslatedClassNameLoyals(name: string): string
{
    switch(name) 
    {
        case 'Brand':
            return $localize`:@@Brand:Brand`;
        case 'TransactionStatus':
            return $localize`:@@TransactionStatus:TransactionStatus`;
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'Tier':
            return $localize`:@@Tier:Tier`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        default:
            return null;
    }
}

