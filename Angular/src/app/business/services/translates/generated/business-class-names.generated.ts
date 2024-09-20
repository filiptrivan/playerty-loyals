export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        case 'UserExtendedSaveBody':
            return $localize`:@@UserExtendedSaveBody:UserExtendedSaveBody`;
        default:
            return null;
    }
}

