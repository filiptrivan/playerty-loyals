export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'email':
            return $localize`:@@Email:Email`;
        case 'password':
            return $localize`:@@Password:Password`;
        case 'hasLoggedInWithExternalProvider':
            return $localize`:@@HasLoggedInWithExternalProvider:HasLoggedInWithExternalProvider`;
        case 'numberOfFailedAttemptsInARow':
            return $localize`:@@NumberOfFailedAttemptsInARow:NumberOfFailedAttemptsInARow`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'id':
            return $localize`:@@Id:Id`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'selectedRoleIds':
            return $localize`:@@SelectedRoleIds:SelectedRoleIds`;
        default:
            return null;
    }
}

