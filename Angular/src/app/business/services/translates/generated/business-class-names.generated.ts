export function getTranslatedClassNameBusiness(name: string): string
{
    switch(name) 
    {
        case 'UserExtended':
            return $localize`:@@UserExtended:UserExtended`;
        default:
            return null;
    }
}

